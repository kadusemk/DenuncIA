import React, { useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { Home, PlusCircle, MapPin, LayoutDashboard, LogOut, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/AuthContext";
import { cn } from "@/lib/utils";

const LOGO_URL = "https://media.base44.com/images/public/6a16e786d4c9243fce94fe80/f204e2ef5_DenuncIA-removebg-preview.png";

const citizenNav = [
  { path: "/", label: "Inicio", icon: Home },
  { path: "/nova-denuncia", label: "Nova Denuncia", icon: PlusCircle },
  { path: "/minhas-denuncias", label: "Minhas Denuncias", icon: MapPin }
];
const adminNav = [
  { path: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { path: "/admin/denuncias", label: "Todas Denuncias", icon: MapPin }
];

export default function AppLayout() {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const isAdmin = user?.role === "admin";
  const nav = isAdmin ? [...citizenNav, ...adminNav] : citizenNav;

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 border-b bg-white/95 shadow-sm backdrop-blur-xl">
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4">
          <Link to="/" className="flex items-center gap-2">
            <img src={LOGO_URL} alt="DenuncIA" className="h-9 w-auto object-contain" />
          </Link>
          <nav className="hidden items-center gap-2 md:flex">
            {nav.map((item) => {
              const Icon = item.icon;
              const active = location.pathname === item.path;
              return (
                <Link key={item.path} to={item.path}>
                  <Button variant={active ? "default" : "ghost"} size="sm" className={cn("gap-2", active && "bg-primary text-white")}>
                    <Icon className="h-4 w-4" />
                    {item.label}
                  </Button>
                </Link>
              );
            })}
          </nav>
          <div className="flex items-center gap-2">
            <span className="hidden text-xs text-muted-foreground sm:block">{user?.email}</span>
            {isAdmin && <span className="rounded-full border border-accent/30 bg-accent/20 px-2 py-0.5 text-[10px] font-medium text-accent">Admin</span>}
            <Button variant="ghost" size="icon" onClick={logout}><LogOut className="h-4 w-4" /></Button>
            <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</Button>
          </div>
        </div>
        {menuOpen && (
          <nav className="space-y-1 border-t bg-white p-2 md:hidden">
            {nav.map((item) => {
              const Icon = item.icon;
              const active = location.pathname === item.path;
              return (
                <Link key={item.path} to={item.path} onClick={() => setMenuOpen(false)} className={cn("flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium", active ? "bg-primary text-white" : "hover:bg-muted")}>
                  <Icon className="h-4 w-4" /> {item.label}
                </Link>
              );
            })}
          </nav>
        )}
      </header>
      <main className="mx-auto max-w-7xl px-4 py-6">
        <Outlet />
      </main>
    </div>
  );
}
