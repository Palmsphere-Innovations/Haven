import { notFound } from "next/navigation";
import { getMockProperty } from "@/lib/mock/properties";
import { PropertyDetailClient } from "./property-detail-client";

export default async function PropertyDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const property = getMockProperty(id);
  if (!property) notFound();
  return <PropertyDetailClient property={property} />;
}
