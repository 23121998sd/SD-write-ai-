import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/ThemeProvider";
import { HomePage } from "@/pages/HomePage";
import { IndianPaymentPage } from "@/pages/IndianPaymentPage";
import { PaymentPendingPage } from "@/pages/PaymentPendingPage";
import { Toaster } from "@/components/ui/sonner";

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/indian-payment" element={<IndianPaymentPage />} />
          <Route path="/payment-pending" element={<PaymentPendingPage />} />
        </Routes>
      </BrowserRouter>
      <Toaster position="top-right" richColors />
    </ThemeProvider>
  );
}

export default App;
