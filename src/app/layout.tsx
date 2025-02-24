import type { Metadata } from "next";
import { Karla } from "next/font/google";
import "./globals.css";
import RootProvider from "@/contexts/RootProvider";
import Navbar from "@/components/Navbar";

const karla = Karla({
  subsets: ["latin"],
  variable: "--font-karla",
});

export const metadata: Metadata = {
  title: "Blog Website",
  description: "This is a blog website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
		<html lang="en">
			<body className={`${karla.className} antialiased`}>
				<RootProvider>
					<Navbar />
					<div className="mt-14">{children}</div>
				</RootProvider>
			</body>
		</html>
  );
}
