
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
import InvestmentCategoryPage from "./pages/InvestmentCategoryPage";
import InvestmentProviderPage from "./pages/InvestmentProviderPage";
import SIPCancelPage from "./pages/SIPCancelPage";
import StartSIPPage from "./pages/StartSIPPage";
import MutualFundFiltersPage from "./pages/MutualFundFiltersPage";
import TransactionHistoryPage from "./pages/TransactionHistoryPage";
import TransactionDetailsPage from "./pages/TransactionDetailsPage";
import PortfolioPage from "./pages/PortfolioPage";
import ScanPayPage from "./pages/ScanPayPage";
import SIPManagementPage from "./pages/SIPManagementPage";
import RedeemFundPage from "./pages/RedeemFundPage";
import SIPDashboard from "./pages/SIPDashboard";
import FundComparePage from "./pages/FundComparePage";
import CartPage from "./pages/CartPage";
import WatchlistPage from "./pages/WatchlistPage";

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
          <Route path="/payments/scan" element={<ScanPayPage />} />
          <Route path="/transactions" element={<TransactionHistoryPage />} />
          <Route path="/transaction/:id" element={<TransactionDetailsPage />} />
          <Route path="/transaction-history" element={<TransactionHistoryPage />} />
          <Route path="/payment-history" element={<TransactionHistoryPage />} />
          <Route path="/portfolio" element={<PortfolioPage />} />
          <Route path="/portfolio/sips" element={<PortfolioPage />} />
          <Route path="/invest" element={<InvestPage />} />
          <Route path="/invest/fund/:fundId" element={<FundDetailsPage />} />
          <Route path="/invest/confirm" element={<InvestConfirmPage />} />
          <Route path="/invest/options/:fundId" element={<InvestmentOptionsPage />} />
          <Route path="/invest/mutual-funds" element={<MutualFundProviderPage />} />
          <Route path="/invest/categories" element={<InvestmentCategoryPage />} />
          <Route path="/invest/category/:categoryId" element={<InvestmentCategoryPage />} />
          <Route path="/invest/provider/:providerId" element={<InvestmentProviderPage />} />
          <Route path="/invest/sip/start/:fundId" element={<StartSIPPage />} />
          <Route path="/invest/sip/cancel/:sipId" element={<SIPCancelPage />} />
          <Route path="/invest/sip/modify/:fundId" element={<StartSIPPage />} />
          <Route path="/invest/sip/management" element={<SIPManagementPage />} />
          <Route path="/invest/sip/dashboard" element={<SIPDashboard />} />
          <Route path="/invest/fund/redeem/:fundId" element={<RedeemFundPage />} />
          <Route path="/invest/filters" element={<MutualFundFiltersPage />} />
          <Route path="/invest/compare" element={<FundComparePage />} />
          <Route path="/invest/cart" element={<CartPage />} />
          <Route path="/invest/watchlist" element={<WatchlistPage />} />
          <Route path="/bills" element={<BillsPage />} />
          <Route path="/bills/category/:categoryId" element={<BillCategoryPage />} />
          <Route path="/bills/upcoming" element={<BillsPage />} />
          <Route path="/more" element={<MorePage />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
