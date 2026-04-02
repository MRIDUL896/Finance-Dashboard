import { DashboardProvider } from "./context/DashboardContext";
import DashboardPage from "./pages/DashboardPage";

export default function App() {
  return (
    <DashboardProvider>
      <DashboardPage />
    </DashboardProvider>
  );
}