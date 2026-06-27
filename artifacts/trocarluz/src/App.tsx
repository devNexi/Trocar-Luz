import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";

// Pages
import Home from "@/pages/home";
import Residential from "@/pages/residential";
import Business from "@/pages/business";
import GD from "@/pages/gd";
import MercadoLivre from "@/pages/mercado-livre";
import Energia2028 from "@/pages/energia-2028";
import StatesIndex from "@/pages/states-index";
import StateDetail from "@/pages/state-detail";
import GuidesIndex from "@/pages/guides-index";
import GuideDetail from "@/pages/guide-detail";
import FAQ from "@/pages/faq";
import About from "@/pages/about";

// New pages
import CompararDesconto from "@/pages/comparar-desconto";
import EnviarConta from "@/pages/enviar-conta";
import StatusPage from "@/pages/status";
import PrivacyPolicy from "@/pages/privacy-policy";
import CarroEletrico from "@/pages/carro-eletrico";
import ParceirosEV from "@/pages/parceiros-ev";

const queryClient = new QueryClient();

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/para-sua-casa" component={Residential} />
      <Route path="/para-sua-empresa" component={Business} />
      <Route path="/geracao-distribuida" component={GD} />
      <Route path="/mercado-livre-energia" component={MercadoLivre} />
      <Route path="/energia-2028" component={Energia2028} />

      {/* GD engine */}
      <Route path="/comparar-desconto" component={CompararDesconto} />
      <Route path="/enviar-conta" component={EnviarConta} />
      <Route path="/status/:publicId" component={StatusPage} />

      {/* Legal */}
      <Route path="/politica-de-privacidade" component={PrivacyPolicy} />

      {/* Content */}
      <Route path="/carro-eletrico" component={CarroEletrico} />
      <Route path="/parceiros/veiculos-eletricos" component={ParceirosEV} />

      {/* Guides & states */}
      <Route path="/estados" component={StatesIndex} />
      <Route path="/estados/:estado" component={StateDetail} />
      <Route path="/guias" component={GuidesIndex} />
      <Route path="/guias/:slug" component={GuideDetail} />

      <Route path="/perguntas-frequentes" component={FAQ} />
      <Route path="/sobre" component={About} />

      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
