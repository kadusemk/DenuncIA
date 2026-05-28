import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function PageNotFound() {
  return (
    <div className="grid min-h-screen place-items-center bg-background p-6 text-center">
      <div><h1 className="text-7xl font-light text-slate-300">404</h1><h2 className="mt-4 font-heading text-2xl font-bold">Pagina nao encontrada</h2><Link to="/"><Button className="mt-6">Voltar ao inicio</Button></Link></div>
    </div>
  );
}
