import { ReactNode } from "react";
import { BottomNavigation } from "./BottomNavigation";

interface MobileLayoutProps {
  children: ReactNode;
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const MobileLayout = ({ children, activeTab, onTabChange }: MobileLayoutProps) => {
  return (
    <div className="min-h-screen bg-background">
      <main className="pb-20">
        {children}
      </main>
      <BottomNavigation activeTab={activeTab} onTabChange={onTabChange} />
    </div>
  );
};