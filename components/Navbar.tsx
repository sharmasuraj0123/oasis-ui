"use client";
import { useState } from "react";
import { Wallet, Menu, X, ChevronRight } from "lucide-react";
import { OasisLogo } from "./OasisLogo";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavbarProps {
	isWalletConnected: boolean;
	onConnectWallet: () => void;
	walletAddress: string | null;
}

export function Navbar({ isWalletConnected, onConnectWallet, walletAddress }: NavbarProps) {
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
	const pathname = usePathname();

	const handleConnectWallet = () => {
		setIsMobileMenuOpen(false);
		onConnectWallet();
	};

	const shortenAddress = (address: string) => {
		return `${address.slice(0, 6)}...${address.slice(-4)}`;
	};

	return (
		<nav className="border-b border-[--color-border] px-4 md:px-6 lg:px-8 py-3 md:py-5">
			<div className="max-w-[1800px] mx-auto flex items-center justify-between">
				{/* Logo */}
				<Link href="/markets" className="flex items-center cursor-pointer">
					<OasisLogo />
				</Link>

				{/* Navigation */}
				<div className="hidden md:flex items-center gap-6">
					<Link
						// onClick={() => onNavigate("markets")}
						href="/markets"
						className={`uppercase transition-colors pb-1 font-medium ${
							pathname === "/markets"
								? "border-b-2 border-black text-black"
								: "text-[#9e9e9e] hover:text-black"
						}`}
						style={{
							fontFamily: "Space Mono",
							fontSize: "13px",
							lineHeight: "20.8px",
							letterSpacing: "0.65px",
						}}
					>
						Markets
					</Link>
					<Link
						// onClick={() => onNavigate("agents")}
						href="/agents"
						className={`uppercase transition-colors pb-1 font-medium ${
							pathname === "/agents"
								? "border-b-2 border-black text-black"
								: "text-[#9e9e9e] hover:text-black"
						}`}
						style={{
							fontFamily: "Space Mono",
							fontSize: "13px",
							lineHeight: "20.8px",
							letterSpacing: "0.65px",
						}}
					>
						Agents
					</Link>
					<Link
						// onClick={() => onNavigate("portfolio")}
						href="/portfolio"
						className={`uppercase transition-colors pb-1 font-medium ${
							pathname === "/portfolio"
								? "border-b-2 border-black text-black"
								: "text-[#9e9e9e] hover:text-black"
						}`}
						style={{
							fontFamily: "Space Mono",
							fontSize: "13px",
							lineHeight: "20.8px",
							letterSpacing: "0.65px",
						}}
					>
						Portfolio
					</Link>
				</div>

				{/* Right Side */}
				<div className="flex items-center gap-3">
					{/* Desktop Wallet Button */}
					<button
						onClick={onConnectWallet}
						className="hidden md:flex items-center gap-2 px-5 py-2.5 border-2 border-black rounded-[10px] hover:bg-black hover:text-white transition-colors font-medium"
						style={{
							fontFamily: "Space Mono",
							fontSize: "13px",
							lineHeight: "20.8px",
						}}
					>
						<Wallet size={15} />
						{isWalletConnected && walletAddress ? (
							<>
								<span>{shortenAddress(walletAddress)}</span>
								<span className="mx-1">|</span>
								<span>Disconnect</span>
							</>
						) : (
							"Connect Wallet"
						)}
					</button>

					{/* Mobile Hamburger Menu Button */}
					<button
						onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
						className="md:hidden flex items-center justify-center w-10 h-10 border-2 border-black rounded-lg hover:bg-black hover:text-white transition-colors"
						aria-label="Menu"
					>
						{isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
					</button>
				</div>
			</div>

			{/* Mobile Menu Full Screen Overlay */}
			{isMobileMenuOpen && (
				<div className="md:hidden fixed inset-0 bg-white z-50 flex flex-col">
					{/* Header */}
					<div className="flex items-center justify-between px-4 border-b border-[#eaeaea] m-[0px] pt-[16px] pr-[16px] pb-[12px] pl-[16px]">
						<div
							className="cursor-pointer"
							// onClick={() => handleNavigate("markets")}
						>
							<OasisLogo />
						</div>
						<button
							onClick={() => setIsMobileMenuOpen(false)}
							className="flex items-center justify-center rounded-[10px] border-2 border-black hover:bg-black hover:text-white transition-colors"
							style={{ width: "40px", height: "40px" }}
							aria-label="Close menu"
						>
							<X size={20} />
						</button>
					</div>

					{/* Navigation Links */}
					<div className="flex-1 overflow-y-auto pt-8">
						<nav className="flex flex-col">
							<button
								// onClick={() => handleNavigate("markets")}
								className="w-full flex items-center justify-between px-6 border-b border-[#eaeaea] group hover:border-black transition-colors"
								style={{ height: "73px" }}
							>
								<span
									style={{
										fontFamily: "Space Grotesk",
										fontSize: "24px",
										lineHeight: "32px",
									}}
									className="text-black"
								>
									Markets
								</span>
								<ChevronRight
									size={24}
									className="text-[#9e9e9e] group-hover:text-black transition-colors"
								/>
							</button>

							<button
								// onClick={() => handleNavigate("agents")}
								className="w-full flex items-center justify-between px-6 border-b border-[#eaeaea] group hover:border-black transition-colors"
								style={{ height: "73px" }}
							>
								<span
									style={{
										fontFamily: "Space Grotesk",
										fontSize: "24px",
										lineHeight: "32px",
									}}
									className="text-black"
								>
									Agents
								</span>
								<ChevronRight
									size={24}
									className="text-[#9e9e9e] group-hover:text-black transition-colors"
								/>
							</button>

							<button
								// onClick={() => handleNavigate("portfolio")}
								className="w-full flex items-center justify-between px-6 border-b border-[#eaeaea] group hover:border-black transition-colors"
								style={{ height: "73px" }}
							>
								<span
									style={{
										fontFamily: "Space Grotesk",
										fontSize: "24px",
										lineHeight: "32px",
									}}
									className="text-black"
								>
									Portfolio
								</span>
								<ChevronRight
									size={24}
									className="text-[#9e9e9e] group-hover:text-black transition-colors"
								/>
							</button>
						</nav>
					</div>

					{/* Wallet Connection Button at Bottom */}
					<div
						className="border-t border-[#eaeaea] px-6"
						style={{ paddingTop: "25px", paddingBottom: "25px" }}
					>
						{isWalletConnected && walletAddress ? (
							<div className="space-y-3">
								<div 
									className="text-center text-[#666] uppercase tracking-wider"
									style={{
										fontFamily: "Space Mono",
										fontSize: "11px",
										letterSpacing: "0.75px",
									}}
								>
									Connected Wallet
								</div>
								<div
									className="text-center font-medium"
									style={{
										fontFamily: "Space Mono",
										fontSize: "14px",
									}}
								>
									{shortenAddress(walletAddress)}
								</div>
								<button
									onClick={handleConnectWallet}
									className="w-full flex items-center justify-center gap-3 bg-white border-2 border-black rounded-full hover:bg-black hover:text-white transition-colors"
									style={{ height: "60px" }}
								>
									<Wallet size={20} />
									<span
										className="font-medium tracking-wider"
										style={{
											fontFamily: "Space Mono",
											fontSize: "15px",
											letterSpacing: "0.75px",
										}}
									>
										DISCONNECT
									</span>
								</button>
							</div>
						) : (
							<button
								onClick={handleConnectWallet}
								className="w-full flex items-center justify-center gap-3 bg-white border-2 border-black rounded-full hover:bg-black hover:text-white transition-colors"
								style={{ height: "60px" }}
							>
								<Wallet size={20} />
								<span
									className="font-medium tracking-wider"
									style={{
										fontFamily: "Space Mono",
										fontSize: "15px",
										letterSpacing: "0.75px",
									}}
								>
									CONNECT WALLET
								</span>
							</button>
						)}
					</div>
				</div>
			)}
		</nav>
	);
}
