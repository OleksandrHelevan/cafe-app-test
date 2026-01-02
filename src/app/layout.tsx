"use client";
import "~/styles/globals.css";
import { type ReactNode } from "react";
import { Logo } from "~/core/components/Logo";
import { Navigation } from "~/core/components/Navigation";
import { Button } from "~/core/components/Button";
import { router } from "next/client";
import BurgerMenu from "~/core/components/BurgerMenu";
import Image from "next/image";
import { FooterLinkLabel } from "~/core/components/FooterLinkLabel";
import { FooterLink } from "~/core/components/FooterLink";
import { SocialLink } from "~/core/components/SocialLink";
import { GradientText } from "~/core/components/GradientText";
import ReactQueryProvider from "~/core/components/ReactQueryProvider";
import ToastProvider from "~/core/components/ToastProvider";
import { useLoginModal } from "~/domains/user/useLoginModal";

export default function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  const { open: openLogin } = useLoginModal();
  return (
    <html lang="en">
      <head>
        <title>PizzaShop</title>
        <meta name="description" content="Quick pizza delivery" />
      </head>
      <body
        className={`font-muller flex flex-col items-center bg-[linear-gradient(180deg,_#1E0C00_0%,_#1F0700_31%,_#170A00_69%,_#1E0D00_100%)]`}
      >
        <ReactQueryProvider>
          {children}
          <ToastProvider />
        </ReactQueryProvider>
        <footer
          className={
            "mt-24 flex w-full max-w-[1980px] flex-col gap-4 bg-[#170A00]/90 px-8 py-8 md:px-16 lg:px-32"
          }
        >
          <div
            className={
              "flex flex-col items-center gap-12 xl:flex-row xl:items-start"
            }
          >
            <Logo />
            <div className="md:gp-24 flex flex-col gap-12 px-12 sm:flex-row sm:flex-wrap sm:items-center sm:justify-start md:flex-nowrap lg:items-start">
              <div className="flex flex-col gap-2">
                <FooterLinkLabel>Home</FooterLinkLabel>
                <FooterLink link={"#home"}>To order</FooterLink>
                <FooterLink link={"#menu"}>Menu</FooterLink>
                <FooterLink link={"#about"}>About us</FooterLink>
                <FooterLink link={"#events"}>Events</FooterLink>
              </div>
              <div className="flex flex-col gap-2">
                <FooterLinkLabel>Events</FooterLinkLabel>
                <FooterLink link={"#order"}>3 Pizza 1 Free Coffee</FooterLink>
                <FooterLink link={"#order"}>2 Pizza for 1 Price</FooterLink>
                <FooterLink link={"#order"}>Kitchen Tour</FooterLink>
              </div>
              <div className="flex flex-col gap-2">
                <FooterLinkLabel>Menu</FooterLinkLabel>
                <FooterLink link={"#order"}>Meat</FooterLink>
                <FooterLink link={"#order"}>Seaproducts</FooterLink>
                <FooterLink link={"#order"}>Vegan</FooterLink>
                <FooterLink link={"#order"}>Mushrooms</FooterLink>
              </div>
              <div className="flex flex-col gap-2">
                <FooterLinkLabel>About us</FooterLinkLabel>
                <FooterLink link={"#order"}>Our History</FooterLink>
                <FooterLink link={"#order"}>Why We?</FooterLink>
              </div>
            </div>
          </div>
          <div
            className={
              "flex flex-col items-center justify-between gap-4 md:flex-row"
            }
          >
            <GradientText>+38(098) 123-45-67</GradientText>
            <div className="flex items-center gap-4">
              <SocialLink
                src={"/icons/facebook.png"}
                alt={"facebook"}
                href={"#"}
              />
              <SocialLink
                src={"/icons/instagram.png"}
                alt={"instagram"}
                href={"#"}
              />
              <SocialLink
                src={"/icons/twitter.png"}
                alt={"twitter"}
                href={"#"}
              />
            </div>
          </div>
          <div className={"text-l flex justify-center"}>
            <GradientText>Made by Oleksandr Helevan</GradientText>
          </div>
        </footer>
      </body>
    </html>
  );
}
