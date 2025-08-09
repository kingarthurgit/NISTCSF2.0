import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Switch } from './ui/switch'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { Label } from './ui/label'
import { Textarea } from './ui/textarea'
import { Badge } from './ui/badge'
import { Settings, Users, Bell, Database, Shield, Calendar } from 'lucide-react'

export function SettingsView() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold">Settings</h2>
          <p className="text-gray-400 text-sm mt-1">Configure your NIST CSF compliance environment</p>
        </div>
        <Button>Save Changes</Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Organization Settings */}
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="w-5 h-5" />
              Organization
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="org-name">Organization Name</Label>
              <Input 
                id="org-name" 
                defaultValue="Your Organization" 
                className="bg-gray-800 border-gray-700"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="fiscal-year">Fiscal Year</Label>
              <Select defaultValue="fy2025">
                <SelectTrigger className="bg-gray-800 border-gray-700">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-700">
                  <SelectItem value="fy2024">FY 2024</SelectItem>
                  <SelectItem value="fy2025">FY 2025</SelectItem>
                  <SelectItem value="fy2026">FY 2026</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="industry">Industry</Label>
              <Select defaultValue="financial">
                <SelectTrigger className="bg-gray-800 border-gray-700">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-700">
                  <SelectItem value="financial">Financial Services</SelectItem>
                  <SelectItem value="healthcare">Healthcare</SelectItem>
                  <SelectItem value="government">Government</SelectItem>
                  <SelectItem value="manufacturing">Manufacturing</SelectItem>
                  <SelectItem value="technology">Technology</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Organization Description</Label>
              <Textarea 
                id="description"
                placeholder="Brief description of your organization..."
                className="bg-gray-800 border-gray-700"
              />
            </div>
          </CardContent>
        </Card>

        {/* User Management */}
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              Team Management
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              {[
                { name: 'Alice Johnson', role: 'Admin', email: 'alice@company.com' },
                { name: 'Bob Smith', role: 'Manager', email: 'bob@company.com' },
                { name: 'Carol Davis', role: 'Analyst', email: 'carol@company.com' }
              ].map((user, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                  <div>
                    <p className="font-semibold">{user.name}</p>
                    <p className="text-sm text-gray-400">{user.email}</p>
                  </div>
                  <Badge variant="outline">{user.role}</Badge>
                </div>
              ))}
            </div>
            <Button className="w-full" variant="outline">
              Invite Team Member
            </Button>
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="w-5 h-5" />
              Notifications
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="email-notifications">Email Notifications</Label>
                <p className="text-sm text-gray-400">Receive email updates on compliance changes</p>
              </div>
              <Switch id="email-notifications" defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="due-date-alerts">Due Date Alerts</Label>
                <p className="text-sm text-gray-400">Get notified when controls are due</p>
              </div>
              <Switch id="due-date-alerts" defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="progress-reports">Weekly Progress Reports</Label>
                <p className="text-sm text-gray-400">Receive weekly compliance summaries</p>
              </div>
              <Switch id="progress-reports" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="notification-frequency">Report Frequency</Label>
              <Select defaultValue="weekly">
                <SelectTrigger className="bg-gray-800 border-gray-700">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-700">
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Data & Compliance */}
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="w-5 h-5" />
              Data & Compliance
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="compliance-framework">Primary Framework</Label>
              <Select defaultValue="nist-csf-2.0">
                <SelectTrigger className="bg-gray-800 border-gray-700">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-700">
                  <SelectItem value="nist-csf-2.0">NIST CSF 2.0</SelectItem>
                  <SelectItem value="nist-csf-1.1">NIST CSF 1.1</SelectItem>
                  <SelectItem value="iso-27001">ISO 27001</SelectItem>
                  <SelectItem value="sox">SOX</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="auto-backup">Automatic Backups</Label>
                <p className="text-sm text-gray-400">Daily backup of compliance data</p>
              </div>
              <Switch id="auto-backup" defaultChecked />
            </div>

            <div className="space-y-2">
              <Label htmlFor="retention-period">Data Retention</Label>
              <Select defaultValue="7-years">
                <SelectTrigger className="bg-gray-800 border-gray-700">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-700">
                  <SelectItem value="3-years">3 Years</SelectItem>
                  <SelectItem value="5-years">5 Years</SelectItem>
                  <SelectItem value="7-years">7 Years</SelectItem>
                  <SelectItem value="10-years">10 Years</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="pt-4">
              <Button variant="outline" className="w-full">
                Export All Data
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Security Settings */}
        <Card className="bg-gray-900 border-gray-800 lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="w-5 h-5" />
              Security & Access
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="two-factor">Two-Factor Authentication</Label>
                    <p className="text-sm text-gray-400">Require 2FA for all users</p>
                  </div>
                  <Switch id="two-factor" defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="session-timeout">Auto Logout</Label>
                    <p className="text-sm text-gray-400">Automatic session timeout</p>
                  </div>
                  <Switch id="session-timeout" defaultChecked />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="session-duration">Session Duration</Label>
                  <Select defaultValue="8-hours">
                    <SelectTrigger className="bg-gray-800 border-gray-700">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-700">
                      <SelectItem value="1-hour">1 Hour</SelectItem>
                      <SelectItem value="4-hours">4 Hours</SelectItem>
                      <SelectItem value="8-hours">8 Hours</SelectItem>
                      <SelectItem value="24-hours">24 Hours</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="audit-logging">Audit Logging</Label>
                    <p className="text-sm text-gray-400">Log all user activities</p>
                  </div>
                  <Switch id="audit-logging" defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="ip-restrictions">IP Restrictions</Label>
                    <p className="text-sm text-gray-400">Limit access by IP address</p>
                  </div>
                  <Switch id="ip-restrictions" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="backup-frequency">Backup Frequency</Label>
                  <Select defaultValue="daily">
                    <SelectTrigger className="bg-gray-800 border-gray-700">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-700">
                      <SelectItem value="hourly">Hourly</SelectItem>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}