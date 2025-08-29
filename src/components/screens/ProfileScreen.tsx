import { LogOut, Award, Camera, MapPin, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

interface UserReport {
  id: string;
  category: string;
  description: string;
  date: string;
  status: "pending" | "approved" | "under_review";
  points: number;
  thumbnail?: string;
}

const mockReports: UserReport[] = [
  {
    id: "1",
    category: "Illegal Cutting",
    description: "Trees being cut down near the shoreline",
    date: "2024-01-15",
    status: "approved",
    points: 50,
    thumbnail: "/placeholder-report.jpg"
  },
  {
    id: "2",
    category: "Waste Dumping",
    description: "Plastic waste dumped in mangrove area",
    date: "2024-01-10",
    status: "under_review",
    points: 0,
    thumbnail: "/placeholder-report.jpg"
  },
  {
    id: "3",
    category: "Water Pollution",
    description: "Oil spill affecting mangrove roots",
    date: "2024-01-05",
    status: "approved",
    points: 75,
    thumbnail: "/placeholder-report.jpg"
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "approved": return "bg-leaf-green text-white";
    case "under_review": return "bg-sunset-orange text-white";
    case "pending": return "bg-muted text-muted-foreground";
    default: return "bg-muted text-muted-foreground";
  }
};

const getStatusText = (status: string) => {
  switch (status) {
    case "approved": return "Approved";
    case "under_review": return "Under Review";
    case "pending": return "Pending";
    default: return "Unknown";
  }
};

export const ProfileScreen = () => {
  // Mock user data
  const user = {
    name: "Sarah Johnson",
    email: "sarah.johnson@email.com",
    totalPoints: 1245,
    badges: ["Guardian", "Reporter", "Hero"],
    joinDate: "2023-12-01",
    totalReports: mockReports.length,
    approvedReports: mockReports.filter(r => r.status === "approved").length,
  };

  return (
    <div className="min-h-screen bg-gradient-primary">
      {/* Header */}
      <div className="pt-12 pb-8 px-6 text-center">
        <Avatar className="w-24 h-24 mx-auto mb-4 ring-4 ring-white/20">
          <AvatarImage src="/placeholder-avatar.jpg" />
          <AvatarFallback className="bg-white text-primary text-2xl font-bold">
            {user.name.split(' ').map(n => n[0]).join('')}
          </AvatarFallback>
        </Avatar>
        <h1 className="text-2xl font-bold text-white mb-1">{user.name}</h1>
        <p className="text-white/80">{user.email}</p>
      </div>

      <div className="bg-background rounded-t-3xl min-h-96 pt-6 px-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-primary mb-1">{user.totalPoints}</div>
              <div className="text-sm text-muted-foreground">Total Points</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-secondary mb-1">{user.approvedReports}</div>
              <div className="text-sm text-muted-foreground">Reports Approved</div>
            </CardContent>
          </Card>
        </div>

        {/* Badges */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Award className="h-5 w-5 mr-2" />
              Achievements
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {user.badges.map((badge) => (
                <Badge key={badge} className="bg-gradient-primary text-white px-3 py-1">
                  <Award className="h-4 w-4 mr-1" />
                  {badge}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Report History */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Camera className="h-5 w-5 mr-2" />
              My Reports
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockReports.map((report) => (
                <div key={report.id}>
                  <div className="flex items-start space-x-3">
                    <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center">
                      <Camera className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <p className="font-medium text-sm truncate">{report.category}</p>
                        <Badge variant="outline" className={`text-xs ${getStatusColor(report.status)}`}>
                          {getStatusText(report.status)}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
                        {report.description}
                      </p>
                      <div className="flex items-center text-xs text-muted-foreground space-x-4">
                        <div className="flex items-center">
                          <Calendar className="h-3 w-3 mr-1" />
                          {new Date(report.date).toLocaleDateString()}
                        </div>
                        {report.points > 0 && (
                          <div className="text-primary font-medium">
                            +{report.points} points
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <Separator className="mt-4" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Logout Button */}
        <Button variant="outline" className="w-full mb-6">
          <LogOut className="h-4 w-4 mr-2" />
          Logout
        </Button>
      </div>
    </div>
  );
};