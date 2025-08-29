import { useState } from "react";
import { MobileLayout } from "@/components/MobileLayout";
import { HomeScreen } from "@/components/screens/HomeScreen";
import { ReportScreen } from "@/components/screens/ReportScreen";
import { LeaderboardScreen } from "@/components/screens/LeaderboardScreen";
import { ProfileScreen } from "@/components/screens/ProfileScreen";

const Index = () => {
  const [activeTab, setActiveTab] = useState("home");

  const renderActiveScreen = () => {
    switch (activeTab) {
      case "home":
        return <HomeScreen />;
      case "report":
        return <ReportScreen />;
      case "leaderboard":
        return <LeaderboardScreen />;
      case "profile":
        return <ProfileScreen />;
      default:
        return <HomeScreen />;
    }
  };

  return (
    <MobileLayout activeTab={activeTab} onTabChange={setActiveTab}>
      {renderActiveScreen()}
    </MobileLayout>
  );
};

export default Index;
