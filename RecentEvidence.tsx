import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Badge } from './ui/badge'
import { Clock, FileText, Shield, Key, Database } from 'lucide-react'

interface Evidence {
  id: string
  timestamp: string
  title: string
  type: 'policy' | 'test' | 'implementation' | 'review'
  function: string
  icon: React.ReactNode
}

const recentEvidence: Evidence[] = [
  {
    id: '1',
    timestamp: '8/9/2025, 8:36:05 PM',
    title: 'Applied: RS.RP-01 → IR plan established & maintained',
    type: 'policy',
    function: 'Respond',
    icon: <FileText className="w-4 h-4" />
  },
  {
    id: '2',
    timestamp: '8/9/2025, 7:01:02 PM',
    title: 'Backups tested',
    type: 'test',
    function: 'Recover',
    icon: <Database className="w-4 h-4" />
  },
  {
    id: '3',
    timestamp: '8/9/2025, 7:01:02 PM',
    title: 'Encryption keys rotated',
    type: 'implementation',
    function: 'Protect',
    icon: <Key className="w-4 h-4" />
  },
  {
    id: '4',
    timestamp: '8/9/2025, 7:01:02 PM',
    title: 'DLP rules deployed',
    type: 'implementation',
    function: 'Protect',
    icon: <Shield className="w-4 h-4" />
  }
]

export function RecentEvidence() {
  const getTypeColor = (type: string) => {
    switch (type) {
      case 'policy': return 'bg-blue-500/20 text-blue-300'
      case 'test': return 'bg-purple-500/20 text-purple-300'
      case 'implementation': return 'bg-green-500/20 text-green-300'
      case 'review': return 'bg-orange-500/20 text-orange-300'
      default: return 'bg-gray-500/20 text-gray-300'
    }
  }

  return (
    <Card className="bg-gray-900 border-gray-800 h-96">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Clock className="w-5 h-5" />
            Recent Evidence
          </CardTitle>
          <span className="text-xs text-gray-500">latest 8</span>
        </div>
      </CardHeader>
      <CardContent className="space-y-3 max-h-64 overflow-y-auto">
        {recentEvidence.map((item) => (
          <div
            key={item.id}
            className="flex items-start gap-3 p-3 rounded-lg bg-gray-800/50 hover:bg-gray-800 transition-colors cursor-pointer"
          >
            <div className={`p-2 rounded-full ${getTypeColor(item.type)}`}>
              {item.icon}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2">
                <p className="text-sm text-gray-200 leading-tight">
                  {item.title}
                </p>
                <Badge variant="outline" className="text-xs whitespace-nowrap">
                  {item.function}
                </Badge>
              </div>
              <p className="text-xs text-gray-400 mt-1">{item.timestamp}</p>
            </div>
          </div>
        ))}
        
        <div className="pt-2 text-center">
          <button className="text-xs text-blue-400 hover:text-blue-300 transition-colors">
            View all evidence →
          </button>
        </div>
      </CardContent>
    </Card>
  )
}