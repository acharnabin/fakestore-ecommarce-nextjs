import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Geist, Geist_Mono } from "next/font/google";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Layout from "@/layout/Layout";
import { Toaster } from 'sonner'
import ProtectedRouteWrapper from "@/layout/ProtectedRouteWrapper";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div
      className={`${geistSans.className} ${geistMono.className} font-[family-name:var(--font-geist-sans)]`}
    >
      <QueryClientProvider client={queryClient}>
        <Layout>
          <ProtectedRouteWrapper>
            <Component {...pageProps} />
          </ProtectedRouteWrapper>
          
          <Toaster
           position="top-center"
          />
        </Layout>
      </QueryClientProvider>
    </div>
  );
}
