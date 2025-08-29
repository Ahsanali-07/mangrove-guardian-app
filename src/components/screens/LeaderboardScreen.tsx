import { Trophy, Award, Star, Target, Camera } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface LeaderboardUser {
  id: string;
  name: string;
  avatar?: string;
  points: number;
  badges: string[];
  rank: number;
}

// Mock data for demonstration
const mockUsers: LeaderboardUser[] = [
  { id: "1", name: "Maria Santos", points: 2450, badges: ["Guardian", "Reporter", "Hero"], rank: 1 },
  { id: "2", name: "John Chen", points: 2100, badges: ["Guardian", "Reporter"], rank: 2 },
  { id: "3", name: "Sarah Johnson", points: 1890, badges: ["Reporter", "Hero"], rank: 3 },
  { id: "4", name: "You", points: 1245, badges: ["Reporter"], rank: 4 },
  { id: "5", name: "Mike Rodriguez", points: 1100, badges: ["Guardian"], rank: 5 },
];

const getBadgeIcon = (badge: string) => {
  switch (badge) {
    case "Guardian": return <Award className="h-4 w-4" />;
    case "Reporter": return <Camera className="h-4 w-4" />;
    case "Hero": return <Star className="h-4 w-4" />;
    default: return <Target className="h-4 w-4" />;
  }
};

const getRankColor = (rank: number) => {
  switch (rank) {
    case 1: return "bg-gradient-sunset text-white";
    case 2: return "bg-secondary text-secondary-foreground";
    case 3: return "bg-earth-brown text-white";
    default: return "bg-muted text-muted-foreground";
  }
};

export const LeaderboardScreen = () => {
  const currentUser = mockUsers.find(user => user.name === "You");

  return (
    <div className="min-h-screen bg-gradient-primary">
      {/* Header */}
      <div className="pt-12 pb-8 px-6 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-4 animate-float">
          <Trophy className="h-8 w-8 text-white" />
        </div>
        <h1 className="text-3xl font-bold text-white mb-2">Community Champions</h1>
        <p className="text-white/80">Protecting mangroves together</p>
      </div>

      {/* Current User Highlight */}
      {currentUser && (
        <div className="px-6 mb-6">
          <Card className="border-2 border-primary bg-gradient-to-r from-primary/5 to-secondary/5">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold ${getRankColor(currentUser.rank)}`}>
                    #{currentUser.rank}
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Your Position</p>
                    <p className="text-sm text-muted-foreground">{currentUser.points} points</p>
                  </div>
                </div>
                <div className="flex space-x-1">
                  {currentUser.badges.map((badge) => (
                    <Badge key={badge} variant="secondary" className="text-xs">
                      {getBadgeIcon(badge)}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Leaderboard List */}
      <div className="bg-background rounded-t-3xl min-h-96 pt-6 px-6">
        <h2 className="text-xl font-semibold mb-4">Top Guardians</h2>
        <div className="space-y-3 pb-6">
          {mockUsers.map((user) => (
            <Card key={user.id} className={`${user.name === "You" ? "ring-2 ring-primary" : ""}`}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`flex items-center justify-center w-10 h-10 rounded-full text-sm font-bold ${getRankColor(user.rank)}`}>
                      #{user.rank}
                    </div>
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={user.avatar} />
                      <AvatarFallback className="bg-primary text-primary-foreground">
                        {user.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold">{user.name}</p>
                      <p className="text-sm text-muted-foreground">{user.points} points</p>
                    </div>
                  </div>
                  <div className="flex space-x-1">
                    {user.badges.map((badge) => (
                      <Badge key={badge} variant="outline" className="text-xs px-2 py-1">
                        {getBadgeIcon(badge)}
                        <span className="ml-1 hidden sm:inline">{badge}</span>
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};