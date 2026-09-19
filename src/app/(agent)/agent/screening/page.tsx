import { ScreeningHeader } from "@/components/agent/screening/screening-header"
import { ScreeningStats } from "@/components/agent/screening/screening-stats"
import { ScreeningTable } from "@/components/agent/screening/screening-table"

export default function ScreeningPage() {
  return (
    <div className="space-y-6 p-6 bg-[#EDEBE6] min-h-screen">
      <ScreeningHeader />
      <ScreeningStats />
      <ScreeningTable />
    </div>
  )
}