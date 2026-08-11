"use client";

import dynamic from "next/dynamic";

const ChatAgent = dynamic(() => import("./ChatAgent"), { ssr: false });

export default function ChatAgentMount({ lang }: { lang: string }) {
  return <ChatAgent lang={lang} />;
}
