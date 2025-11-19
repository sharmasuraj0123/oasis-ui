import { TrendingUp, MessageCircle } from "lucide-react";

interface FloatingBetButtonProps {
	onPlaceBet: () => void;
	onOpenChat: () => void;
}

export function FloatingBetButton({
	onPlaceBet,
	onOpenChat,
}: FloatingBetButtonProps) {
	return (
		<div className="md:hidden fixed bottom-20 left-0 right-0 z-40 px-4 pointer-events-none">
			<div className="flex gap-2">
				{/* <button
					onClick={onOpenChat}
					className="relative flex-1 py-3.5 bg-white text-black border-2 border-black rounded-xl font-medium shadow-lg flex items-center justify-center gap-2 pointer-events-auto active:scale-95 transition-transform overflow-visible"
					style={{ fontFamily: "Space Grotesk", fontSize: "0.9375rem" }}
				>
					<MessageCircle size={18} />
					Chat
					
					<span className="absolute -top-1 -right-1 flex h-3 w-3">
						<span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00F28F] opacity-75"></span>
						<span className="relative inline-flex rounded-full h-3 w-3 bg-[#00F28F] border-2 border-white"></span>
					</span>
				</button> */}
				<button
					onClick={onPlaceBet}
					className="flex-1 py-3.5 bg-black text-white border-2 border-black rounded-xl font-medium shadow-lg flex items-center justify-center gap-2 pointer-events-auto active:scale-95 transition-transform"
					style={{ fontFamily: "Space Grotesk", fontSize: "0.9375rem" }}
				>
					<TrendingUp size={18} />
					Place Bet
				</button>
			</div>
		</div>
	);
}
