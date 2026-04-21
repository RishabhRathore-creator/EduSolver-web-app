"use client";

import { Chat } from "@/lib/useChatStore";
import { X } from "lucide-react";

type Props = {
  chats: Chat[];
  activeChatId: string | null;
  onSelect: (id: string) => void;
  onNewChat: () => void;
  isOpen: boolean;
  onClose: () => void;
};

export default function ChatSidebar({
  chats,
  activeChatId,
  onSelect,
  onNewChat,
  isOpen,
  onClose,
}: Props) {
  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed md:static z-50 md:z-auto top-0 left-0 h-full w-64 bg-white border-r
        transform transition-transform duration-200
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0`}
      >
        <div className="flex items-center justify-between p-4 border-b">
          <button
            onClick={onNewChat}
            className="w-full rounded bg-blue-600 text-white py-2 text-sm"
          >
            + New Chat
          </button>
          <button aria-label="X" onClick={onClose} className="ml-2 md:hidden">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-2 text-xs text-gray-500">RECENT CHATS</div>

        <ul className="px-2 space-y-1">
          {chats.map((chat) => (
            <li
              key={chat.id}
              onClick={() => onSelect(chat.id)}
              className={`cursor-pointer rounded px-3 py-2 text-sm
              ${
                chat.id === activeChatId
                  ? "bg-blue-100 text-blue-700"
                  : "hover:bg-gray-100"
              }`}
            >
              {chat.title}
            </li>
          ))}
        </ul>
      </aside>
    </>
  );
}
