import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/ThemeProvider";
import { AuthProvider } from "@/components/AuthProvider";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { Navbar } from "@/components/Navbar";
import Index from "./pages/Index.tsx";
import MapPage from "./pages/MapPage.tsx";
import GamePage from "./pages/GamePage.tsx";
import Dashboard from "./pages/Dashboard.tsx";
import Awareness from "./pages/Awareness.tsx";
import Login from "./pages/Login.tsx";
import Missions from "./pages/Missions.tsx";
import PartnerPortal from "./pages/PartnerPortal.tsx";
import Reminders from "./pages/Reminders.tsx";
import PickupScheduler from "./pages/PickupScheduler.tsx";
import Compliance from "./pages/Compliance.tsx";
import Marketplace from "./pages/Marketplace.tsx";
import Innovation from "./pages/Innovation.tsx";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AuthProvider>
            <Navbar />
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/map" element={<MapPage />} />
              <Route path="/game" element={<GamePage />} />
              <Route path="/awareness" element={<Awareness />} />
              <Route path="/login" element={<Login />} />

              <Route element={<ProtectedRoute />}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/missions" element={<Missions />} />
                <Route path="/partner" element={<PartnerPortal />} />
                <Route path="/reminders" element={<Reminders />} />
                <Route path="/pickup" element={<PickupScheduler />} />
                <Route path="/compliance" element={<Compliance />} />
                <Route path="/marketplace" element={<Marketplace />} />
                <Route path="/innovation" element={<Innovation />} />
              </Route>

              <Route path="*" element={<NotFound />} />
            </Routes>
          </AuthProvider>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
