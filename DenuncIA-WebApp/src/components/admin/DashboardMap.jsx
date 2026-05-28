import PriorityMap from "@/components/complaints/PriorityMap";

export default function DashboardMap({ complaints }) {
  return <PriorityMap complaints={complaints} height="330px" />;
}
