import { Link } from "react-router-dom";
import { ArrowLeft, Mail } from "lucide-react";
import AuthLayout from "@/components/AuthLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function ForgotPassword() {
  return (
    <AuthLayout icon={Mail} title="Recuperar senha" subtitle="Modo local: nenhuma mensagem real sera enviada" footer={<Link to="/login" className="font-medium text-primary hover:underline"><ArrowLeft className="mr-1 inline h-3 w-3" />Voltar ao login</Link>}>
      <div className="space-y-4"><Input type="email" placeholder="voce@email.com" className="h-12" /><Button className="h-12 w-full">Simular envio</Button></div>
    </AuthLayout>
  );
}
