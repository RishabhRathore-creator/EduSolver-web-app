"use client";

import { use, useEffect, useState } from "react";

export type Message = {
    role: "user" | "assistant";
    content: string;
};

export type Chat = {
    id: string;
    title: string;
    messages: Message[];
};

const storageKey = "edusolver_chats";

export function useChatStore() {
    const [chats, setChats] = useState<Chat[]>([]);
    const [activeChatId, setActiveChatId] = useState<string | null>(null);

    useEffect(() => {
        const raw = localStorage.getItem(storageKey);
        if (raw) {
            const parsed: Chat[] = JSON.parse(raw);
            setChats(parsed);
            if (parsed.length > 0) setActiveChatId(parsed[0].id);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem(storageKey, JSON.stringify(chats));
    }, [chats]);

    function createNewChat() {
        const id = crypto.randomUUID();
        const newChat: Chat = {
            id,
            title: "New Chat",
            messages: [],
        };
        setChats((prev) => [newChat, ...prev]);
        setActiveChatId(id);
    }

    function addMessage(chatId: string, message: Message) {
        setChats((prev) =>
            prev.map((chat) =>
                chat.id === chatId
                    ? { ...chat, messages: [...chat.messages, message] }
                    : chat
            )
        );
    }

    const activeChat = chats.find((chat) => chat.id === activeChatId) || null;

    return {
        chats,
        activeChat,
        activeChatId,
        setActiveChatId,
        createNewChat,
        addMessage,
    };
}