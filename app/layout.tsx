import type { Metadata } from "next";
import { ReactNode } from "react";

import { ModalProvider } from "@/hooks/useModal";
import { ClerkProvider } from "@clerk/nextjs";
import StyledComponentsRegistry from "./styled-components/registry";

import Modal from "@/components/modals/modal/modal";
import Menu from "@/components/navigation/menu/Menu";
import SideBar from "@/components/navigation/sidebar/SideBar";
import { Toaster } from "@/components/ui/toaster";

import "./globals.css";

export const metadata: Metadata = {
  title: "Art Forum",
  description: "Generataive Art Forum",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <ClerkProvider>
      <StyledComponentsRegistry>
        <ModalProvider>
          <html lang="en" suppressHydrationWarning>
            <head>
              <link rel="icon" href="/favicon.ico" />
            </head>
            <body>
              <Modal />
              <Toaster />
              <div className="app-sections">
                <Menu />
                <div className="content">{children}</div>
                <SideBar />
              </div>
            </body>
          </html>
        </ModalProvider>
      </StyledComponentsRegistry>
    </ClerkProvider>
  );
}
