import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { Badge } from './ui/badge'
import { Search, Filter, Plus, CheckCircle, AlertCircle, Clock } from 'lucide-react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table'

interface Control {
  id: string
  function: string
  category: string
  subcategory: string
  title: string
  status: 'implemented' | 'in-progress' | 'planned' | 'not-started'
  priority: 'high' | 'medium' | 'low'
  assignee: string
  dueDate: string
  lastUpdated: string
}

const controls: Control[] = [
  {
    id: 'GV.GV-01',
    function: 'Govern',
    category: 'Organizational Context',
    subcategory: 'GV.OC-01',
    title: 'The organizational mission is understood and informs cybersecurity risk management',
    status: 'implemented',
    priority: 'high',
    assignee: 'Alice Johnson',
    dueDate: '2025-09-15',
    lastUpdated: '2025-08-01'
  },
  {
    id: 'GV.RM-01',
    function: 'Govern',
    category: 'Risk Management Strategy',
    subcategory: 'GV.RM-01',
    title: 'Risk management processes are established, managed, and agreed to by organizational stakeholders',
    status: 'in-progress',
    priority: 'high',
    assignee: 'Bob Smith',
    dueDate: '2025-10-01',
    lastUpdated: '2025-07-28'
  },
  {
    id: 'ID.AM-01',
    function: 'Identify',
    category: 'Asset Management',
    subcategory: 'ID.AM-01',
    title: 'Physical devices and systems within the organization are inventoried',
    status: 'planned',
    priority: 'medium',
    assignee: 'Carol Davis',
    dueDate: '2025-11-15',
    lastUpdated: '2025-07-20'
  },
  {
    id: 'PR.AC-01',
    function: 'Protect',
    category: 'Identity Management, Authentication and Access Control',
    subcategory: 'PR.AC-01',
    title: 'Identities and credentials are issued, managed, verified, revoked, and audited',
    status: 'in-progress',
    priority: 'high',
    assignee: 'David Wilson',
    dueDate: '2025-09-30',
    lastUpdated: '2025-08-05'
  },
  {
    id: 'DE.AE-01',
    function: 'Detect',
    category: 'Anomalies and Events',
    subcategory: 'DE.AE-01',
    title: 'A baseline of network operations and expected data flows is established',
    status: 'not-started',
    priority: 'medium',
    assignee: 'Eva Brown',
    dueDate: '2025-12-01',
    lastUpdated: '2025-07-15'
  }
]

export function ControlsView() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedFunction, setSelectedFunction] = useState<string>('all')
  const [selectedStatus, setSelectedStatus] = useState<string>('all')

  const filteredControls = controls.filter(control => {
    const matchesSearch = control.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         control.id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFunction = selectedFunction === 'all' || control.function === selectedFunction
    const matchesStatus = selectedStatus === 'all' || control.status === selectedStatus
    
    return matchesSearch && matchesFunction && matchesStatus
  })

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'implemented': return <CheckCircle className="w-4 h-4 text-green-400" />
      case 'in-progress': return <Clock className="w-4 h-4 text-blue-400" />
      case 'planned': return <AlertCircle className="w-4 h-4 text-yellow-400" />
      case 'not-started': return <AlertCircle className="w-4 h-4 text-gray-400" />
      default: return null
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'implemented': return 'bg-green-500/20 text-green-300'
      case 'in-progress': return 'bg-blue-500/20 text-blue-300'
      case 'planned': return 'bg-yellow-500/20 text-yellow-300'
      case 'not-started': return 'bg-gray-500/20 text-gray-300'
      default: return 'bg-gray-500/20 text-gray-300'
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-500/20 text-red-300'
      case 'medium': return 'bg-orange-500/20 text-orange-300'
      case 'low': return 'bg-green-500/20 text-green-300'
      default: return 'bg-gray-500/20 text-gray-300'
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold">Controls Management</h2>
          <p className="text-gray-400 text-sm mt-1">NIST CSF 2.0 Control Implementation Tracking</p>
        </div>
        <Button className="flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Add Control
        </Button>
      </div>

      {/* Filters */}
      <Card className="bg-gray-900 border-gray-800">
        <CardContent className="p-4">
          <div className="flex flex-wrap gap-4">
            <div className="relative flex-1 min-w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search controls..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-gray-800 border-gray-700"
              />
            </div>
            <Select value={selectedFunction} onValueChange={setSelectedFunction}>
              <SelectTrigger className="w-48 bg-gray-800 border-gray-700">
                <SelectValue placeholder="All Functions" />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-700">
                <SelectItem value="all">All Functions</SelectItem>
                <SelectItem value="Govern">Govern</SelectItem>
                <SelectItem value="Identify">Identify</SelectItem>
                <SelectItem value="Protect">Protect</SelectItem>
                <SelectItem value="Detect">Detect</SelectItem>
                <SelectItem value="Respond">Respond</SelectItem>
                <SelectItem value="Recover">Recover</SelectItem>
              </SelectContent>
            </Select>
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="w-48 bg-gray-800 border-gray-700">
                <SelectValue placeholder="All Statuses" />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-700">
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="implemented">Implemented</SelectItem>
                <SelectItem value="in-progress">In Progress</SelectItem>
                <SelectItem value="planned">Planned</SelectItem>
                <SelectItem value="not-started">Not Started</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Controls Table */}
      <Card className="bg-gray-900 border-gray-800">
        <Table>
          <TableHeader>
            <TableRow className="border-gray-800">
              <TableHead>Control ID</TableHead>
              <TableHead>Function</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Priority</TableHead>
              <TableHead>Assignee</TableHead>
              <TableHead>Due Date</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredControls.map((control) => (
              <TableRow key={control.id} className="border-gray-800 hover:bg-gray-800/50">
                <TableCell className="font-mono text-sm">{control.id}</TableCell>
                <TableCell>
                  <Badge variant="outline" className="text-xs">
                    {control.function}
                  </Badge>
                </TableCell>
                <TableCell className="max-w-md">
                  <div className="truncate" title={control.title}>
                    {control.title}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    {getStatusIcon(control.status)}
                    <Badge className={getStatusColor(control.status)} variant="outline">
                      {control.status.replace('-', ' ')}
                    </Badge>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge className={getPriorityColor(control.priority)} variant="outline">
                    {control.priority}
                  </Badge>
                </TableCell>
                <TableCell className="text-sm">{control.assignee}</TableCell>
                <TableCell className="text-sm">{control.dueDate}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm">Edit</Button>
                    <Button variant="ghost" size="sm">Evidence</Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      {filteredControls.length === 0 && (
        <div className="text-center py-8 text-gray-400">
          No controls found matching your filters.
        </div>
      )}
    </div>
  )
}