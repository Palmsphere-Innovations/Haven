"use client";

import React, { useMemo, useState } from "react";
import { FileText, Download } from "lucide-react";
import { Button } from "@/components/ui/button";

export interface DocumentItem {
  id: string;
  name: string;
  size: string;
  property: string;
  type: string;
  uploadDate: string;
  uploadedBy: string;
  fileTheme: "red" | "blue" | "amber";
}

export const documentsList: DocumentItem[] = [
  {
    id: "1",
    name: "CP12_Gas_Safety_Inspection_2024.pdf",
    size: "1.4 MB",
    property: "Flat 4B, 18 Kensington Gdns",
    type: "Gas Safety Certificate",
    uploadDate: "24 Oct 2024",
    uploadedBy: "Pimlico Plumbers (Gas Safe #51209)",
    fileTheme: "red",
  },
  {
    id: "2",
    name: "Assured_Shorthold_Tenancy_Agreement_2025.pdf",
    size: "3.2 MB",
    property: "27 Blenheim Cres",
    type: "Tenancy Agreement (AST)",
    uploadDate: "15 Sep 2025",
    uploadedBy: "Alistair Vance (Signed DocuSign)",
    fileTheme: "blue",
  },
  {
    id: "3",
    name: "EICR_Condition_Report_Remedials.pdf",
    size: "2.8 MB",
    property: "8 Camden Mews",
    type: "Electrical Safety (EICR)",
    uploadDate: "09 Oct 2025",
    uploadedBy: "Apex Electrical (NICEIC #3301)",
    fileTheme: "red",
  },
  {
    id: "4",
    name: "CheckIn_Inventory_ScheduleOfCondition.pdf",
    size: "6.1 MB",
    property: "15 Highbury Terrace",
    type: "Inventory Report",
    uploadDate: "01 Sep 2025",
    uploadedBy: "Aspect Property Surveyors",
    fileTheme: "amber",
  },
  { id: "5", name: "EPC_Energy_Performance_Certificate_2025.pdf", size: "1.1 MB", property: "12 Richmond Hill Mansions", type: "Energy Performance (EPC)", uploadDate: "28 Aug 2025", uploadedBy: "Green Homes Assessments", fileTheme: "blue" },
  { id: "6", name: "AST_Renewal_18_Kensington_Gdns.pdf", size: "2.6 MB", property: "Flat 4B, 18 Kensington Gdns", type: "Tenancy Agreement (AST)", uploadDate: "20 Aug 2025", uploadedBy: "Oliver Finch (Signed DocuSign)", fileTheme: "blue" },
  { id: "7", name: "Smoke_Alarm_Test_Record_Q3.pdf", size: "820 KB", property: "7 Grosvenor Vale", type: "Smoke Alarm Certificate", uploadDate: "11 Aug 2025", uploadedBy: "Haven Compliance Team", fileTheme: "red" },
  { id: "8", name: "Inventory_Checkout_27_Blenheim.pdf", size: "4.8 MB", property: "27 Blenheim Cres", type: "Inventory Report", uploadDate: "04 Aug 2025", uploadedBy: "Aspect Property Surveyors", fileTheme: "amber" },
  { id: "9", name: "Landlord_Tenant_Correspondence_July.pdf", size: "640 KB", property: "8 Camden Mews", type: "Correspondence", uploadDate: "29 Jul 2025", uploadedBy: "Haven Operations", fileTheme: "blue" },
  { id: "10", name: "EICR_15_Highbury_Terrace.pdf", size: "2.2 MB", property: "15 Highbury Terrace", type: "Electrical Safety (EICR)", uploadDate: "18 Jul 2025", uploadedBy: "Apex Electrical (NICEIC #3301)", fileTheme: "red" },
  { id: "11", name: "Gas_CP12_Unit_3A_2025.pdf", size: "1.3 MB", property: "Unit 3A, St. John's Ct", type: "Gas Safety Certificate", uploadDate: "10 Jul 2025", uploadedBy: "Pimlico Plumbers (Gas Safe #51209)", fileTheme: "red" },
  { id: "12", name: "AST_12_Richmond_Hill_Mansions.pdf", size: "2.9 MB", property: "12 Richmond Hill Mansions", type: "Tenancy Agreement (AST)", uploadDate: "02 Jul 2025", uploadedBy: "Dr. Aris Thorne (Signed DocuSign)", fileTheme: "blue" },
  { id: "13", name: "Inventory_Elmfield_Way.pdf", size: "5.3 MB", property: "14 Elmfield Way", type: "Inventory Report", uploadDate: "25 Jun 2025", uploadedBy: "Aspect Property Surveyors", fileTheme: "amber" },
  { id: "14", name: "EICR_Grosvenor_Vale_2025.pdf", size: "2.5 MB", property: "7 Grosvenor Vale", type: "Electrical Safety (EICR)", uploadDate: "13 Jun 2025", uploadedBy: "Apex Electrical (NICEIC #3301)", fileTheme: "red" },
  { id: "15", name: "Compliance_Query_May_2025.pdf", size: "510 KB", property: "Flat 4B, 18 Kensington Gdns", type: "Correspondence", uploadDate: "31 May 2025", uploadedBy: "Haven Operations", fileTheme: "blue" },
];

export const DocumentHub: React.FC<{ documents: DocumentItem[]; onPreview: (document: DocumentItem) => void; onDownload: (name: string) => void }> = ({ documents, onPreview, onDownload }) => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(7);
  const filteredDocuments = useMemo(() => documents.filter((doc) => selectedCategory === "all" || (selectedCategory === "ast" && doc.type.includes("Tenancy")) || (selectedCategory === "safety" && (doc.type.includes("Safety") || doc.type.includes("Gas") || doc.type.includes("EICR"))) || (selectedCategory === "inventory" && doc.type.includes("Inventory")) || (selectedCategory === "mail" && doc.type.includes("Correspondence"))), [documents, selectedCategory]);
  const totalPages = Math.max(1, Math.ceil(filteredDocuments.length / pageSize));
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = currentPage * pageSize;
  const paginatedDocuments = filteredDocuments.slice(startIndex, endIndex);

  const getThemeClass = (theme: DocumentItem["fileTheme"]) => {
    switch (theme) {
      case "red":
        return "bg-rose-50 border-rose-100 text-rose-600";
      case "blue":
        return "bg-blue-50 border-blue-100 text-blue-600";
      case "amber":
        return "bg-amber-50 border-amber-100 text-amber-600";
    }
  };

  return (
    <section className="border border-stone-200/80 rounded-2xl bg-white p-5 shadow-xs flex flex-col gap-4">
      <div>
        <h2 className="text-base font-bold text-stone-900">Document Hub &amp; Repository</h2>
        <p className="text-xs text-stone-500">
          Search and manage executed leases, certification certificates, and statutory correspondence.
        </p>
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-stone-100 pb-3">
        {[
          { id: "all", label: "All Documents (184)" },
          { id: "ast", label: "Tenancy Agreements (42)" },
          { id: "safety", label: "Safety Certificates (78)" },
          { id: "inventory", label: "Inventories & Check-in (38)" },
          { id: "mail", label: "Correspondence (26)" },
        ].map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => { setSelectedCategory(tab.id); setCurrentPage(1); }}
            className={`rounded-full px-3.5 py-1 text-xs font-medium transition-colors ${
              selectedCategory === tab.id
                ? "bg-stone-900 text-white"
                : "border border-stone-200 hover:bg-stone-50 text-stone-600"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Documents Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs text-stone-600">
          <thead>
            <tr className="border-b border-stone-100 text-[10px] font-bold text-stone-400 uppercase tracking-wider">
              <th className="py-3 px-3">Document Name</th>
              <th className="py-3 px-3">Linked Property</th>
              <th className="py-3 px-3">Type</th>
              <th className="py-3 px-3">Upload Date</th>
              <th className="py-3 px-3">Uploaded By</th>
              <th className="py-3 px-3 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-100">
            {paginatedDocuments.map((doc) => (
              <tr key={doc.id} className="hover:bg-stone-50/50 transition-colors">
                <td className="py-3.5 px-3">
                  <div className="flex items-center gap-2.5">
                    <div className={`w-7 h-7 rounded border flex items-center justify-center shrink-0 ${getThemeClass(doc.fileTheme)}`}>
                      <FileText className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <button type="button" onClick={() => onPreview(doc)} className="font-semibold text-left text-stone-900 hover:underline cursor-pointer">
                        {doc.name}
                      </button>
                      <div className="text-[10px] text-stone-400">{doc.size}</div>
                    </div>
                  </div>
                </td>
                <td className="py-3.5 px-3 font-medium text-stone-800">{doc.property}</td>
                <td className="py-3.5 px-3 text-stone-600">{doc.type}</td>
                <td className="py-3.5 px-3 text-stone-600">{doc.uploadDate}</td>
                <td className="py-3.5 px-3 text-stone-600">{doc.uploadedBy}</td>
                <td className="py-3.5 px-3 text-right">
                  <div className="inline-flex items-center gap-1.5">
                    <button type="button" onClick={() => onDownload(doc.name)} className="p-1 text-stone-400 hover:text-stone-700" title="Download">
                      <Download className="w-4 h-4" />
                    </button>
                    <Button onClick={() => onPreview(doc)} variant="outline" size="sm" className="h-7 px-2.5 rounded-full text-[11px] border-stone-200 text-stone-800">
                      View
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex flex-col gap-3 border-t border-stone-100 pt-4 text-xs text-stone-500 sm:flex-row sm:items-center sm:justify-between">
        <span>Showing {filteredDocuments.length === 0 ? 0 : startIndex + 1} to {Math.min(endIndex, filteredDocuments.length)} of {filteredDocuments.length} documents</span>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" disabled={currentPage <= 1} onClick={() => setCurrentPage((prev) => prev - 1)}>Previous</Button>
          <span>Page {currentPage} of {totalPages}</span>
          <Button variant="outline" size="sm" disabled={currentPage >= totalPages} onClick={() => setCurrentPage((prev) => prev + 1)}>Next</Button>
        </div>
      </div>
    </section>
  );
};