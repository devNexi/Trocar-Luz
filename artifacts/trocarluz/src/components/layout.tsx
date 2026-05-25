import { Link, useLocation } from "wouter";
import { ReactNode, useState, useEffect } from "react";
import { List, X } from "@phosphor-icons/react";

function BoltIcon({ style }: { style?: React.CSSProperties }) {
  return (
    <svg width="16" height="22" viewBox="0 0 16 22" fill="none" aria-hidden="true" style={{ display: 'inline-block', verticalAlign: 'middle', marginBottom: '2px', ...style }}>
      <path d="M9 0L1 13h6L5 22l10-13H9L11 0z" fill="#6ABF4B"/>
    </svg>
  );
}

const logoStyle: React.CSSProperties = {
  fontFamily: "'Poppins', sans-serif",
  fontWeight: 800,
  fontSize: '22px',
  letterSpacing: '-0.02em',
  lineHeight: 1,
  textDecoration: 'none',
  display: 'flex',
  alignItems: 'center',
  gap: '5px',
};

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
    { href: "/para-sua-casa", label: "Para sua casa" },
    { href: "/para-sua-empresa", label: "Para sua empresa" },
    { href: "/geracao-distribuida", label: "Geração Distribuída" },
    { href: "/energia-2028", label: "Energia 2028" },
    { href: "/guias", label: "Guias" },
    { href: "/estados", label: "Por Estado" },
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
          <div className="flex justify-between h-16 items-center">
            {/* Nav logo — no PNG, no box */}
            <Link href="/" style={logoStyle}>
              <BoltIcon />
              <span style={{ color: '#6ABF4B' }}>TROCAR</span>
              <span style={{ color: '#1A3A5C' }}>LUZ</span>
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
              {/* Footer logo — "LUZ" in white so it reads on dark bg */}
              <Link href="/" className="inline-flex items-center gap-1 mb-4" style={{ ...logoStyle, fontSize: '20px' }}>
                <BoltIcon style={{ filter: 'brightness(0) invert(1)' }} />
                <span style={{ color: '#6ABF4B' }}>TROCAR</span>
                <span style={{ color: '#FFFFFF' }}>LUZ</span>
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
