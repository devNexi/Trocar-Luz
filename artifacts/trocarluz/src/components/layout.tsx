import { Link, useLocation } from "wouter";
import { ReactNode, useState, useEffect } from "react";
import { List, X } from "@phosphor-icons/react";

export function Layout({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const isHome = location === '/';

  useEffect(() => {
    if (!isHome) {
      setScrolled(true);
      return;
    }
    setScrolled(false);
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isHome]);

  const navLinks = [
    { href: "/comparar-desconto", label: "Ver desconto" },
    { href: "/para-sua-casa", label: "Para sua casa" },
    { href: "/para-sua-empresa", label: "Para sua empresa" },
    { href: "/geracao-distribuida", label: "Geração Distribuída" },
    { href: "/carro-eletrico", label: "Carro Elétrico" },
    { href: "/guias", label: "Guias" },
    { href: "/perguntas-frequentes", label: "Dúvidas" },
  ];

  return (
    <div className="min-h-[100dvh] flex flex-col bg-[#F7F7F5]">
      <header
        className="sticky top-0 z-50"
        style={{
          backgroundColor: scrolled ? '#0A1628' : 'transparent',
          transition: 'background-color 0.2s ease',
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', lineHeight: 0 }}>
              <img src="/trocarluz-logo.png" alt="TrocarLuz" style={{ height: '32px', width: 'auto', display: 'block', verticalAlign: 'middle' }} />
            </Link>

            <nav className="hidden md:flex gap-6 items-center">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-white/90 hover:text-white transition-colors whitespace-nowrap"
                  style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500, fontSize: '15px' }}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <button
              className="md:hidden p-2 text-white"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <List size={24} />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden border-t border-white/10" style={{ backgroundColor: '#0A1628' }}>
            <div className="px-4 pt-2 pb-4 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block px-3 py-2 rounded-md text-base font-medium ${
                    location === link.href ? "text-[#6ABF4B]" : "text-white/85 hover:text-white"
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
              <Link href="/" style={{ textDecoration: 'none', display: 'block', lineHeight: 0, marginBottom: '16px' }}>
                <img src="/trocarluz-logo.png" alt="TrocarLuz" style={{ height: '32px', width: 'auto', display: 'block' }} />
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
                <li><Link href="/comparar-desconto" className="text-[#9EA3B0] hover:text-white text-sm transition-colors">Ver desconto disponível</Link></li>
                <li><Link href="/enviar-conta" className="text-[#9EA3B0] hover:text-white text-sm transition-colors">Enviar conta de luz</Link></li>
                <li><Link href="/para-sua-casa" className="text-[#9EA3B0] hover:text-white text-sm transition-colors">Para residências</Link></li>
                <li><Link href="/para-sua-empresa" className="text-[#9EA3B0] hover:text-white text-sm transition-colors">Para empresas</Link></li>
                <li><Link href="/carro-eletrico" className="text-[#9EA3B0] hover:text-white text-sm transition-colors">Carro Elétrico</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-display font-semibold text-lg mb-4">Recursos</h4>
              <ul className="space-y-2">
                <li><Link href="/geracao-distribuida" className="text-[#9EA3B0] hover:text-white text-sm transition-colors">Geração Distribuída</Link></li>
                <li><Link href="/mercado-livre-energia" className="text-[#9EA3B0] hover:text-white text-sm transition-colors">Mercado Livre</Link></li>
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
                <li><Link href="/parceiros/veiculos-eletricos" className="text-[#9EA3B0] hover:text-white text-sm transition-colors">Parceiros EV</Link></li>
                <li><Link href="/politica-de-privacidade" className="text-[#9EA3B0] hover:text-white text-sm transition-colors">Política de Privacidade</Link></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-[#2a3047] pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-[#6B7080]">
            <p>© {new Date().getFullYear()} TrocarLuz. Todos os direitos reservados. Broker certificado CCEE.</p>
            <div className="flex gap-4">
              <Link href="/politica-de-privacidade" className="hover:text-white transition-colors">Política de Privacidade</Link>
              <span>Ajudando o Brasil a comparar melhor e economizar.</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
