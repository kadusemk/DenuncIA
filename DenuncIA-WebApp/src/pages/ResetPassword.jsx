import { Link } from "react-router-dom";
import { Lock } from "lucide-react";
import AuthLayout from "@/components/AuthLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function ResetPassword() {
  return (
    <AuthLayout icon={Lock} title="Nova senha" subtitle="Fluxo demonstrativo local" footer={<Link to="/login" className="font-medium text-primary hover:underline">Ir para login</Link>}>
      <div className="space-y-4"><Input type="password" placeholder="Nova senha" className="h-12" /><Input type="password" placeholder="Confirmar senha" className="h-12" /><Button className="h-12 w-full">Salvar senha</Button></div>
    </AuthLayout>
  );
}
