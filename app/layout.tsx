import type { Metadata } from "next";
import localFont from "next/font/local";
import { AuthProvider } from "./context/AuthProvider";
import "./globals.css";
import "../config/firebase/firebase";

// Import GilRoy normal and italic fonts: Black, ExtraBold, Bold, Heavy, Light, Medium, Regular, SemiBold, Thin, UltraLight
const gilroyFont = localFont({
  src: [
    {
      path: "../public/fonts/gilroy/Gilroy-Black.ttf",
      weight: "900",
      style: "normal",
    },
    {
      path: "../public/fonts/gilroy/Gilroy-BlackItalic.ttf",
      weight: "900",
      style: "italic",
    },
    {
      path: "../public/fonts/gilroy/Gilroy-ExtraBold.ttf",
      weight: "800",
      style: "normal",
    },
    {
      path: "../public/fonts/gilroy/Gilroy-ExtraBoldItalic.ttf",
      weight: "800",
      style: "italic",
    },
    {
      path: "../public/fonts/gilroy/Gilroy-Bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../public/fonts/gilroy/Gilroy-BoldItalic.ttf",
      weight: "700",
      style: "italic",
    },
    {
      path: "../public/fonts/gilroy/Gilroy-SemiBold.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../public/fonts/gilroy/Gilroy-SemiBoldItalic.ttf",
      weight: "600",
      style: "italic",
    },
    {
      path: "../public/fonts/gilroy/Gilroy-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/fonts/gilroy/Gilroy-MediumItalic.ttf",
      weight: "500",
      style: "italic",
    },
    {
      path: "../public/fonts/gilroy/Gilroy-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/gilroy/Gilroy-RegularItalic.ttf",
      weight: "400",
      style: "italic",
    },
    {
      path: "../public/fonts/gilroy/Gilroy-Light.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../public/fonts/gilroy/Gilroy-LightItalic.ttf",
      weight: "300",
      style: "italic",
    },
    {
      path: "../public/fonts/gilroy/Gilroy-Thin.ttf",
      weight: "200",
      style: "normal",
    },
    {
      path: "../public/fonts/gilroy/Gilroy-ThinItalic.ttf",
      weight: "200",
      style: "italic",
    },
    {
      path: "../public/fonts/gilroy/Gilroy-UltraLight.ttf",
      weight: "100",
      style: "normal",
    },
    {
      path: "../public/fonts/gilroy/Gilroy-UltraLightItalic.ttf",
      weight: "100",
      style: "italic",
    },
  ],
  variable: "--font-gilroy",
});

export const metadata: Metadata = {
  title: "Emmagini",
  description: "For Fans Who Play to Win! Watch, Quiz, Score.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${gilroyFont.variable} font-sans`}>
        {<AuthProvider>{children}</AuthProvider>}
      </body>
    </html>
  );
}
