import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { CircularProgressGauge } from './CircularProgressGauge'
import { RecentEvidence } from './RecentEvidence'

interface ComplianceData {
  function: string
  percentage: number
  color: string
  description: string
  controlsCount: number
  implementedCount: number
}

const complianceData: ComplianceData[] = [
  {
    function: 'Govern',
    percentage: 11,
    color: '#EF4444',
    description: 'Organizational cybersecurity governance and risk management',
    controlsCount: 27,
    implementedCount: 3
  },
  {
    function: 'Identify',
    percentage: 16,
    color: '#F97316',
    description: 'Asset management and risk assessment capabilities',
    controlsCount: 25,
    implementedCount: 4
  },
  {
    function: 'Protect',
    percentage: 11,
    color: '#EAB308',
    description: 'Safeguards to ensure delivery of critical services',
    controlsCount: 36,
    implementedCount: 4
  },
  {
    function: 'Detect',
    percentage: 11,
    color: '#22D3EE',
    description: 'Activities to identify cybersecurity incidents',
    controlsCount: 18,
    implementedCount: 2
  },
  {
    function: 'Respond',
    percentage: 8,
    color: '#A855F7',
    description: 'Response planning and communications',
    controlsCount: 25,
    implementedCount: 2
  },
  {
    function: 'Recover',
    percentage: 0,
    color: '#10B981',
    description: 'Plans for resilience and recovery',
    controlsCount: 15,
    implementedCount: 0
  }
]

export function ComplianceDashboard() {
  const [selectedFunction, setSelectedFunction] = useState<string | null>(null)

  const overallCompliance = Math.round(
    complianceData.reduce((sum, item) => sum + item.percentage, 0) / complianceData.length
  )

  const totalControls = complianceData.reduce((sum, item) => sum + item.controlsCount, 0)
  const totalImplemented = complianceData.reduce((sum, item) => sum + item.implementedCount, 0)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold">Overall</h2>
          <p className="text-gray-400 text-sm mt-1">Your Org • FY2025 Q3</p>
        </div>
      </div>

      {/* Main Compliance Display */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card className="bg-gray-900 border-gray-800 h-96 flex items-center justify-center">
            <div className="text-center">
              <CircularProgressGauge 
                percentage={overallCompliance} 
                size={200}
                strokeWidth={12}
                color="#22D3EE"
              />
              <div className="mt-4">
                <div className="text-4xl font-bold">{overallCompliance}%</div>
                <div className="text-gray-400 text-sm mt-1">Overall Compliance</div>
                <div className="text-xs text-gray-500 mt-2">
                  {totalImplemented} of {totalControls} controls implemented
                </div>
              </div>
            </div>
          </Card>
        </div>

        <div className="space-y-4">
          <RecentEvidence />
        </div>
      </div>

      {/* Function-specific Gauges */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {complianceData.map((item) => (
          <Card 
            key={item.function}
            className="bg-gray-900 border-gray-800 cursor-pointer transition-all hover:bg-gray-800"
            onClick={() => setSelectedFunction(item.function)}
          >
            <CardContent className="p-4">
              <div className="flex flex-col items-center text-center">
                <CircularProgressGauge 
                  percentage={item.percentage} 
                  size={80}
                  strokeWidth={6}
                  color={item.color}
                />
                <div className="mt-2">
                  <div className="font-bold text-lg">{item.percentage}%</div>
                  <div className="text-sm text-gray-300">{item.function}</div>
                  <div className="text-xs text-gray-500 mt-1">click to drill in</div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Function Details Modal/Panel */}
      {selectedFunction && (
        <Card className="bg-gray-900 border-gray-800 mt-6">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                {selectedFunction} Function Details
                <Badge variant="outline" className="text-xs">
                  {complianceData.find(f => f.function === selectedFunction)?.percentage}% Complete
                </Badge>
              </CardTitle>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => setSelectedFunction(null)}
                className="text-gray-400 hover:text-white"
              >
                ✕
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-gray-300">
                {complianceData.find(f => f.function === selectedFunction)?.description}
              </p>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-400">Total Controls:</span>
                  <span className="ml-2 font-semibold">
                    {complianceData.find(f => f.function === selectedFunction)?.controlsCount}
                  </span>
                </div>
                <div>
                  <span className="text-gray-400">Implemented:</span>
                  <span className="ml-2 font-semibold text-green-400">
                    {complianceData.find(f => f.function === selectedFunction)?.implementedCount}
                  </span>
                </div>
              </div>
              <div className="pt-4">
                <Button className="mr-2">View Controls</Button>
                <Button variant="outline">Add Evidence</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}