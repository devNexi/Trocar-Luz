import { Link, useLocation } from "wouter";
import { ReactNode, useState } from "react";
import { Menu, X } from "lucide-react";

export function Layout({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: "/para-sua-casa", label: "Para sua casa" },
    { href: "/para-sua-empresa", label: "Para sua empresa" },
    { href: "/geracao-distribuida", label: "Geração Distribuída" },
    { href: "/energia-2028", label: "Energia 2028" },
    { href: "/guias", label: "Guias" },
  ];

  return (
    <div className="min-h-[100dvh] flex flex-col bg-[#F7F7F5]">
      <header className="bg-white border-b border-[#E2E1DC] sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <Link href="/" className="font-display font-bold text-2xl text-[hsl(var(--primary))] flex-shrink-0">
              TrocarLuz
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex gap-6 items-center">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-medium ${
                    location === link.href ? "text-[hsl(var(--primary))]" : "text-[#1A1F36] hover:text-[hsl(var(--primary))]"
                  } transition-colors`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Mobile menu button */}
            <button 
              className="md:hidden p-2 text-[#1A1F36]"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-[#E2E1DC]">
            <div className="px-4 pt-2 pb-4 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block px-3 py-2 rounded-md text-base font-medium ${
                    location === link.href ? "text-[hsl(var(--primary))] bg-green-50" : "text-[#1A1F36] hover:bg-gray-50"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </header>

      <main className="flex-1">
        {children}
      </main>

      <footer className="bg-[#1A1F36] text-white pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            <div className="col-span-1 md:col-span-1">
              <Link href="/" className="font-display font-bold text-2xl text-[hsl(var(--primary))] block mb-4">
                TrocarLuz
              </Link>
              <p className="text-[#9EA3B0] text-sm mb-4">
                Parceiro de Ótima Energia
              </p>
              <div className="inline-flex items-center gap-2 bg-[#2a3047] rounded-full px-3 py-1 text-xs font-medium border border-[#3b415a]">
                ✓ Parceiros verificados
              </div>
            </div>
            
            <div>
              <h4 className="font-display font-semibold text-lg mb-4">Serviços</h4>
              <ul className="space-y-2">
                <li><Link href="/para-sua-casa" className="text-[#9EA3B0] hover:text-white text-sm transition-colors">Para residências</Link></li>
                <li><Link href="/para-sua-empresa" className="text-[#9EA3B0] hover:text-white text-sm transition-colors">Para empresas</Link></li>
                <li><Link href="/geracao-distribuida" className="text-[#9EA3B0] hover:text-white text-sm transition-colors">Geração Distribuída</Link></li>
                <li><Link href="/mercado-livre-energia" className="text-[#9EA3B0] hover:text-white text-sm transition-colors">Mercado Livre</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-display font-semibold text-lg mb-4">Recursos</h4>
              <ul className="space-y-2">
                <li><Link href="/estados" className="text-[#9EA3B0] hover:text-white text-sm transition-colors">Por Estado</Link></li>
                <li><Link href="/energia-2028" className="text-[#9EA3B0] hover:text-white text-sm transition-colors">Energia 2028</Link></li>
                <li><Link href="/guias" className="text-[#9EA3B0] hover:text-white text-sm transition-colors">Guias</Link></li>
                <li><Link href="/perguntas-frequentes" className="text-[#9EA3B0] hover:text-white text-sm transition-colors">Perguntas Frequentes</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-display font-semibold text-lg mb-4">Empresa</h4>
              <ul className="space-y-2">
                <li><Link href="/sobre" className="text-[#9EA3B0] hover:text-white text-sm transition-colors">Sobre nós</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-[#2a3047] pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-[#6B7080]">
            <p>© {new Date().getFullYear()} TrocarLuz. Todos os direitos reservados.</p>
            <p>Ajudando o Brasil a comparar melhor e economizar.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
