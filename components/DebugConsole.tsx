
"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";

export const DebugConsole = () => {
    const [logs, setLogs] = useState<string[]>([]);
    const [isOpen, setIsOpen] = useState(true);

    useEffect(() => {
        const originalLog = console.log;
        const originalError = console.error;

        console.log("Debug Console Active");
        setLogs((prev) => [...prev, "Debug Console Initialized..."]);

        console.log = (...args) => {
            // Capture ALL logs for now to debug the console itself
            const msg = args.map(a => typeof a === 'object' ? JSON.stringify(a) : String(a)).join(" ");
            setLogs((prev) => [...prev, `LOG: ${msg}`]);
            originalLog.apply(console, args);
        };

        console.error = (...args) => {
            const msg = args.map(a => typeof a === 'object' ? JSON.stringify(a) : String(a)).join(" ");
            setLogs((prev) => [...prev, `ERROR: ${msg}`]);
            originalError.apply(console, args);
        };

        return () => {
            console.log = originalLog;
            console.error = originalError;
        };
    }, []);

    if (!isOpen) return (
        <button
            onClick={() => setIsOpen(true)}
            className="fixed bottom-4 right-4 bg-black text-white p-2 rounded-full z-[100]"
        >
            Debug
        </button>
    )

    return (
        <div className="fixed bottom-0 right-0 w-full md:w-[600px] h-[300px] bg-black/90 text-green-400 p-4 overflow-y-auto z-[100] font-mono text-xs border-t-2 border-green-500">
            <div className="flex justify-between items-center mb-2 sticky top-0 bg-black/90 pb-2 border-b border-white/10">
                <span className="font-bold">Debug Console</span>
                <div className="flex gap-2">
                    <button onClick={() => setLogs([])} className="hover:text-white">Clear</button>
                    <button onClick={() => setIsOpen(false)}><X size={16} /></button>
                </div>
            </div>
            <div className="space-y-1">
                {logs.map((log, i) => (
                    <div key={i} className="break-all whitespace-pre-wrap border-b border-white/5 pb-1">
                        {log}
                    </div>
                ))}
                {logs.length === 0 && <div className="text-gray-500 italic">Waiting for logs...</div>}
            </div>
        </div>
    );
};
