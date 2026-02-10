type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

interface ApiError extends Error {
  status?: number;
}

export class ApiClient {
  private readonly baseUrl = "/api/ui";

  private async doRequest<T, D = unknown>(
    endpoint: string,
    method: HttpMethod,
    data?: D,
    customHeaders?: Record<string, string>,
  ): Promise<T> {
    const headers = new Headers();

    if (data !== undefined) {
      headers.set("Content-Type", "application/json");
    }

    if (customHeaders) {
      for (const [key, value] of Object.entries(customHeaders)) {
        headers.set(key, value);
      }
    }

    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      method,
      headers,
      body: data ? JSON.stringify(data) : undefined,
      credentials: "include",
    });

    return this.handleResponse<T>(response);
  }

  private async doFormRequest<T>(
    endpoint: string,
    method: "POST" | "PUT",
    formData: FormData,
    customHeaders?: Record<string, string>,
  ): Promise<T> {
    const headers = new Headers();

    if (customHeaders) {
      for (const [key, value] of Object.entries(customHeaders)) {
        headers.set(key, value);
      }
    }

    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      method,
      headers,
      body: formData,
      credentials: "include",
    });

    return this.handleResponse<T>(response);
  }

  private async handleResponse<T>(response: Response): Promise<T> {
    const isJson = response.headers
      .get("Content-Type")
      ?.includes("application/json");

    const rawData: unknown = isJson
      ? await response.json()
      : await response.text();

    if (!response.ok) {
      let message = response.statusText;

      if (typeof rawData === "object" && rawData !== null) {
        const obj = rawData as Record<string, unknown>;
        if (typeof obj.error === "string") message = obj.error;
        if (typeof obj.message === "string") message = obj.message;
      }

      if (response.status === 500) message = "Service error";

      const error = new Error(message) as ApiError;
      error.status = response.status;
      throw error;
    }

    return rawData as T;
  }

  get<T>(endpoint: string, headers?: Record<string, string>): Promise<T> {
    return this.doRequest<T>(endpoint, "GET", undefined, headers);
  }

  post<T, D>(
    endpoint: string,
    data: D,
    headers?: Record<string, string>,
  ): Promise<T> {
    return this.doRequest<T, D>(endpoint, "POST", data, headers);
  }

  put<T, D>(
    endpoint: string,
    data: D,
    headers?: Record<string, string>,
  ): Promise<T> {
    return this.doRequest<T, D>(endpoint, "PUT", data, headers);
  }

  delete<T>(endpoint: string, headers?: Record<string, string>): Promise<T> {
    return this.doRequest<T>(endpoint, "DELETE", undefined, headers);
  }

  postForm<T>(
    endpoint: string,
    formData: FormData,
    headers?: Record<string, string>,
  ): Promise<T> {
    return this.doFormRequest<T>(endpoint, "POST", formData, headers);
  }

  putForm<T>(
    endpoint: string,
    formData: FormData,
    headers?: Record<string, string>,
  ): Promise<T> {
    return this.doFormRequest<T>(endpoint, "PUT", formData, headers);
  }
}
