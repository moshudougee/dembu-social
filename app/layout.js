import { Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "./globals.css";
import Layout from "@/components/Layout";
import LoginModal from "@/components/modals/LoginModal";
import RegisterModal from "@/components/modals/RegisterModal";
import EditModal from "@/components/modals/EditModal";
import SessionWrapper from "./SessionWrapper";


const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Dembu Social",
  description: "Created by Denis Mbuthia",
};

export default function RootLayout({ children }) {
  return (
    <SessionWrapper>
    <html lang="en" suppressHydrationWarning={true}>
      <body className={inter.className}>
        <Toaster />
        <EditModal />
        <RegisterModal />
        <LoginModal />
        <Layout>
          {children}
        </Layout>
      </body>
    </html>
    </SessionWrapper>
  );
}
