import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { Download, FileText, BarChart3, Calendar, TrendingUp } from 'lucide-react'

export function ReportsView() {
  const reports = [
    {
      id: '1',
      name: 'Executive Dashboard',
      description: 'High-level compliance overview for leadership',
      type: 'dashboard',
      lastGenerated: '2025-08-09',
      format: 'PDF',
      recipients: ['CEO', 'CISO', 'Board']
    },
    {
      id: '2',
      name: 'Compliance Gap Analysis',
      description: 'Detailed analysis of compliance gaps and remediation plans',
      type: 'analysis',
      lastGenerated: '2025-08-07',
      format: 'Excel',
      recipients: ['Security Team', 'Compliance Officer']
    },
    {
      id: '3',
      name: 'Control Implementation Status',
      description: 'Status of all NIST CSF controls by function and category',
      type: 'status',
      lastGenerated: '2025-08-08',
      format: 'PDF',
      recipients: ['Security Team', 'Auditors']
    },
    {
      id: '4',
      name: 'Risk Assessment Summary',
      description: 'Summary of identified risks and their treatment status',
      type: 'risk',
      lastGenerated: '2025-08-05',
      format: 'Word',
      recipients: ['Risk Committee', 'CISO']
    }
  ]

  const metrics = [
    { label: 'Overall Compliance', value: '9%', trend: '+2%', color: 'text-blue-400' },
    { label: 'Controls Implemented', value: '15/146', trend: '+3', color: 'text-green-400' },
    { label: 'Open Findings', value: '23', trend: '-2', color: 'text-yellow-400' },
    { label: 'Days to Next Audit', value: '127', trend: '-7', color: 'text-red-400' }
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold">Reports & Analytics</h2>
          <p className="text-gray-400 text-sm mt-1">Generate and schedule compliance reports</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Calendar className="w-4 h-4 mr-2" />
            Schedule Report
          </Button>
          <Button>
            <FileText className="w-4 h-4 mr-2" />
            Custom Report
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric, index) => (
          <Card key={index} className="bg-gray-900 border-gray-800">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">{metric.label}</p>
                  <p className="text-2xl font-bold mt-2">{metric.value}</p>
                </div>
                <div className={`flex items-center gap-1 ${metric.color}`}>
                  <TrendingUp className="w-4 h-4" />
                  <span className="text-sm font-semibold">{metric.trend}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Available Reports */}
      <Card className="bg-gray-900 border-gray-800">
        <CardHeader>
          <CardTitle>Available Reports</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {reports.map((report) => (
              <div key={report.id} className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <FileText className="w-5 h-5 text-gray-400" />
                    <div>
                      <h4 className="font-semibold">{report.name}</h4>
                      <p className="text-gray-400 text-sm">{report.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    <span>Last generated: {report.lastGenerated}</span>
                    <Badge variant="outline" className="text-xs">{report.format}</Badge>
                    <span>Recipients: {report.recipients.join(', ')}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 ml-4">
                  <Button variant="outline" size="sm">
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </Button>
                  <Button size="sm">Generate</Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Report Templates */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle className="text-base">Quick Reports</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button variant="ghost" className="w-full justify-start">
              <BarChart3 className="w-4 h-4 mr-2" />
              Compliance Summary
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <FileText className="w-4 h-4 mr-2" />
              Control Status
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <TrendingUp className="w-4 h-4 mr-2" />
              Progress Trends
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle className="text-base">Scheduled Reports</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="text-sm text-gray-400">
              <p>Weekly: Executive Summary</p>
              <p>Monthly: Detailed Status</p>
              <p>Quarterly: Risk Assessment</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle className="text-base">Export Options</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button variant="outline" size="sm" className="w-full">Export to PDF</Button>
            <Button variant="outline" size="sm" className="w-full">Export to Excel</Button>
            <Button variant="outline" size="sm" className="w-full">Export to PowerPoint</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}