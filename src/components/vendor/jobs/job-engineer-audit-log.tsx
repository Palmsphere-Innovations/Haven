import React, { useState } from "react"
import { Send, Key, ClipboardCheck, WrenchIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { JobAuditEntry } from "./job-types"

interface JobEngineerAuditLogProps {
  logs: JobAuditEntry[]
  onAddLog: (text: string) => void
}

export const JobEngineerAuditLog: React.FC<JobEngineerAuditLogProps> = ({
  logs,
  onAddLog,
}) => {
  const [inputText, setInputText] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!inputText.trim()) return
    onAddLog(inputText.trim())
    setInputText("")
  }

  const getLogIcon = (type: JobAuditEntry["type"]) => {
    switch (type) {
      case "engineer":
        return <WrenchIcon className="w-3.5 h-3.5 text-emerald-800" />
      case "access":
        return <Key className="w-3.5 h-3.5 text-stone-500" />
      default:
        return <ClipboardCheck className="w-3.5 h-3.5 text-stone-500" />
    }
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between text-xs">
        <span className="font-semibold text-stone-500 uppercase tracking-wider text-[10px]">
          Engineer Real-Time Audit Log
        </span>
        <span className="text-emerald-800 font-semibold flex items-center gap-1 text-[11px]">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" /> Immutable Ledger Feed
        </span>
      </div>

      <div className="space-y-2">
        {logs.map((log) => (
          <div
            key={log.id}
            className="p-3 rounded-xl bg-stone-50 border border-stone-200/70 text-xs text-stone-800 space-y-1"
          >
            <div className="flex items-center justify-between text-stone-500">
              <div className="flex items-center gap-1.5 font-semibold text-[#132A20]">
                {getLogIcon(log.type)}
                <span>{log.author}</span>
              </div>
              <span className="font-mono text-[10px]">{log.timestamp}</span>
            </div>
            <p className="text-xs text-stone-700 pl-5">{log.message}</p>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="flex items-center gap-2 pt-1">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Add engineer on-site comment or part serial..."
          className="flex-1 h-9 px-3 bg-stone-50 border border-stone-200 rounded-xl text-xs text-[#132A20] placeholder:text-stone-400 focus:outline-none focus:border-[#132A20] focus:bg-white transition-all"
        />
        <Button
          type="submit"
          className="h-9 px-4 rounded-xl bg-[#132A20] hover:bg-[#1c3e30] text-white text-xs font-semibold shadow-xs flex items-center gap-1.5"
        >
          <Send className="w-3.5 h-3.5 text-emerald-300" />
          <span>Save Note</span>
        </Button>
      </form>
    </div>
  )
}