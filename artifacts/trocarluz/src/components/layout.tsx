import { Link, useLocation } from "wouter";
import { type ReactNode, useState, useEffect, useRef } from "react";
import { X } from "@phosphor-icons/react";
import { ScrollProgress } from "./scroll-progress";

const MAIN_NAV = [
  { href: "/para-sua-casa",      label: "Para sua casa" },
  { href: "/para-sua-empresa",   label: "Para sua empresa" },
  { href: "/geracao-distribuida",label: "Geração Distribuída" },
];

const RESOURCES_NAV = [
  { href: "/carro-eletrico",      label: "Carro Elétrico" },
  { href: "/guias",               label: "Guias" },
  { href: "/perguntas-frequentes",label: "Dúvidas" },
];

const FOOTER_COLUMNS = [
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
];

export function Layout({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [resourcesOpen, setResourcesOpen] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const hamburgerRef = useRef<HTMLButtonElement>(null);
  const resourcesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setMobileOpen(false); }, [location]);
  useEffect(() => { setResourcesOpen(false); }, [location]);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
      mobileMenuRef.current?.focus();
    } else {
      document.body.style.overflow = "";
      if (!mobileOpen) hamburgerRef.current?.focus();
    }
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (resourcesRef.current && !resourcesRef.current.contains(e.target as Node)) {
        setResourcesOpen(false);
      }
    };
    if (resourcesOpen) document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [resourcesOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMobileOpen(false);
        setResourcesOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div className="min-h-[100dvh] flex flex-col" style={{ backgroundColor: "var(--cream)" }}>
      <ScrollProgress />

      {/* ── Fixed header ────────────────────────────────────────────── */}
      <header
        aria-label="Navegação principal"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          padding: "12px clamp(12px, 3vw, 24px)",
          background: scrolled ? "rgba(245,244,239,0.96)" : "transparent",
          backdropFilter: scrolled ? "blur(16px)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(16px)" : "none",
          transition: "background 0.25s ease",
        }}
      >
        <div
          style={{
            maxWidth: "var(--container)",
            margin: "0 auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "16px",
          }}
        >
          {/* Logo — outside pill, left */}
          <Link
            href="/"
            aria-label="TrocarLuz — página inicial"
            style={{ flexShrink: 0, lineHeight: 0 }}
          >
            <img
              src="/trocarluz-logo.png"
              alt="TrocarLuz"
              style={{ height: "28px", width: "auto", display: "block" }}
            />
          </Link>

          {/* Desktop: white floating nav pill (centre) */}
          <nav
            aria-label="Links do site"
            className="nav-pill-desktop"
            style={{
              alignItems: "center",
              gap: "2px",
              backgroundColor: "#fff",
              border: "1px solid var(--border)",
              borderRadius: "999px",
              padding: "4px",
              boxShadow: scrolled
                ? "0 4px 20px rgba(26,36,16,0.10)"
                : "0 2px 12px rgba(26,36,16,0.07)",
              transition: "box-shadow 0.25s ease",
            }}
          >
            {MAIN_NAV.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                style={{
                  fontFamily: "var(--app-font-sans)",
                  fontWeight: 500,
                  fontSize: "14px",
                  color: location === link.href ? "var(--green)" : "var(--ink)",
                  textDecoration: "none",
                  padding: "8px 14px",
                  borderRadius: "999px",
                  whiteSpace: "nowrap",
                  transition: "color 0.15s, background 0.15s",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLAnchorElement;
                  el.style.background = "var(--cream)";
                  if (location !== link.href) el.style.color = "var(--ink)";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLAnchorElement;
                  el.style.background = "";
                  el.style.color = location === link.href ? "var(--green)" : "var(--ink)";
                }}
              >
                {link.label}
              </Link>
            ))}

            {/* Recursos ▾ dropdown */}
            <div ref={resourcesRef} style={{ position: "relative" }}>
              <button
                onClick={() => setResourcesOpen((v) => !v)}
                aria-expanded={resourcesOpen}
                aria-haspopup="true"
                style={{
                  fontFamily: "var(--app-font-sans)",
                  fontWeight: 500,
                  fontSize: "14px",
                  color: "var(--ink)",
                  background: resourcesOpen ? "var(--cream)" : "none",
                  border: "none",
                  padding: "8px 14px",
                  borderRadius: "999px",
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                  display: "flex",
                  alignItems: "center",
                  gap: "4px",
                  transition: "background 0.15s",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.background = "var(--cream)";
                }}
                onMouseLeave={(e) => {
                  if (!resourcesOpen)
                    (e.currentTarget as HTMLButtonElement).style.background = "none";
                }}
              >
                Recursos
                <svg
                  width="12" height="12" viewBox="0 0 12 12" fill="none"
                  aria-hidden="true"
                  style={{
                    transition: "transform 0.2s",
                    transform: resourcesOpen ? "rotate(180deg)" : "rotate(0deg)",
                  }}
                >
                  <path
                    d="M2.5 4.5l3.5 3 3.5-3"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>

              {resourcesOpen && (
                <div
                  role="menu"
                  style={{
                    position: "absolute",
                    top: "calc(100% + 8px)",
                    left: "50%",
                    transform: "translateX(-50%)",
                    background: "#fff",
                    border: "1px solid var(--border)",
                    borderRadius: "16px",
                    padding: "6px",
                    boxShadow: "0 8px 28px rgba(26,36,16,0.12)",
                    minWidth: "180px",
                    zIndex: 10,
                  }}
                >
                  {RESOURCES_NAV.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      role="menuitem"
                      style={{
                        display: "block",
                        padding: "10px 14px",
                        fontFamily: "var(--app-font-sans)",
                        fontWeight: 500,
                        fontSize: "14px",
                        color: "var(--ink)",
                        textDecoration: "none",
                        borderRadius: "10px",
                        transition: "background 0.12s",
                      }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLAnchorElement).style.background = "var(--cream)";
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLAnchorElement).style.background = "";
                      }}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Green "Ver desconto" chip — INSIDE pill */}
            <Link
              href="/comparar-desconto"
              style={{
                fontFamily: "var(--app-font-sans)",
                fontWeight: 600,
                fontSize: "14px",
                color: "#fff",
                backgroundColor: "var(--green)",
                padding: "8px 18px",
                borderRadius: "999px",
                textDecoration: "none",
                whiteSpace: "nowrap",
                flexShrink: 0,
                transition: "background 0.15s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.background = "var(--green-hover)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.background = "var(--green)";
              }}
            >
              Ver desconto
            </Link>
          </nav>

          {/* Desktop: outline CTA — outside pill, right */}
          <Link
            href="/enviar-conta"
            className="nav-pill-desktop"
            style={{
              fontFamily: "var(--app-font-sans)",
              fontWeight: 500,
              fontSize: "14px",
              color: "var(--ink)",
              border: "1.5px solid var(--ink)",
              padding: "8px 18px",
              borderRadius: "999px",
              textDecoration: "none",
              whiteSpace: "nowrap",
              flexShrink: 0,
              transition: "background 0.15s",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.background = "rgba(26,36,16,0.06)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.background = "";
            }}
          >
            Enviar conta de luz
          </Link>

          {/* Mobile: circular hamburger */}
          <button
            ref={hamburgerRef}
            className="nav-hamburger"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? "Fechar menu" : "Abrir menu"}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            style={{
              width: "44px",
              height: "44px",
              borderRadius: "50%",
              backgroundColor: "var(--ink)",
              border: "none",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            {mobileOpen ? (
              <X size={20} color="#fff" />
            ) : (
              <svg width="18" height="14" viewBox="0 0 18 14" fill="none" aria-hidden="true">
                <rect y="0" width="18" height="2" rx="1" fill="#fff" />
                <rect y="6" width="12" height="2" rx="1" fill="#fff" />
                <rect y="12" width="18" height="2" rx="1" fill="#fff" />
              </svg>
            )}
          </button>
        </div>
      </header>

      {/* ── Mobile full-screen sheet ─────────────────────────────────── */}
      {mobileOpen && (
        <>
          <div
            aria-hidden="true"
            onClick={() => setMobileOpen(false)}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 98,
              background: "rgba(26,36,16,0.35)",
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
              inset: 0,
              zIndex: 99,
              background: "#fff",
              display: "flex",
              flexDirection: "column",
              padding: "80px 28px 40px",
              overflowY: "auto",
            }}
          >
            <button
              onClick={() => setMobileOpen(false)}
              aria-label="Fechar menu"
              style={{
                position: "absolute",
                top: "16px",
                right: "20px",
                width: "44px",
                height: "44px",
                borderRadius: "50%",
                backgroundColor: "var(--cream)",
                border: "none",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <X size={20} color="var(--ink)" />
            </button>

            {[...MAIN_NAV, ...RESOURCES_NAV].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                style={{
                  display: "block",
                  padding: "16px 0",
                  fontFamily: "var(--app-font-display)",
                  fontWeight: 600,
                  fontSize: "clamp(20px, 5vw, 26px)",
                  color: location === link.href ? "var(--green)" : "var(--ink)",
                  textDecoration: "none",
                  borderBottom: "1px solid var(--border)",
                }}
              >
                {link.label}
              </Link>
            ))}

            <div style={{ marginTop: "32px", display: "flex", flexDirection: "column", gap: "12px" }}>
              <Link
                href="/comparar-desconto"
                onClick={() => setMobileOpen(false)}
                style={{
                  display: "block",
                  textAlign: "center",
                  padding: "16px",
                  borderRadius: "999px",
                  backgroundColor: "var(--green)",
                  color: "#fff",
                  fontFamily: "var(--app-font-sans)",
                  fontWeight: 600,
                  fontSize: "16px",
                  textDecoration: "none",
                }}
              >
                Ver desconto disponível
              </Link>
              <Link
                href="/enviar-conta"
                onClick={() => setMobileOpen(false)}
                style={{
                  display: "block",
                  textAlign: "center",
                  padding: "16px",
                  borderRadius: "999px",
                  border: "1.5px solid var(--ink)",
                  color: "var(--ink)",
                  fontFamily: "var(--app-font-sans)",
                  fontWeight: 500,
                  fontSize: "16px",
                  textDecoration: "none",
                }}
              >
                Enviar conta de luz
              </Link>
            </div>
          </div>
        </>
      )}

      {/* ── Page content ────────────────────────────────────────────── */}
      <main id="main-content" className="flex-1">
        {children}
      </main>

      {/* ── Footer — cream background, ink text ─────────────────────── */}
      <footer
        aria-label="Rodapé"
        style={{
          backgroundColor: "var(--cream)",
          borderTop: "1px solid var(--border)",
          color: "var(--ink)",
        }}
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
                  color: "rgba(26,36,16,0.60)",
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
                  background: "var(--tint)",
                  border: "1px solid rgba(31,164,89,0.20)",
                  borderRadius: "999px",
                  padding: "5px 14px",
                  fontFamily: "var(--app-font-sans)",
                  fontSize: "12px",
                  fontWeight: 500,
                  color: "var(--green-text)",
                }}
              >
                ✓ Parceiros verificados
              </span>
            </div>

            {FOOTER_COLUMNS.map((col) => (
              <div key={col.title}>
                <h4
                  style={{
                    fontFamily: "var(--app-font-display)",
                    fontWeight: 600,
                    fontSize: "12px",
                    color: "var(--ink)",
                    marginBottom: "16px",
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                  }}
                >
                  {col.title}
                </h4>
                <ul
                  style={{
                    listStyle: "none",
                    padding: 0,
                    margin: 0,
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                  }}
                >
                  {col.links.map((l) => (
                    <li key={l.href}>
                      <Link
                        href={l.href}
                        style={{
                          fontFamily: "var(--app-font-sans)",
                          fontSize: "14px",
                          color: "rgba(26,36,16,0.60)",
                          textDecoration: "none",
                          transition: "color 0.15s ease",
                        }}
                        onMouseEnter={(e) => {
                          (e.currentTarget as HTMLAnchorElement).style.color = "var(--ink)";
                        }}
                        onMouseLeave={(e) => {
                          (e.currentTarget as HTMLAnchorElement).style.color = "rgba(26,36,16,0.60)";
                        }}
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
              borderTop: "1px solid rgba(26,36,16,0.12)",
              paddingTop: "24px",
              display: "flex",
              flexDirection: "column",
              gap: "10px",
            }}
            className="md:flex-row md:justify-between md:items-center"
          >
            <p
              style={{
                fontFamily: "var(--app-font-sans)",
                fontSize: "13px",
                color: "rgba(26,36,16,0.50)",
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
              }}
            >
              <Link
                href="/politica-de-privacidade"
                style={{
                  color: "rgba(26,36,16,0.50)",
                  textDecoration: "none",
                  transition: "color 0.15s",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.color = "var(--ink)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.color = "rgba(26,36,16,0.50)";
                }}
              >
                Política de Privacidade
              </Link>
              <span style={{ color: "rgba(26,36,16,0.50)" }}>
                Ajudando o Brasil a economizar mais.
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
