import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";

export default function Dashboard() {
  return (
    <div className="w-full min-h-screen bg-gray-50 p-6 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>
          <p className="text-sm text-gray-600">Overview of your application performance</p>
        </div>

        <Button className="mt-4 sm:mt-0">Create New</Button>
      </div>

      {/* KPI Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
            <CardDescription>Current active sessions</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">1,284</p>
            <Badge className="mt-2">+12% this week</Badge>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="text-sm font-medium">Conversions</CardTitle>
            <CardDescription>Completed signups</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">312</p>
            <Badge variant="secondary" className="mt-2">+4%</Badge>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="text-sm font-medium">Revenue</CardTitle>
            <CardDescription>This month</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">$8,921</p>
            <Badge className="mt-2">+9%</Badge>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="text-sm font-medium">Bounce Rate</CardTitle>
            <CardDescription>Sessions dropped</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">27%</p>
            <Badge variant="destructive" className="mt-2">-3%</Badge>
          </CardContent>
        </Card>

      </div>

      {/* Search + Table Section */}
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg">Recent Activity</CardTitle>
          <CardDescription>Latest user actions in the platform</CardDescription>
        </CardHeader>

        <CardContent>
          <div className="flex justify-between mb-4">
            <Input placeholder="Search users..." className="max-w-xs" />
          </div>

          <Separator className="my-4" />

          <div className="space-y-4">

            {/* Item */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage src="" />
                  <AvatarFallback>VR</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">Vishwa R</p>
                  <p className="text-xs text-gray-500">Logged in 2 mins ago</p>
                </div>
              </div>

              <Badge>Active</Badge>
            </div>

            <Separator />

            {/* Item */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage src="" />
                  <AvatarFallback>AR</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">Arun</p>
                  <p className="text-xs text-gray-500">Updated profile</p>
                </div>
              </div>
              <Badge variant="secondary">Update</Badge>
            </div>

            <Separator />

            {/* Item */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage src="" />
                  <AvatarFallback>MK</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">Mohan</p>
                  <p className="text-xs text-gray-500">Deleted account</p>
                </div>
              </div>
              <Badge variant="destructive">Removed</Badge>
            </div>

          </div>
        </CardContent>
      </Card>

    </div>
  );
}
