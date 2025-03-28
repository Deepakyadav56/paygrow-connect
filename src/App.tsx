
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import OnboardingPage from "./pages/OnboardingPage";
import AuthPage from "./pages/AuthPage";
import VerificationPage from "./pages/VerificationPage";
import SetupAccountPage from "./pages/SetupAccountPage";
import HomePage from "./pages/HomePage";
import PaymentsPage from "./pages/PaymentsPage";
import SendMoneyPage from "./pages/SendMoneyPage";
import InvestPage from "./pages/InvestPage";
import FundDetailsPage from "./pages/FundDetailsPage";
import InvestConfirmPage from "./pages/InvestConfirmPage";
import BillsPage from "./pages/BillsPage";
import MorePage from "./pages/MorePage";
import BillCategoryPage from "./pages/BillCategoryPage";
import MutualFundProviderPage from "./pages/MutualFundProviderPage";
import InvestmentOptionsPage from "./pages/InvestmentOptionsPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<OnboardingPage />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/verification" element={<VerificationPage />} />
          <Route path="/setup" element={<SetupAccountPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/payments" element={<PaymentsPage />} />
          <Route path="/payments/send" element={<SendMoneyPage />} />
          <Route path="/invest" element={<InvestPage />} />
          <Route path="/invest/fund/:fundId" element={<FundDetailsPage />} />
          <Route path="/invest/confirm" element={<InvestConfirmPage />} />
          <Route path="/invest/options/:fundId" element={<InvestmentOptionsPage />} />
          <Route path="/invest/mutual-funds" element={<MutualFundProviderPage />} />
          <Route path="/bills" element={<BillsPage />} />
          <Route path="/bills/category/:categoryId" element={<BillCategoryPage />} />
          <Route path="/more" element={<MorePage />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
