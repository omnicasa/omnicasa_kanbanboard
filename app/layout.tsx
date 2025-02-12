"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState, CSSProperties, Suspense } from "react";
import "./globals.css";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import AppSidebar from "@/components/AppSidebar";
import Header from "@/components/Header";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1000 * 60 * 5,
        gcTime: 1000 * 60 * 60,
      },
    },
  });

  return (
    <html lang="en">
      <body>
        <QueryClientProvider client={queryClient}>
          <SidebarProvider
            style={
              {
                "--sidebar-width": "3rem",
              } as CSSProperties
            }
          >
            <Suspense fallback={<div>Loading ...</div>}>
              <AppSidebar />
              <SidebarInset>
                <Header />
                {children}
              </SidebarInset>
            </Suspense>
          </SidebarProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
