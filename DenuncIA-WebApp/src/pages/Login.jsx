import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LogIn, Mail, Lock, Loader2 } from "lucide-react";
import AuthLayout from "@/components/AuthLayout";
import GoogleIcon from "@/components/GoogleIcon";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/lib/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("carloseduardovilaca2000@gmail.com");
  const [password, setPassword] = useState("123456");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const submit = (event) => {
    event.preventDefault();
    setLoading(true);
    setTimeout(() => {
      login(email);
      navigate("/");
    }, 350);
  };

  return (
    <AuthLayout icon={LogIn} title="Bem-vindo de volta" subtitle="Entre para acompanhar suas denuncias" footer={<>Nao tem conta? <Link to="/register" className="font-medium text-primary hover:underline">Criar uma</Link></>}>
      <Button variant="outline" className="mb-6 h-12 w-full" onClick={() => { login("google.user@denuncia.local"); navigate("/"); }}>
        <GoogleIcon /> Continuar com Google
      </Button>
      <form onSubmit={submit} className="space-y-4">
        <div className="space-y-2"><Label>Email</Label><div className="relative"><Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" /><Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="h-12 pl-10" required /></div></div>
        <div className="space-y-2"><div className="flex justify-between"><Label>Senha</Label><Link to="/forgot-password" className="text-xs text-primary hover:underline">Esqueceu?</Link></div><div className="relative"><Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" /><Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="h-12 pl-10" required /></div></div>
        <Button type="submit" className="h-12 w-full" disabled={loading}>{loading ? <><Loader2 className="h-4 w-4 animate-spin" /> Entrando...</> : "Entrar"}</Button>
      </form>
    </AuthLayout>
  );
}
