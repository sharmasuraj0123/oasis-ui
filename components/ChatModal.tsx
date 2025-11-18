import { useState, useEffect, useRef } from "react";
import { X, Send, MessageCircle, Users } from "lucide-react";
import Image, { StaticImageData } from "next/image";

interface ChatModalProps {
	agentName: string;
	agentAvatar: string | StaticImageData;
	agentColor: string;
	onClose: () => void;
}

interface Message {
	id: string;
	sender: string;
	message: string;
	timestamp: string;
	type: "user" | "agent" | "community";
	avatar?: any;
}

export function ChatModal({
	agentName,
	agentAvatar,
	agentColor,
	onClose,
}: ChatModalProps) {
	const [activeTab, setActiveTab] = useState<"agent" | "community">("agent");
	const [messageInput, setMessageInput] = useState("");
	const messagesEndRef = useRef<HTMLDivElement>(null);
	const inputRef = useRef<HTMLInputElement>(null);
	const touchStartY = useRef<number>(0);
	const touchEndY = useRef<number>(0);

	// Scroll to bottom when messages change or tab changes
	useEffect(() => {
		messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
	}, [activeTab]);

	// Handle swipe down to close on mobile (only from header area)
	const handleTouchStart = (e: React.TouchEvent) => {
		touchStartY.current = e.touches[0].clientY;
	};

	const handleTouchMove = (e: React.TouchEvent) => {
		touchEndY.current = e.touches[0].clientY;
	};

	const handleTouchEnd = () => {
		// Only trigger if started from top 100px of modal and swiped down significantly
		if (
			touchStartY.current < 100 &&
			touchStartY.current - touchEndY.current < -80
		) {
			onClose();
		}
	};

	// Mock agent chat messages
	const agentMessages: Message[] = [
		{
			id: "1",
			sender: agentName,
			message: `Hey! I'm ${agentName}, your AI trading agent. Ask me anything about my strategy or performance.`,
			timestamp: "2m ago",
			type: "agent",
			avatar: agentAvatar,
		},
		{
			id: "2",
			sender: "You",
			message: "What's your current trading strategy?",
			timestamp: "1m ago",
			type: "user",
		},
		{
			id: "3",
			sender: agentName,
			message:
				"I'm currently focused on yield optimization through PT/LSD arbitrage. My strategy adapts to market conditions in real-time.",
			timestamp: "Just now",
			type: "agent",
			avatar: agentAvatar,
		},
	];

	// Mock community chat messages
	const communityMessages: Message[] = [
		{
			id: "1",
			sender: "CryptoTrader",
			message:
				"This market looks really promising! The agent has been outperforming consistently.",
			timestamp: "5m ago",
			type: "community",
			avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=CryptoTrader",
		},
		{
			id: "2",
			sender: "AlphaSeeker",
			message: "I just placed a YES bet. The metrics look solid.",
			timestamp: "3m ago",
			type: "community",
			avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=AlphaSeeker",
		},
		{
			id: "3",
			sender: "DegenChad",
			message: "LFG! 🚀 This is going to 100%",
			timestamp: "1m ago",
			type: "community",
			avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=DegenChad",
		},
	];

	const currentMessages =
		activeTab === "agent" ? agentMessages : communityMessages;

	const handleSend = () => {
		if (messageInput.trim()) {
			// Handle message send
			setMessageInput("");
		}
	};

	return (
		<div
			className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-end md:items-center justify-center animate-fadeIn"
			onClick={onClose}
		>
			<div
				className="bg-white w-full md:max-w-lg md:rounded-2xl rounded-t-2xl flex flex-col max-h-[85vh] md:max-h-[80vh] animate-slideUp md:animate-fadeIn"
				onClick={(e) => e.stopPropagation()}
				onTouchStart={handleTouchStart}
				onTouchMove={handleTouchMove}
				onTouchEnd={handleTouchEnd}
			>
				{/* Swipe indicator - Mobile only */}
				<div className="md:hidden flex justify-center pt-2 pb-1">
					<div className="w-12 h-1 bg-[#e0e0e0] rounded-full" />
				</div>

				{/* Header */}
				<div className="flex items-center justify-between p-4 border-b border-[#eaeaea]">
					<div className="flex items-center gap-3">
						<div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white shadow-sm">
							<Image
								width={50}
								height={50}
								src={agentAvatar}
								alt={agentName}
								className="w-full h-full object-cover"
							/>
						</div>
						<div>
							<h3
								className="font-semibold"
								style={{ fontFamily: "Space Grotesk", fontSize: "1rem" }}
							>
								{activeTab === "agent"
									? `Chat with ${agentName}`
									: "Community Chat"}
							</h3>
							<p
								className="text-[#9e9e9e] text-xs"
								style={{ fontFamily: "Space Mono" }}
							>
								{activeTab === "agent"
									? "Ask about strategy & performance"
									: "142 members online"}
							</p>
						</div>
					</div>
					<button
						onClick={onClose}
						className="p-2 hover:bg-[#f5f5f5] rounded-lg transition-colors"
					>
						<X size={20} />
					</button>
				</div>

				{/* Tabs */}
				<div className="flex border-b border-[#eaeaea] bg-[#fafafa]">
					<button
						onClick={() => setActiveTab("agent")}
						className={`flex-1 px-4 py-3 font-medium transition-colors relative ${
							activeTab === "agent" ? "text-black" : "text-[#9e9e9e]"
						}`}
						style={{ fontFamily: "Space Grotesk", fontSize: "0.875rem" }}
					>
						<div className="flex items-center justify-center gap-2">
							<MessageCircle size={16} />
							<span>Agent Chat</span>
						</div>
						{activeTab === "agent" && (
							<div className="absolute bottom-0 left-0 right-0 h-0.5 bg-black" />
						)}
					</button>
					<button
						onClick={() => setActiveTab("community")}
						className={`flex-1 px-4 py-3 font-medium transition-colors relative ${
							activeTab === "community" ? "text-black" : "text-[#9e9e9e]"
						}`}
						style={{ fontFamily: "Space Grotesk", fontSize: "0.875rem" }}
					>
						<div className="flex items-center justify-center gap-2">
							<Users size={16} />
							<span>Community</span>
						</div>
						{activeTab === "community" && (
							<div className="absolute bottom-0 left-0 right-0 h-0.5 bg-black" />
						)}
					</button>
				</div>

				{/* Messages */}
				<div
					className="flex-1 overflow-y-auto p-4 space-y-4 scroll-smooth cursor-text"
					onClick={() => inputRef.current?.focus()}
				>
					{currentMessages.map((msg) => (
						<div
							key={msg.id}
							className={`flex gap-3 ${
								msg.type === "user" ? "flex-row-reverse" : ""
							}`}
						>
							{msg.type !== "user" && (
								<div className="w-8 h-8 rounded-full overflow-hidden border border-[#eaeaea] flex-shrink-0">
									<Image
										width={32}
										height={32}
										src={msg.avatar}
										alt={msg.sender}
										className="w-full h-full object-cover"
									/>
								</div>
							)}
							<div
								className={`flex-1 ${
									msg.type === "user" ? "flex flex-col items-end" : ""
								}`}
							>
								<div className="flex items-center gap-2 mb-1">
									<span
										className="font-semibold text-xs"
										style={{
											fontFamily: "Space Grotesk",
											color:
												msg.type === "agent"
													? agentColor
													: msg.type === "user"
													? "#000"
													: "#666",
										}}
									>
										{msg.sender}
									</span>
									<span
										className="text-[0.625rem] text-[#9e9e9e]"
										style={{ fontFamily: "Space Mono" }}
									>
										{msg.timestamp}
									</span>
								</div>
								<div
									className={`px-3 py-2 rounded-lg max-w-[85%] ${
										msg.type === "user"
											? "bg-black text-white"
											: msg.type === "agent"
											? "bg-[#00F28F]/10 border border-[#00F28F]/20"
											: "bg-[#f5f5f5]"
									}`}
									style={{
										fontFamily: "Space Mono",
										fontSize: "0.8125rem",
										lineHeight: "1.5",
									}}
								>
									{msg.message}
								</div>
							</div>
						</div>
					))}
					<div ref={messagesEndRef} />
				</div>

				{/* Input Bar - Always visible on mobile */}
				<div className="p-4 border-t-2 border-[#eaeaea] bg-white sticky bottom-0">
					<div className="flex gap-2 items-center">
						<div className="flex-1 relative">
							<input
								ref={inputRef}
								type="text"
								value={messageInput}
								onChange={(e) => setMessageInput(e.target.value)}
								onKeyPress={(e) => e.key === "Enter" && handleSend()}
								placeholder="Click to begin typing..."
								className="w-full h-[42px] px-4 py-3 border border-[#eaeaea] rounded-lg focus:outline-none focus:border-black transition-colors bg-white"
								style={{ fontFamily: "Space Mono", fontSize: "14px" }}
								autoComplete="off"
							/>
						</div>
						<button
							onClick={handleSend}
							className="w-[40px] h-[42px] bg-black text-white rounded-lg hover:bg-[#333] active:bg-[#555] transition-colors flex items-center justify-center flex-shrink-0"
							aria-label="Send message"
						>
							<Send size={16} />
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
