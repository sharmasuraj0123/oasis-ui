"use client";

import { Navbar } from "./Navbar";
import { useWallet } from "@/lib/WalletContext";

export function NavbarWrapper() {
	const { isConnected, connectWallet, disconnectWallet } = useWallet();

	const handleWalletAction = () => {
		if (isConnected) {
			disconnectWallet();
		} else {
			connectWallet();
		}
	};

	return <Navbar isWalletConnected={isConnected} onConnectWallet={handleWalletAction} />;
}

