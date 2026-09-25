import { notFound } from "next/navigation";
import AlertDetailView from "@/components/dashboard/AlertDetailView";
import { getAlertById } from "@/data/alerts";

export default async function AlertDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const alert = getAlertById(id);

  if (!alert) {
    notFound();
  }

  return <AlertDetailView alert={alert} />;
}
