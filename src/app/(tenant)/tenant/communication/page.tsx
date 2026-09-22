"use client"

import React, { useState } from "react"
// import { PortalShell } from "@/components/shared/portal-shell"
import { CommunicationHeader } from "@/components/tenant/communication/communication-header"
import { CommunicationQuickActions } from "@/components/tenant/communication/communication-quick-actions"
import { MessageThread } from "@/components/tenant/communication/communication-message-thread"
import { AgentProfileCard } from "@/components/tenant/communication/agent-profile-card"
import { BuildingDirectoryCard } from "@/components/tenant/communication/building-directory-card"
import { ChatMessage } from "@/components/tenant/communication/communication-types"

const INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: "msg-1",
    sender: "agent",
    senderName: "Eleanor Vance",
    timestamp: "10:14 AM",
    text: "Hi Oliver, thanks for flagging the en-suite radiator valve. I've scheduled Apex Heating (Gas Safe #48291) to visit on Thursday 17 Oct between 10:00 and 12:00 BST. Let me know if that window works.",
  },
  {
    id: "msg-2",
    sender: "agent",
    senderName: "Eleanor Vance",
    timestamp: "10:15 AM",
    text: "Also, your updated Gas Safety Certificate (CP12) has been automatically synchronized to your Documents tab for your statutory records.",
    attachment: {
      id: "att-1",
      name: "CP12_Cert_Flat4B_Oct2024.pdf",
      size: "Gas Safe Register • 412 KB",
      type: "pdf",
    },
  },
  {
    id: "msg-3",
    sender: "tenant",
    senderName: "You",
    timestamp: "10:28 AM",
    text: "Thanks Eleanor, Thursday morning works great. I'll make sure someone is home or they can collect the key from reception if needed.",
    readStatus: "read",
  },
  {
    id: "msg-4",
    sender: "tenant",
    senderName: "You",
    timestamp: "10:29 AM",
    text: "Here is the valve dial setting and pressure reading just in case the engineer needs it beforehand:",
    readStatus: "read",
    attachment: {
      id: "att-2",
      name: "IMG_3092_ValveLeak.jpg",
      size: "1.8 MB",
      type: "image",
      previewUrl:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuByBLte4OLT1RW5sAO6xiDZiXrqBl7a1taeA44W0Wn0qwe9okyk058XNr9dxzH3pv6GankukWuBoKDC4YVlided5G1N6Xo44WfAOqSj_0R1IbZKh2UvBn8xC4j3GSmcgfOD0AxUnVAMwTR99CuYaLrPzofWmBC-Fm4emZvs2wiY6YiuOe-GL6_SyGj9GA-oZJvP2pY9Wx_lrgOh7BBLOXSNIM02xYHfxgOTkzytd7mA3gFcndA7dUmJ",
    },
  },
  {
    id: "msg-5",
    sender: "agent",
    senderName: "Eleanor Vance",
    timestamp: "09:42 AM",
    text: "Perfect, the engineer is currently en route (estimated arrival 10:15) and has been given permission to ring Flat 4B directly via the intercom. Feel free to ping here if anything else comes up!",
  },
]

export default function TenantCommunicationPage() {
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_MESSAGES)

  const handleSendMessage = (text: string) => {
    const now = new Date()
    const timeStr = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })

    const newMessage: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: "tenant",
      senderName: "You",
      timestamp: timeStr,
      text,
      readStatus: "sent",
    }

    setMessages((prev) => [...prev, newMessage])
  }

  const handleSelectQuickAction = (actionName: string) => {
    handleSendMessage(`[System Request]: Initiating ${actionName}`)
  }

  return (
        <div className=" min-h-screen py-8 px-4 sm:px-8">
        <div className="max-w-[1600px] mx-auto space-y-6">
          <CommunicationHeader />

          <CommunicationQuickActions onSelectAction={handleSelectQuickAction} />

          {/* Central Two-Column Layout (8 Cols / 4 Cols) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            <div className="lg:col-span-8">
              <MessageThread
                messages={messages}
                onSendMessage={handleSendMessage}
                onCallAgent={() => window.open("tel:+442079460912")}
                onEmailAgent={() => window.open("mailto:eleanor.vance@primeheritage.co.uk")}
              />
            </div>

            <div className="lg:col-span-4 space-y-6">
              <AgentProfileCard
                onBookCall={() =>
                  alert("Opening 15-minute review call scheduling calendar...")
                }
              />
              <BuildingDirectoryCard />
            </div>
          </div>
        </div>
      </div>
  )
}