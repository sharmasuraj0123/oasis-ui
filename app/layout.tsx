import type { Metadata } from "next";
import { Space_Grotesk, Space_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { WalletProvider } from "@/lib/WalletContext";
import { NavbarWrapper } from "@/components/NavbarWrapper";

const spaceGrotesk = Space_Grotesk({
	variable: "--font-space-grotesk",
	subsets: ["latin"],
});

const spaceMono = Space_Mono({
	weight: ["400", "700"],
	variable: "--font-space-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "Oasis MVP - Binary",
	description: "Oasis MVP - Binary",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body
				className={`${spaceGrotesk.variable} ${spaceMono.variable} antialiased`}
			>
				<WalletProvider>
					<Toaster />
					<main className="min-h-screen flex flex-col bg-white text-black">
						<NavbarWrapper />
						{children}
					</main>
				</WalletProvider>
			</body>
		</html>
	);
}
