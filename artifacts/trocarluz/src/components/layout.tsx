import { Link, useLocation } from "wouter";
import { type ReactNode, useState, useEffect, useRef } from "react";
import { List, X } from "@phosphor-icons/react";
import { ScrollProgress } from "./scroll-progress";

const NAV_LINKS = [
  { href: "/comparar-desconto", label: "Ver desconto" },
  { href: "/para-sua-casa",      label: "Para sua casa" },
  { href: "/para-sua-empresa",   label: "Para sua empresa" },
  { href: "/geracao-distribuida",label: "Geração Distribuída" },
  { href: "/carro-eletrico",     label: "Carro Elétrico" },
  { href: "/guias",              label: "Guias" },
  { href: "/perguntas-frequentes",label: "Dúvidas" },
];

export function Layout({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const hamburgerRef = useRef<HTMLButtonElement>(null);

  const isHome = location === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
      mobileMenuRef.current?.focus();
    } else {
      document.body.style.overflow = "";
      hamburgerRef.current?.focus();
    }
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const navBg = scrolled ? "rgba(255,255,255,0.98)" : "rgba(255,255,255,0.92)";
  const navBorder = "1px solid #E6E4DC";
  const linkColor = "#0E1525";
  const linkHoverColor = "#1FA459";

  return (
    <div className="min-h-[100dvh] flex flex-col" style={{ backgroundColor: "var(--bg-alt)" }}>
      <ScrollProgress />

      {/* ── Floating pill nav ──────────────────────────────────────── */}
      <header
        aria-label="Navegação principal"
        style={{
          position: "fixed",
          top: "16px",
          left: "clamp(12px, 3vw, 24px)",
          right: "clamp(12px, 3vw, 24px)",
          zIndex: 100,
          borderRadius: "999px",
          background: navBg,
          border: navBorder,
          boxShadow: scrolled ? "var(--shadow-nav)" : "none",
          backdropFilter: "blur(14px)",
          WebkitBackdropFilter: "blur(14px)",
          transition: "background 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease",
        }}
      >
        <div
          style={{
            maxWidth: "var(--container)",
            margin: "0 auto",
            padding: "0 clamp(16px, 2.5vw, 28px)",
            height: "60px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "16px",
          }}
        >
          {/* Logo */}
          <Link
            href="/"
            aria-label="TrocarLuz — página inicial"
            style={{ display: "flex", alignItems: "center", lineHeight: 0, flexShrink: 0 }}
          >
            <img
              src="/trocarluz-logo.png"
              alt="TrocarLuz"
              style={{ height: "28px", width: "auto", display: "block" }}
            />
          </Link>

          {/* Desktop nav */}
          <nav
            aria-label="Links do site"
            className="nav-desktop"
            style={{ gap: "clamp(12px, 1.6vw, 24px)", alignItems: "center" }}
          >
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                style={{
                  fontFamily: "var(--app-font-sans)",
                  fontWeight: 500,
                  fontSize: "14px",
                  color: location === link.href ? "var(--green)" : linkColor,
                  textDecoration: "none",
                  whiteSpace: "nowrap",
                  transition: "color 0.15s ease",
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = linkHoverColor; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = location === link.href ? "var(--green)" : linkColor; }}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <Link
            href="/comparar-desconto"
            className="nav-cta"
            style={{
              fontFamily: "var(--app-font-sans)",
              fontWeight: 500,
              fontSize: "14px",
              padding: "10px 22px",
              borderRadius: "999px",
              backgroundColor: "var(--green-text)",
              color: "#fff",
              textDecoration: "none",
              whiteSpace: "nowrap",
              flexShrink: 0,
              transition: "background 0.15s ease, transform 0.1s ease",
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLAnchorElement;
              el.style.background = "var(--green)";
              el.style.transform = "translateY(-1px)";
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLAnchorElement;
              el.style.background = "var(--green-text)";
              el.style.transform = "";
            }}
          >
            Ver desconto
          </Link>

          {/* Hamburger */}
          <button
            ref={hamburgerRef}
            className="nav-hamburger"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? "Fechar menu" : "Abrir menu"}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: "6px",
              color: "var(--text)",
              display: "flex",
              alignItems: "center",
            }}
          >
            {mobileOpen ? <X size={22} /> : <List size={22} />}
          </button>
        </div>
      </header>

      {/* ── Mobile slide-down sheet ─────────────────────────────────── */}
      {mobileOpen && (
        <>
          <div
            aria-hidden="true"
            onClick={() => setMobileOpen(false)}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 98,
              background: "rgba(14,21,37,0.45)",
              backdropFilter: "blur(2px)",
            }}
          />
          <div
            id="mobile-menu"
            ref={mobileMenuRef}
            role="dialog"
            aria-modal="true"
            aria-label="Menu de navegação"
            tabIndex={-1}
            style={{
              position: "fixed",
              top: "84px",
              left: "clamp(12px, 3vw, 24px)",
              right: "clamp(12px, 3vw, 24px)",
              zIndex: 99,
              borderRadius: "22px",
              background: "rgba(22,32,58,0.97)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              border: "1px solid rgba(255,255,255,0.10)",
              boxShadow: "var(--shadow-nav)",
              padding: "8px 0 16px",
            }}
          >
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                style={{
                  display: "block",
                  padding: "13px 24px",
                  fontFamily: "var(--app-font-sans)",
                  fontWeight: 500,
                  fontSize: "16px",
                  color: location === link.href ? "var(--lime)" : "rgba(255,255,255,0.88)",
                  textDecoration: "none",
                }}
              >
                {link.label}
              </Link>
            ))}
            <div style={{ padding: "12px 20px 4px" }}>
              <Link
                href="/comparar-desconto"
                onClick={() => setMobileOpen(false)}
                style={{
                  display: "block",
                  textAlign: "center",
                  padding: "14px",
                  borderRadius: "999px",
                  backgroundColor: "var(--green)",
                  color: "#fff",
                  fontFamily: "var(--app-font-sans)",
                  fontWeight: 500,
                  fontSize: "15px",
                  textDecoration: "none",
                }}
              >
                Ver desconto disponível
              </Link>
            </div>
          </div>
        </>
      )}

      {/* ── Page content ────────────────────────────────────────────── */}
      <main id="main-content" className="flex-1">
        {children}
      </main>

      {/* ── Footer ─────────────────────────────────────────────────── */}
      <footer
        aria-label="Rodapé"
        style={{ backgroundColor: "var(--bg-invert)", color: "var(--text-invert)" }}
      >
        <div
          style={{
            maxWidth: "var(--container)",
            margin: "0 auto",
            padding: "clamp(48px, 8vw, 80px) var(--gutter) clamp(32px, 4vw, 48px)",
          }}
        >
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
            <div className="md:col-span-1">
              <Link href="/" style={{ display: "block", lineHeight: 0, marginBottom: "16px" }}>
                <img
                  src="/trocarluz-logo.png"
                  alt="TrocarLuz"
                  style={{ height: "28px", width: "auto", display: "block" }}
                />
              </Link>
              <p
                style={{
                  fontFamily: "var(--app-font-sans)",
                  fontSize: "14px",
                  color: "var(--text-invert-muted)",
                  marginBottom: "16px",
                  lineHeight: "1.6",
                }}
              >
                Parceiro de Ótima Energia
              </p>
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid var(--border-invert)",
                  borderRadius: "999px",
                  padding: "5px 14px",
                  fontFamily: "var(--app-font-sans)",
                  fontSize: "12px",
                  fontWeight: 500,
                  color: "var(--text-invert-muted)",
                }}
              >
                ✓ Parceiros verificados
              </span>
            </div>

            {[
              {
                title: "Serviços",
                links: [
                  { href: "/comparar-desconto", label: "Ver desconto disponível" },
                  { href: "/enviar-conta",      label: "Enviar conta de luz" },
                  { href: "/para-sua-casa",     label: "Para residências" },
                  { href: "/para-sua-empresa",  label: "Para empresas" },
                  { href: "/carro-eletrico",    label: "Carro Elétrico" },
                ],
              },
              {
                title: "Recursos",
                links: [
                  { href: "/geracao-distribuida",   label: "Geração Distribuída" },
                  { href: "/mercado-livre-energia",  label: "Mercado Livre" },
                  { href: "/estados",               label: "Por Estado" },
                  { href: "/energia-2028",          label: "Energia 2028" },
                  { href: "/guias",                 label: "Guias" },
                  { href: "/perguntas-frequentes",  label: "Perguntas Frequentes" },
                ],
              },
              {
                title: "Empresa",
                links: [
                  { href: "/sobre",                      label: "Sobre nós" },
                  { href: "/parceiros/veiculos-eletricos",label: "Parceiros EV" },
                  { href: "/politica-de-privacidade",    label: "Política de Privacidade" },
                ],
              },
            ].map((col) => (
              <div key={col.title}>
                <h4
                  style={{
                    fontFamily: "var(--app-font-display)",
                    fontWeight: 600,
                    fontSize: "15px",
                    color: "var(--text-invert)",
                    marginBottom: "16px",
                    letterSpacing: "0.02em",
                  }}
                >
                  {col.title}
                </h4>
                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "10px" }}>
                  {col.links.map((l) => (
                    <li key={l.href}>
                      <Link
                        href={l.href}
                        style={{
                          fontFamily: "var(--app-font-sans)",
                          fontSize: "14px",
                          color: "var(--text-invert-muted)",
                          textDecoration: "none",
                          transition: "color 0.15s ease",
                        }}
                        onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "#fff"; }}
                        onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "var(--text-invert-muted)"; }}
                      >
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div
            style={{
              borderTop: "1px solid var(--border-invert)",
              paddingTop: "28px",
              display: "flex",
              flexDirection: "column",
              gap: "12px",
            }}
            className="md:flex-row md:justify-between md:items-center"
          >
            <p
              style={{
                fontFamily: "var(--app-font-sans)",
                fontSize: "13px",
                color: "rgba(154,166,184,0.70)",
              }}
            >
              © {new Date().getFullYear()} TrocarLuz. Todos os direitos reservados. Broker certificado CCEE.
            </p>
            <div
              style={{
                display: "flex",
                gap: "20px",
                fontFamily: "var(--app-font-sans)",
                fontSize: "13px",
                color: "rgba(154,166,184,0.70)",
              }}
            >
              <Link
                href="/politica-de-privacidade"
                style={{ color: "rgba(154,166,184,0.70)", textDecoration: "none", transition: "color 0.15s" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "#fff"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "rgba(154,166,184,0.70)"; }}
              >
                Política de Privacidade
              </Link>
              <span>Ajudando o Brasil a economizar mais.</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
