"use client"

import React, { useState, useMemo } from "react"
import { JobQueueSidebar } from "@/components/vendor/jobs/job-queue-sidebar"
import { JobDossierHeader } from "@/components/vendor/jobs/job-dossier-header"
import { JobStepperAndActions } from "@/components/vendor/jobs/job-stepper-and-actions"
import { JobVisualEvidence } from "@/components/vendor/jobs/job-visual-evidence"
import { JobEngineerAuditLog } from "@/components/vendor/jobs/job-engineer-audit-log"
import { JobItem, JobAuditEntry } from "@/components/vendor/jobs/job-types"

const INITIAL_JOBS: JobItem[] = [
  {
    id: "job-1",
    reference: "JOB-8841",
    poNumber: "PO-9940",
    priority: "urgent",
    priorityLabel: "Urgent • Same Day",
    status: "In Progress",
    title: "Vaillant Boiler EcoTEC PCB & Valve Fault",
    propertyAddress: "Flat 2A, 14 Holland Park, Kensington & Chelsea, London W11 3TL",
    postcode: "W11 3TL",
    preAuthCap: "£385.00",
    assignedEngineer: "Marcus Sterling (Lead Gas Safe #589214)",
    accessDetails: "Concierge Gatehouse (Marcus Bell)",
    conciergePasscode: "#4812",
    keySafeCode: "2940",
    reportedProblem:
      "Vaillant EcoTEC Plus 831 displaying intermittent F.28 / F.54 flame ignition lockout. Radiators cold throughout flat, tenant reports no hot water since 06:30. Water pressure gauge at 0.6 bar.",
    isFocused: true,
    diagnosticPhotos: [
      {
        id: "p-1",
        title: "Error Code Display: F.28",
        reference: "Ref: IMG_01_PANEL",
        imageUrl:
          "https://lh3.googleusercontent.com/aida-public/AB6AXuCX7KpBwkG4E6gET4SIuaPSgHs_Qo5bJVzwaXSnOBHND1oODLEw1b-N_STJYy4pNWXFlKpf0wvSCPaZ0TfuxyB75iPdZ3MxEXID0UHWI8F8rZr2SErFJmEdMCJtPQAPbZ-nNuz6e6_LopzPAtv5tcZpVWFTYVBVbrVen_t94QALQAIPGDobZuDEBYHH4hYfRvWjpiPjbqSx9SWgxT7oj32IH1dnIsx9NLHKIprxkJXoY-ujiqG-0skC",
        alt: "Vaillant boiler LED panel displaying error code F.28",
      },
      {
        id: "p-2",
        title: "System Pressure: 0.6 bar",
        reference: "Ref: IMG_02_GAUGE",
        imageUrl:
          "https://lh3.googleusercontent.com/aida-public/AB6AXuB1qKohKnTxo9eauTK5CGgKVq0CD7eLE-bFvSu5aii6SBXGtYKZjuulyRKK5G9U6_UbuV-PoYAA8scRrywBw1wCF3-0iZyvrklBg4Sx8HEny0xJ_oQjfYLilOArxnGrf-C9BZfx7Oj8yZeiIL1PoxUVCRLeyY46HwmsYPorSGdbf2o_zxGiBAiSem7tLy873Freo7aSHSUpT_OdiUVUhnbJ-WdUFw-G9QvkZr8BXhVy9B79FAUK97q6",
        alt: "Central heating pressure gauge reading 0.6 bar",
      },
      {
        id: "p-3",
        title: "Model Badge & Serial ID",
        reference: "EcoTEC Plus 831",
        imageUrl:
          "https://lh3.googleusercontent.com/aida-public/AB6AXuCbjawxTF6z0NIIFArUTk1O1G463vECQHN9GzgDK28j4KDAtnzPiStFsgh8qrwiFzeDmKS51wreuZ_KKGalLKf9Ycl8pFW-kL05vdTvxZjpBaIBedpj6NvDFbXBYy0r342AN6sgWOvzXkAKJ55R0X5dp1zMQm5it5JCRWD7r6dHwkUiDCO_Tc8xOCQq1aN5nSse8VdZNAWdxPooIAwXMa4pghI_m-76S2kOVlLBM04KSexiuLYewTcr",
        alt: "Boiler model rating plate",
      },
    ],
    auditLogs: [
      {
        id: "al-1",
        author: "M. Sterling (On-Site Update)",
        timestamp: "14:28 BST",
        message:
          "Arrived on site, collected key from concierge. Isolating spur, confirmed ignition electrode carbon build-up and faulty PCB relay. Replacing PCB with van stock unit and repressurising system to 1.3 bar.",
        type: "engineer",
      },
      {
        id: "al-2",
        author: "Haven Access Control",
        timestamp: "14:10 BST",
        message: "Marcus Bell (Concierge) verified engineer credentials and granted plant access.",
        type: "access",
      },
      {
        id: "al-3",
        author: "Apex Heating Dispatch Desk",
        timestamp: "09:15 BST",
        message: "Job accepted under pre-approved £385.00 limit. Lead engineer allocated.",
        type: "dispatch",
      },
    ],
  },
  {
    id: "job-2",
    reference: "JOB-8842",
    poNumber: "PO-9941",
    priority: "urgent",
    priorityLabel: "Urgent",
    status: "New Request",
    title: "Radiators Cold / Air Lock Primary Loop",
    propertyAddress: "Flat 4B, 18 Kensington Gardens, Bayswater, W2 4QH",
    postcode: "W2 4QH",
    preAuthCap: "£280.00",
    isFocused: false,
  },
  {
    id: "job-3",
    reference: "JOB-8839",
    poNumber: "PO-9932",
    priority: "routine",
    priorityLabel: "Routine",
    status: "Awaiting Parts",
    title: "Thermostatic shower mixer cartridge replacement",
    propertyAddress: "Flat 8, 30 Cadogan Square, Knightsbridge, SW1X 0JH",
    postcode: "SW1X 0JH",
    preAuthCap: "£210.00",
    isFocused: false,
  },
]

export default function VendorJobsPage() {
  const [jobs, setJobs] = useState<JobItem[]>(INITIAL_JOBS)
  const [selectedTab, setSelectedTab] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")

  const activeJob = useMemo(() => jobs.find((j) => j.isFocused) || jobs[0], [jobs])

  const filteredJobs = useMemo(() => {
    return jobs.filter((j) => {
      const matchesSearch =
        j.propertyAddress.toLowerCase().includes(searchQuery.toLowerCase()) ||
        j.reference.toLowerCase().includes(searchQuery.toLowerCase()) ||
        j.title.toLowerCase().includes(searchQuery.toLowerCase())

      if (!matchesSearch) return false

      if (selectedTab === "all") return true
      if (selectedTab === "new") return j.status === "New Request"
      if (selectedTab === "active") return j.status === "In Progress" || j.status === "Awaiting Parts"
      if (selectedTab === "completed") return j.status === "Completed"
      return true
    })
  }, [jobs, selectedTab, searchQuery])

  const handleSelectJob = (id: string) => {
    setJobs((prev) =>
      prev.map((j) => ({
        ...j,
        isFocused: j.id === id,
      }))
    )
  }

  const handleAddAuditLog = (text: string) => {
    const newEntry: JobAuditEntry = {
      id: `al-${Date.now()}`,
      author: "M. Sterling (On-Site Update)",
      timestamp: "Just now",
      message: text,
      type: "engineer",
    }

    setJobs((prev) =>
      prev.map((j) => {
        if (!j.isFocused) return j
        return {
          ...j,
          auditLogs: [newEntry, ...(j.auditLogs || [])],
        }
      })
    )
  }

  return (
 <div className=" min-h-screen py-2 px-1 sm:px-2">
        <div className="max-w-[1600px] mx-auto space-y-6">
          {/* Top Bar Header */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
            <div>
              <div className="text-xs font-semibold text-stone-500 uppercase tracking-wider">
                Apex Heating &amp; Gas Ltd • Approved Contractor #4102-G
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold text-[#132A20] tracking-tight mt-0.5">
                Jobs &amp; Work Orders
              </h1>
              <p className="text-xs sm:text-sm text-stone-600 max-w-2xl mt-0.5">
                Operational job queue, dispatch assignments, and on-site completion records across assigned Haven properties.
              </p>
            </div>
          </div>

          {/* Master-Detail Grid Layout */}
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
            <div className="xl:col-span-5">
              <JobQueueSidebar
                jobs={filteredJobs}
                selectedTab={selectedTab}
                onSelectTab={setSelectedTab}
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                onSelectJob={handleSelectJob}
              />
            </div>

            <div className="xl:col-span-7 space-y-6 bg-white rounded-2xl border border-stone-200/80 p-6 shadow-sm">
              <JobDossierHeader job={activeJob} />

              <JobStepperAndActions
                onMarkComplete={() => alert(`Sign-off triggered for Job #${activeJob.reference}`)}
                onReschedule={() => alert("Opening Reschedule Window calendar...")}
                onHoldForParts={() => alert("Job status updated to Awaiting Parts.")}
              />

              {activeJob.reportedProblem && (
                <div className="space-y-1.5">
                  <span className="text-[10px] font-semibold text-stone-500 uppercase tracking-wider">
                    Reported Problem Description
                  </span>
                  <div className="p-4 bg-stone-50 border border-stone-200/60 rounded-xl text-xs text-stone-800 leading-relaxed italic">
                    &ldquo;{activeJob.reportedProblem}&rdquo;
                  </div>
                </div>
              )}

              {activeJob.diagnosticPhotos && (
                <JobVisualEvidence photos={activeJob.diagnosticPhotos} />
              )}

              {activeJob.auditLogs && (
                <JobEngineerAuditLog
                  logs={activeJob.auditLogs}
                  onAddLog={handleAddAuditLog}
                />
              )}
            </div>
          </div>
        </div>
      </div>
  )
}