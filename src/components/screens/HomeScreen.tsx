import { useState } from "react";
import { Camera, Award, MapPin, Users, Leaf, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import mangroveHero from "@/assets/mangrove-hero.jpg";

interface QuickStat {
  icon: any;
  label: string;
  value: string;
  color: string;
}

const quickStats: QuickStat[] = [
  { icon: Camera, label: "Your Reports", value: "12", color: "text-primary" },
  { icon: Award, label: "Points Earned", value: "1,245", color: "text-secondary" },
  { icon: Users, label: "Community", value: "2,341", color: "text-earth-brown" },
  { icon: Shield, label: "Protected", value: "89km²", color: "text-leaf-green" },
];

export const HomeScreen = () => {
  const [userProgress] = useState({
    level: 4,
    currentLevelPoints: 245,
    nextLevelPoints: 500,
    nextBadge: "Mangrove Hero",
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div 
        className="relative h-72 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${mangroveHero})` }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-transparent" />
        
        {/* Content */}
        <div className="relative h-full flex flex-col justify-end p-6 text-white">
          <div className="mb-6">
            <h1 className="text-3xl font-bold mb-2">Community Mangrove Watch</h1>
            <p className="text-white/90 mb-4">Protecting our coastal ecosystems together</p>
            
            <Button 
              variant="hero" 
              size="lg" 
              className="animate-pulse-soft"
              onClick={() => {/* Navigate to report screen */}}
            >
              <Camera className="h-5 w-5 mr-2" />
              Report Incident
            </Button>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="px-6 -mt-8 relative z-10 mb-6">
        <div className="grid grid-cols-2 gap-4">
          {quickStats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index} className="bg-card/95 backdrop-blur-sm shadow-medium">
                <CardContent className="p-4 text-center">
                  <Icon className={`h-6 w-6 mx-auto mb-2 ${stat.color}`} />
                  <div className="text-2xl font-bold mb-1">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Progress Section */}
      <div className="px-6 mb-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Award className="h-5 w-5 mr-2 text-primary" />
              Your Progress
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Level {userProgress.level}</span>
                <Badge variant="outline">{userProgress.nextBadge}</Badge>
              </div>
              
              <Progress 
                value={(userProgress.currentLevelPoints / userProgress.nextLevelPoints) * 100} 
                className="h-3"
              />
              
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>{userProgress.currentLevelPoints} points</span>
                <span>{userProgress.nextLevelPoints} points to next level</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <div className="px-6 mb-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Leaf className="h-5 w-5 mr-2 text-leaf-green" />
              Recent Community Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { user: "Maria S.", action: "reported illegal cutting", time: "2 hours ago", points: 50 },
                { user: "John C.", action: "verified a pollution report", time: "4 hours ago", points: 25 },
                { user: "Sarah J.", action: "completed a conservation task", time: "1 day ago", points: 75 },
              ].map((activity, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-primary rounded-full animate-pulse-soft" />
                    <div>
                      <p className="text-sm font-medium">
                        <span className="text-primary">{activity.user}</span> {activity.action}
                      </p>
                      <p className="text-xs text-muted-foreground">{activity.time}</p>
                    </div>
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    +{activity.points}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Emergency Report */}
      <div className="px-6 mb-20">
        <Card className="border-destructive/20 bg-destructive/5">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-destructive/10 rounded-full flex items-center justify-center">
                <Shield className="h-6 w-6 text-destructive animate-pulse" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-destructive">Urgent Threat?</h3>
                <p className="text-sm text-muted-foreground">
                  Report critical mangrove destruction immediately
                </p>
              </div>
              <Button variant="destructive" size="sm">
                Alert
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};