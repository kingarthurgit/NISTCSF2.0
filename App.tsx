import { useState, useEffect, useRef } from 'react'
import { motion } from 'motion/react'
import { Button } from './components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from './components/ui/card'
import { Badge } from './components/ui/badge'
import { Input } from './components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './components/ui/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './components/ui/table'
import { Switch } from './components/ui/switch'
import { Label } from './components/ui/label'
import { Textarea } from './components/ui/textarea'
import { Progress } from './components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs'
import { Checkbox } from './components/ui/checkbox'
import { 
  Clock, FileText, Shield, Key, Database, Search, Filter, Plus, CheckCircle, 
  AlertCircle, Download, BarChart3, Calendar, TrendingUp, Users, Settings, 
  Bell, Trash2, Eye, ChevronRight, Target, Zap, Activity, GraduationCap,
  BookOpen, Brain
} from 'lucide-react'
import { toast } from 'sonner@2.0.3'

type ViewType = 'overview' | 'controls' | 'projects' | 'reports' | 'settings'

interface ComplianceData {
  function: string
  percentage: number
  color: string
  description: string
  controlsCount: number
  implementedCount: number
}

interface Exercise {
  id: string
  title: string
  description: string
  type: 'documentation' | 'implementation' | 'testing' | 'review'
  estimatedHours: number
  completed: boolean
  priority: 'high' | 'medium' | 'low'
}

interface Control {
  id: string
  function: string
  category: string
  subcategory: string
  title: string
  description: string
  status: 'implemented' | 'in-progress' | 'planned' | 'not-started'
  priority: 'high' | 'medium' | 'low'
  assignee: string
  dueDate: string
  lastUpdated: string
  maturity: number
  owner: string
  project: string
  evidence: Evidence[]
  exercises: Exercise[]
}

interface Evidence {
  id: string
  note: string
  url?: string
  dateAdded: string
}

interface Project {
  id: string
  name: string
  description: string
  status: 'on-track' | 'at-risk' | 'delayed'
  progress: number
  startDate: string
  endDate: string
  team: string[]
  controls: number
}

interface RecentEvidenceItem {
  id: string
  timestamp: string
  title: string
  type: 'policy' | 'test' | 'implementation' | 'review'
  function: string
  icon: React.ReactNode
}

interface ParticleProps {
  x: number
  y: number
  size: number
  speed: number
  opacity: number
}

// Animated Educational Background Component - Curro Dark Navy themed
function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const particles: ParticleProps[] = []
    const educationalElements: Array<{
      x: number
      y: number
      type: string
      speed: number
      angle: number
      size: number
      opacity: number
    }> = []

    // Create floating particles with Curro navy blue
    for (let i = 0; i < 50; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 0.5,
        speed: Math.random() * 0.3 + 0.05,
        opacity: Math.random() * 0.5 + 0.1
      })
    }

    // Create educational elements
    const eduTypes = ['📚', '🎓', '📐', '🔬', '💡', '📊', '🧮', '📝', '🖊️', '📖', '⚗️', '🔬', '📏']
    for (let i = 0; i < 20; i++) {
      educationalElements.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        type: eduTypes[Math.floor(Math.random() * eduTypes.length)],
        speed: Math.random() * 0.15 + 0.02,
        angle: Math.random() * Math.PI * 2,
        size: Math.random() * 25 + 18,
        opacity: Math.random() * 0.4 + 0.15
      })
    }

    function animate() {
      if (!ctx || !canvas) return

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw network connections between particles (very subtle)
      particles.forEach((particle, i) => {
        particles.forEach((otherParticle, j) => {
          if (i !== j) {
            const distance = Math.sqrt(
              Math.pow(particle.x - otherParticle.x, 2) + 
              Math.pow(particle.y - otherParticle.y, 2)
            )
            
            if (distance < 120) {
              ctx.beginPath()
              ctx.moveTo(particle.x, particle.y)
              ctx.lineTo(otherParticle.x, otherParticle.y)
              ctx.strokeStyle = `rgba(59, 130, 246, ${0.08 * (1 - distance / 120)})`
              ctx.lineWidth = 0.5
              ctx.stroke()
            }
          }
        })
      })

      // Update and draw particles
      particles.forEach((particle, i) => {
        particle.x += particle.speed
        particle.y += Math.sin(Date.now() * 0.0003 + i) * 0.15

        if (particle.x > canvas.width) particle.x = -10
        if (particle.y > canvas.height) particle.y = 0
        if (particle.y < 0) particle.y = canvas.height

        // Draw particle with Curro blue
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(59, 130, 246, ${particle.opacity})`
        ctx.fill()
        
        // Add subtle glow
        ctx.shadowColor = 'rgba(59, 130, 246, 0.3)'
        ctx.shadowBlur = 4
        ctx.fill()
        ctx.shadowBlur = 0
      })

      // Update and draw educational elements
      educationalElements.forEach((element, i) => {
        element.x += Math.cos(element.angle) * element.speed
        element.y += Math.sin(element.angle) * element.speed
        element.angle += 0.0008

        // Wrap around screen
        if (element.x > canvas.width + 60) element.x = -60
        if (element.x < -60) element.x = canvas.width + 60
        if (element.y > canvas.height + 60) element.y = -60
        if (element.y < -60) element.y = canvas.height + 60

        // Draw educational emoji with gentle rotation
        ctx.save()
        ctx.translate(element.x, element.y)
        ctx.rotate(Math.sin(Date.now() * 0.001 + i) * 0.1)
        ctx.font = `${element.size}px Arial`
        ctx.globalAlpha = element.opacity
        ctx.textAlign = 'center'
        ctx.fillText(element.type, 0, 0)
        ctx.restore()
      })

      // Add floating educational text with Curro theme
      ctx.font = 'bold 18px Inter, sans-serif'
      ctx.fillStyle = 'rgba(59, 130, 246, 0.12)'
      const curroTexts = [
        'CURRO EXCELLENCE', 'KNOWLEDGE', 'SECURITY', 'INNOVATION', 
        'COMPLIANCE', 'EDUCATION', 'GOVERNANCE', 'LEARNING'
      ]
      curroTexts.forEach((text, i) => {
        const x = 120 + (i * 280) + Math.sin(Date.now() * 0.0002 + i) * 35
        const y = 120 + (i % 3) * 250 + Math.cos(Date.now() * 0.0003 + i) * 45
        ctx.fillText(text, x, y)
      })

      // Add mathematical formulas and scientific concepts
      ctx.font = '16px monospace'
      ctx.fillStyle = 'rgba(59, 130, 246, 0.08)'
      const formulas = ['E=mc²', 'π≈3.14159', 'a²+b²=c²', 'log₂(n)', '∫f(x)dx', 'Δy/Δx']
      formulas.forEach((formula, i) => {
        const x = 180 + (i * 350) + Math.sin(Date.now() * 0.0004 + i + 2) * 30
        const y = 350 + Math.cos(Date.now() * 0.0006 + i + 2) * 40
        ctx.fillText(formula, x, y)
      })

      requestAnimationFrame(animate)
    }

    animate()

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ background: 'transparent' }}
    />
  )
}

// Enhanced Circular Progress Gauge Component - Curro navy themed
function CircularProgressGauge({
  percentage,
  size = 120,
  strokeWidth = 8,
  color = '#3B82F6',
  backgroundColor = '#1E293B',
  animated = true
}: {
  percentage: number
  size?: number
  strokeWidth?: number
  color?: string
  backgroundColor?: string
  animated?: boolean
}) {
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (percentage / 100) * circumference

  const getGradientColor = (percentage: number) => {
    if (percentage < 25) return '#EF4444'
    if (percentage < 50) return '#F59E0B'
    if (percentage < 75) return '#3B82F6'
    return '#10B981'
  }

  const strokeColor = color === '#3B82F6' ? getGradientColor(percentage) : color

  return (
    <motion.div 
      className="relative inline-flex items-center justify-center"
      initial={animated ? { scale: 0.8, opacity: 0 } : {}}
      animate={animated ? { scale: 1, opacity: 1 } : {}}
      transition={{ duration: 0.5 }}
    >
      <svg width={size} height={size} className="transform -rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={backgroundColor}
          strokeWidth={strokeWidth}
          fill="transparent"
          className="opacity-30"
        />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={animated ? circumference : offset}
          animate={animated ? { strokeDashoffset: offset } : {}}
          transition={{ duration: 1.5, ease: "easeOut" }}
          strokeLinecap="round"
          style={{
            filter: 'drop-shadow(0 0 12px rgba(59, 130, 246, 0.5))',
          }}
        />
      </svg>
      {size <= 100 && (
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.span 
            className="text-sm font-bold text-white"
            initial={animated ? { opacity: 0 } : {}}
            animate={animated ? { opacity: 1 } : {}}
            transition={{ delay: 1, duration: 0.5 }}
          >
            {percentage}%
          </motion.span>
        </div>
      )}
    </motion.div>
  )
}

// Report Generation Function
function generateReport(type: 'compliance' | 'controls' | 'custom', data: any) {
  const timestamp = new Date().toISOString().split('T')[0]
  const filename = `Curro-NIST-CSF-${type}-report-${timestamp}.json`
  
  const reportData = {
    generatedAt: new Date().toISOString(),
    reportType: type,
    organization: 'Curro Holdings',
    fiscalYear: 'FY2025 Q3',
    summary: data.summary || 'No summary provided',
    data: data,
    metadata: {
      version: '2.0',
      framework: 'NIST CSF 2.0',
      generatedBy: 'Curro Cybersecurity Compliance System'
    }
  }

  const blob = new Blob([JSON.stringify(reportData, null, 2)], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
  
  toast(`Report "${filename}" downloaded successfully!`, {
    description: `Generated ${type} report with current data`,
  })
}

export default function App() {
  const [activeView, setActiveView] = useState<ViewType>('controls')
  const [selectedFunction, setSelectedFunction] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedFunctionFilter, setSelectedFunctionFilter] = useState<string>('all')
  const [selectedStatus, setSelectedStatus] = useState<string>('all')
  
  // Control selection states
  const [selectedControlFunction, setSelectedControlFunction] = useState('Identify (ID)')
  const [selectedCategory, setSelectedCategory] = useState('ID.AM — Asset Management')
  const [selectedControl, setSelectedControl] = useState('ID.AM-01 — Hardware assets inventoried')
  const [selectedControlDetails, setSelectedControlDetails] = useState<Control | null>(null)
  const [activeTab, setActiveTab] = useState('details')

  useEffect(() => {
    // Enable dark mode for Curro navy theme
    document.documentElement.classList.add('dark')
  }, [])

  const complianceData: ComplianceData[] = [
    {
      function: 'Govern',
      percentage: 11,
      color: '#DC2626',
      description: 'Organizational cybersecurity governance and risk management',
      controlsCount: 27,
      implementedCount: 3
    },
    {
      function: 'Identify',
      percentage: 16,
      color: '#D97706',
      description: 'Asset management and risk assessment capabilities',
      controlsCount: 25,
      implementedCount: 4
    },
    {
      function: 'Protect',
      percentage: 11,
      color: '#2563EB',
      description: 'Safeguards to ensure delivery of critical services',
      controlsCount: 36,
      implementedCount: 4
    },
    {
      function: 'Detect',
      percentage: 11,
      color: '#7C3AED',
      description: 'Activities to identify cybersecurity incidents',
      controlsCount: 18,
      implementedCount: 2
    },
    {
      function: 'Respond',
      percentage: 8,
      color: '#059669',
      description: 'Response planning and communications',
      controlsCount: 25,
      implementedCount: 2
    },
    {
      function: 'Recover',
      percentage: 0,
      color: '#0891B2',
      description: 'Plans for resilience and recovery',
      controlsCount: 15,
      implementedCount: 0
    }
  ]

  const exercises: Exercise[] = [
    {
      id: 'ex-1',
      title: 'Create Hardware Inventory Spreadsheet',
      description: 'Document all hardware assets including servers, workstations, mobile devices, and network equipment across all Curro campuses',
      type: 'documentation',
      estimatedHours: 8,
      completed: true,
      priority: 'high'
    },
    {
      id: 'ex-2',
      title: 'Deploy Asset Management Tool',
      description: 'Install and configure automated asset discovery and management software for all school locations',
      type: 'implementation',
      estimatedHours: 16,
      completed: true,
      priority: 'high'
    },
    {
      id: 'ex-3',
      title: 'Asset Tagging and Labeling',
      description: 'Physical tagging of all hardware assets with asset numbers and ownership information',
      type: 'implementation',
      estimatedHours: 12,
      completed: false,
      priority: 'medium'
    },
    {
      id: 'ex-4',
      title: 'Quarterly Asset Review Process',
      description: 'Establish process for quarterly review and validation of asset inventory',
      type: 'documentation',
      estimatedHours: 4,
      completed: false,
      priority: 'medium'
    },
    {
      id: 'ex-5',
      title: 'Asset Disposal Procedure',
      description: 'Document secure disposal process for end-of-life hardware assets',
      type: 'documentation',
      estimatedHours: 6,
      completed: false,
      priority: 'low'
    }
  ]

  const controls: Control[] = [
    {
      id: 'ID.AM-01',
      function: 'Identify',
      category: 'Asset Management',
      subcategory: 'ID.AM-01',
      title: 'Hardware assets inventoried',
      description: 'Physical devices and systems within Curro Holdings are inventoried and maintained in an accurate, complete, and timely manner across all campuses.',
      status: 'implemented',
      priority: 'high',
      assignee: 'IT Department Head',
      dueDate: '2025-09-15',
      lastUpdated: '2025-08-01',
      maturity: 4,
      owner: 'IT Department',
      project: 'Curro Asset Management Initiative',
      evidence: [
        { id: '1', note: 'Asset management system deployed and operational across all campuses', dateAdded: '2025-08-01' },
        { id: '2', note: 'Hardware inventory completed for all Curro locations', url: 'https://assets.curro.co.za/inventory', dateAdded: '2025-07-15' },
        { id: '3', note: 'Quarterly review process established for all schools', dateAdded: '2025-07-30' }
      ],
      exercises: exercises
    },
    {
      id: 'ID.AM-02',
      function: 'Identify',
      category: 'Asset Management',
      subcategory: 'ID.AM-02',
      title: 'Software platforms inventoried',
      description: 'Educational software platforms and applications within Curro Holdings are inventoried and maintained.',
      status: 'in-progress',
      priority: 'high',
      assignee: 'Software Asset Manager',
      dueDate: '2025-10-01',
      lastUpdated: '2025-07-28',
      maturity: 2,
      owner: 'IT Department',
      project: 'Curro Asset Management Initiative',
      evidence: [],
      exercises: [
        {
          id: 'ex-sw-1',
          title: 'Educational Software License Audit',
          description: 'Complete audit of all educational software licenses and installations across all campuses',
          type: 'review',
          estimatedHours: 20,
          completed: false,
          priority: 'high'
        },
        {
          id: 'ex-sw-2',
          title: 'Software Asset Management Tool',
          description: 'Deploy automated software discovery and license management tool for educational platforms',
          type: 'implementation',
          estimatedHours: 24,
          completed: false,
          priority: 'high'
        }
      ]
    },
    {
      id: 'GV.OC-01',
      function: 'Govern',
      category: 'Organizational Context',
      subcategory: 'GV.OC-01',
      title: 'Organizational mission understood',
      description: 'Curro Holdings educational mission is understood and informs cybersecurity risk management',
      status: 'implemented',
      priority: 'high',
      assignee: 'Chief Information Officer',
      dueDate: '2025-09-15',
      lastUpdated: '2025-08-01',
      maturity: 4,
      owner: 'Executive Team',
      project: 'Curro Governance Framework',
      evidence: [],
      exercises: [
        {
          id: 'ex-gov-1',
          title: 'Educational Mission Statement Review',
          description: 'Review and document how cybersecurity supports Curro\'s educational mission',
          type: 'documentation',
          estimatedHours: 8,
          completed: true,
          priority: 'high'
        }
      ]
    }
  ]

  const projects: Project[] = [
    {
      id: '1',
      name: 'Curro Campus Security Initiative',
      description: 'Comprehensive cybersecurity implementation across all Curro campuses and administrative centers',
      status: 'on-track',
      progress: 75,
      startDate: '2025-06-01',
      endDate: '2025-10-15',
      team: ['IT Director', 'Campus Security Lead', 'Compliance Manager'],
      controls: 15
    },
    {
      id: '2',
      name: 'Educational Data Protection Framework',
      description: 'Development and implementation of student data protection and privacy controls',
      status: 'at-risk',
      progress: 45,
      startDate: '2025-07-01',
      endDate: '2025-09-30',
      team: ['Data Protection Officer', 'Legal Advisor'],
      controls: 12
    }
  ]

  const recentEvidence: RecentEvidenceItem[] = [
    {
      id: '1',
      timestamp: '8/9/2025, 8:36:05 PM',
      title: 'Updated: Student data protection policy deployed across all campuses',
      type: 'policy',
      function: 'Protect',
      icon: <Shield className="w-4 h-4" />
    },
    {
      id: '2',
      timestamp: '8/9/2025, 7:01:02 PM',
      title: 'Hardware inventory validation completed for Northern campuses',
      type: 'test',
      function: 'Identify',
      icon: <Database className="w-4 h-4" />
    },
    {
      id: '3',
      timestamp: '8/9/2025, 6:15:30 PM',
      title: 'Educational software licensing audit initiated',
      type: 'implementation',
      function: 'Identify',
      icon: <GraduationCap className="w-4 h-4" />
    }
  ]

  // Set initial selected control details
  useEffect(() => {
    if (selectedControl === 'ID.AM-01 — Hardware assets inventoried') {
      setSelectedControlDetails(controls.find(c => c.id === 'ID.AM-01') || null)
    } else if (selectedControl === 'ID.AM-02 — Software platforms inventoried') {
      setSelectedControlDetails(controls.find(c => c.id === 'ID.AM-02') || null)
    }
  }, [selectedControl])

  const overallCompliance = Math.round(
    complianceData.reduce((sum, item) => sum + item.percentage, 0) / complianceData.length
  )

  const totalControls = complianceData.reduce((sum, item) => sum + item.controlsCount, 0)
  const totalImplemented = complianceData.reduce((sum, item) => sum + item.implementedCount, 0)

  const filteredControls = controls.filter(control => {
    const matchesSearch = control.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         control.id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFunction = selectedFunctionFilter === 'all' || control.function === selectedFunctionFilter
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
      case 'implemented': return 'bg-green-500/20 text-green-300 border-green-500/30'
      case 'in-progress': return 'bg-blue-500/20 text-blue-300 border-blue-500/30'
      case 'planned': return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30'
      case 'not-started': return 'bg-gray-500/20 text-gray-300 border-gray-500/30'
      default: return 'bg-gray-500/20 text-gray-300'
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-500/20 text-red-300 border-red-500/30'
      case 'medium': return 'bg-orange-500/20 text-orange-300 border-orange-500/30'
      case 'low': return 'bg-green-500/20 text-green-300 border-green-500/30'
      default: return 'bg-gray-500/20 text-gray-300'
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'policy': return 'bg-blue-500/20 text-blue-300'
      case 'test': return 'bg-purple-500/20 text-purple-300'
      case 'implementation': return 'bg-green-500/20 text-green-300'
      case 'review': return 'bg-orange-500/20 text-orange-300'
      default: return 'bg-gray-500/20 text-gray-300'
    }
  }

  const getExerciseTypeIcon = (type: string) => {
    switch (type) {
      case 'documentation': return <FileText className="w-4 h-4" />
      case 'implementation': return <Zap className="w-4 h-4" />
      case 'testing': return <Activity className="w-4 h-4" />
      case 'review': return <Eye className="w-4 h-4" />
      default: return <Target className="w-4 h-4" />
    }
  }

  const handleExerciseToggle = (exerciseId: string) => {
    if (!selectedControlDetails) return
    
    const updatedExercises = selectedControlDetails.exercises.map(ex => 
      ex.id === exerciseId ? { ...ex, completed: !ex.completed } : ex
    )
    
    setSelectedControlDetails({
      ...selectedControlDetails,
      exercises: updatedExercises
    })
    
    const exercise = updatedExercises.find(ex => ex.id === exerciseId)
    toast(`Exercise "${exercise?.title}" ${exercise?.completed ? 'completed' : 'marked incomplete'}!`)
  }

  const handleDownloadReport = (type: 'compliance' | 'controls' | 'custom') => {
    const reportData = {
      summary: {
        overallCompliance,
        totalControls,
        totalImplemented,
        complianceByFunction: complianceData
      },
      controls: filteredControls,
      projects: projects,
      recentActivity: recentEvidence.slice(0, 10)
    }
    
    generateReport(type, reportData)
  }

  const renderOverview = () => (
    <motion.div 
      className="space-y-6 relative z-10"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="flex items-center justify-between">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            Compliance Overview
          </h2>
          <p className="text-blue-200 text-sm mt-1">Curro Holdings • FY2025 Q3</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Button 
            onClick={() => handleDownloadReport('compliance')}
            className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-600/25"
          >
            <Download className="w-4 h-4 mr-2" />
            Download Report
          </Button>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div 
          className="lg:col-span-2"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6 }}
        >
          <Card className="bg-slate-800/90 backdrop-blur-sm border-blue-500/30 shadow-xl shadow-blue-900/20 h-96 flex items-center justify-center">
            <div className="text-center">
              <CircularProgressGauge 
                percentage={overallCompliance} 
                size={200}
                strokeWidth={12}
                color="#3B82F6"
              />
              <motion.div 
                className="mt-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
              >
                <div className="text-5xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                  {overallCompliance}%
                </div>
                <div className="text-blue-200 text-lg mt-2">Overall Compliance</div>
                <div className="text-sm text-blue-300 mt-2">
                  {totalImplemented} of {totalControls} controls implemented
                </div>
              </motion.div>
            </div>
          </Card>
        </motion.div>

        <motion.div 
          className="space-y-4"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.8 }}
        >
          <Card className="bg-slate-800/90 backdrop-blur-sm border-blue-500/30 shadow-xl shadow-blue-900/20 h-96">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2 text-white">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  >
                    <Activity className="w-5 h-5 text-blue-400" />
                  </motion.div>
                  Recent Activity
                </CardTitle>
                <span className="text-xs text-blue-300">real-time</span>
              </div>
            </CardHeader>
            <CardContent className="space-y-3 max-h-64 overflow-y-auto">
              {recentEvidence.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start gap-3 p-3 rounded-lg bg-slate-700/60 hover:bg-slate-700/80 transition-all cursor-pointer border border-transparent hover:border-blue-500/40"
                >
                  <div className={`p-2 rounded-full ${getTypeColor(item.type)}`}>
                    {item.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-sm text-blue-100 leading-tight">
                        {item.title}
                      </p>
                      <Badge variant="outline" className="text-xs whitespace-nowrap border-blue-400/30 text-blue-300">
                        {item.function}
                      </Badge>
                    </div>
                    <p className="text-xs text-blue-400 mt-1">{item.timestamp}</p>
                  </div>
                </motion.div>
              ))}
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {complianceData.map((item, index) => (
          <motion.div
            key={item.function}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 + index * 0.1 }}
          >
            <Card 
              className="bg-slate-800/90 backdrop-blur-sm border-blue-500/30 shadow-lg hover:shadow-xl hover:shadow-blue-500/20 cursor-pointer transition-all duration-300 hover:border-blue-400/50 group"
              onClick={() => setSelectedFunction(item.function)}
            >
              <CardContent className="p-4">
                <div className="flex flex-col items-center text-center">
                  <div className="group-hover:scale-110 transition-transform duration-300">
                    <CircularProgressGauge 
                      percentage={item.percentage} 
                      size={80}
                      strokeWidth={6}
                      color={item.color}
                    />
                  </div>
                  <div className="mt-3">
                    <div className="font-bold text-xl text-white">{item.percentage}%</div>
                    <div className="text-sm text-blue-200 font-medium">{item.function}</div>
                    <div className="text-xs text-blue-400 mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      click to explore
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {selectedFunction && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6"
        >
          <Card className="bg-slate-800/90 backdrop-blur-sm border-blue-500/30 shadow-xl shadow-blue-900/20">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-3 text-white">
                  <GraduationCap className="w-6 h-6 text-blue-400" />
                  {selectedFunction} Function Details
                  <Badge variant="outline" className="text-xs bg-blue-900/50 text-blue-300 border-blue-500/30">
                    {complianceData.find(f => f.function === selectedFunction)?.percentage}% Complete
                  </Badge>
                </CardTitle>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => setSelectedFunction(null)}
                  className="text-blue-200 hover:text-white hover:bg-red-500/20"
                >
                  ✕
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-blue-100 leading-relaxed">
                  {complianceData.find(f => f.function === selectedFunction)?.description}
                </p>
                <div className="grid grid-cols-2 gap-6 text-sm">
                  <div className="p-4 bg-slate-700/50 rounded-lg border border-blue-500/20">
                    <span className="text-blue-200">Total Controls:</span>
                    <div className="text-2xl font-bold text-white mt-1">
                      {complianceData.find(f => f.function === selectedFunction)?.controlsCount}
                    </div>
                  </div>
                  <div className="p-4 bg-green-900/30 rounded-lg border border-green-500/20">
                    <span className="text-blue-200">Implemented:</span>
                    <div className="text-2xl font-bold text-green-400 mt-1">
                      {complianceData.find(f => f.function === selectedFunction)?.implementedCount}
                    </div>
                  </div>
                </div>
                <div className="pt-4 flex gap-3">
                  <Button 
                    className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-600/25"
                    onClick={() => setActiveView('controls')}
                  >
                    <ChevronRight className="w-4 h-4 mr-2" />
                    View Controls
                  </Button>
                  <Button variant="outline" className="border-blue-500/30 text-blue-300 hover:bg-blue-500/10">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Evidence
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </motion.div>
  )

  const renderControls = () => (
    <motion.div 
      className="space-y-6 relative z-10"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Control Selection Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Card className="bg-slate-800/90 backdrop-blur-sm border-blue-500/30 shadow-xl shadow-blue-900/20">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2 text-white">
                <Target className="w-5 h-5 text-blue-400" />
                Select Control
              </CardTitle>
              <div className="text-sm text-blue-200">Choose Function → Category → Control</div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label className="text-blue-200 mb-2 block">Function</Label>
                <Select value={selectedControlFunction} onValueChange={setSelectedControlFunction}>
                  <SelectTrigger className="bg-slate-700/80 border-blue-500/30 text-white focus:border-blue-400">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-blue-500/30">
                    <SelectItem value="Govern (GV)">Govern (GV)</SelectItem>
                    <SelectItem value="Identify (ID)">Identify (ID)</SelectItem>
                    <SelectItem value="Protect (PR)">Protect (PR)</SelectItem>
                    <SelectItem value="Detect (DE)">Detect (DE)</SelectItem>
                    <SelectItem value="Respond (RS)">Respond (RS)</SelectItem>
                    <SelectItem value="Recover (RC)">Recover (RC)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-blue-200 mb-2 block">Category</Label>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="bg-slate-700/80 border-blue-500/30 text-white focus:border-blue-400">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-blue-500/30">
                    <SelectItem value="ID.AM — Asset Management">ID.AM — Asset Management</SelectItem>
                    <SelectItem value="ID.RA — Risk Assessment">ID.RA — Risk Assessment</SelectItem>
                    <SelectItem value="ID.IM — Improvement">ID.IM — Improvement</SelectItem>
                    <SelectItem value="GV.OC — Organizational Context">GV.OC — Organizational Context</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-blue-200 mb-2 block">Control</Label>
                <Select value={selectedControl} onValueChange={setSelectedControl}>
                  <SelectTrigger className="bg-slate-700/80 border-blue-500/30 text-white focus:border-blue-400">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-blue-500/30">
                    <SelectItem value="ID.AM-01 — Hardware assets inventoried">ID.AM-01 — Hardware assets inventoried</SelectItem>
                    <SelectItem value="ID.AM-02 — Software platforms inventoried">ID.AM-02 — Software platforms inventoried</SelectItem>
                    <SelectItem value="GV.OC-01 — Organizational mission understood">GV.OC-01 — Organizational mission understood</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Control Details Section */}
      {selectedControlDetails && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="bg-slate-800/90 backdrop-blur-sm border-blue-500/30 shadow-xl shadow-blue-900/20">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-3 text-white">
                    <Shield className="w-6 h-6 text-blue-400" />
                    {selectedControlDetails.id} — {selectedControlDetails.title}
                    <Badge className={getStatusColor(selectedControlDetails.status)}>
                      {selectedControlDetails.status.charAt(0).toUpperCase() + selectedControlDetails.status.slice(1)}
                    </Badge>
                  </CardTitle>
                  <p className="text-blue-200 mt-2 text-sm leading-relaxed">
                    {selectedControlDetails.description}
                  </p>
                </div>
                <Button variant="outline" size="sm" className="border-blue-500/30 text-blue-300 hover:bg-blue-500/10">
                  <Eye className="w-4 h-4 mr-2" />
                  Open full page
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-3 bg-slate-700/50">
                  <TabsTrigger value="details">Details</TabsTrigger>
                  <TabsTrigger value="exercises">Learning Exercises</TabsTrigger>
                  <TabsTrigger value="evidence">Evidence</TabsTrigger>
                </TabsList>
                
                <TabsContent value="details" className="space-y-6 mt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="space-y-2">
                      <Label className="text-blue-200">Status</Label>
                      <Select defaultValue={selectedControlDetails.status}>
                        <SelectTrigger className="bg-slate-700/80 border-blue-500/30 text-white">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-slate-800 border-blue-500/30">
                          <SelectItem value="not-started">Not Started</SelectItem>
                          <SelectItem value="planned">Planned</SelectItem>
                          <SelectItem value="in-progress">In Progress</SelectItem>
                          <SelectItem value="implemented">Implemented</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-blue-200">Maturity (0-5)</Label>
                      <div className="pt-2">
                        <Progress value={selectedControlDetails.maturity * 20} className="h-3" />
                        <div className="flex justify-between text-xs text-blue-300 mt-1">
                          <span>Level {selectedControlDetails.maturity}</span>
                          <span>{selectedControlDetails.maturity * 20}%</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-blue-200">Owner</Label>
                      <Input 
                        defaultValue={selectedControlDetails.owner}
                        className="bg-slate-700/80 border-blue-500/30 text-white focus:border-blue-400"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label className="text-blue-200">Due Date</Label>
                      <Input 
                        type="date"
                        defaultValue="2025-09-15"
                        className="bg-slate-700/80 border-blue-500/30 text-white focus:border-blue-400"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label className="text-blue-200">Project</Label>
                      <Input 
                        defaultValue={selectedControlDetails.project}
                        className="bg-slate-700/80 border-blue-500/30 text-white focus:border-blue-400"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label className="text-blue-200">Implementation Templates</Label>
                      <div className="flex gap-2">
                        <Select defaultValue="select-template">
                          <SelectTrigger className="bg-slate-700/80 border-blue-500/30 text-white">
                            <SelectValue placeholder="Select template..." />
                          </SelectTrigger>
                          <SelectContent className="bg-slate-800 border-blue-500/30">
                            <SelectItem value="select-template">Select template...</SelectItem>
                            <SelectItem value="educational-asset-inventory">Educational Asset Inventory Template</SelectItem>
                            <SelectItem value="campus-security-policy">Campus Security Policy Template</SelectItem>
                            <SelectItem value="student-data-procedure">Student Data Procedure Template</SelectItem>
                          </SelectContent>
                        </Select>
                        <Button className="bg-green-600 hover:bg-green-700 text-white">
                          Apply
                        </Button>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="exercises" className="space-y-4 mt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold text-lg text-white flex items-center gap-2">
                        <BookOpen className="w-5 h-5 text-blue-400" />
                        Implementation Learning Exercises
                      </h4>
                      <p className="text-blue-200 text-sm">
                        Complete these educational exercises to achieve full compliance understanding
                      </p>
                    </div>
                    <div className="text-sm text-blue-200">
                      {selectedControlDetails.exercises.filter(ex => ex.completed).length} of {selectedControlDetails.exercises.length} completed
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    {selectedControlDetails.exercises.map((exercise, index) => (
                      <motion.div
                        key={exercise.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className={`p-4 rounded-lg border transition-all ${
                          exercise.completed 
                            ? 'bg-green-900/30 border-green-500/30' 
                            : 'bg-slate-700/50 border-blue-500/20 hover:border-blue-400/40'
                        }`}
                      >
                        <div className="flex items-start gap-4">
                          <div className="mt-1">
                            <Checkbox
                              checked={exercise.completed}
                              onCheckedChange={() => handleExerciseToggle(exercise.id)}
                              className="data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500"
                            />
                          </div>
                          
                          <div className="flex-1">
                            <div className="flex items-start justify-between gap-4">
                              <div>
                                <h5 className={`font-medium ${exercise.completed ? 'line-through text-blue-400' : 'text-white'}`}>
                                  {exercise.title}
                                </h5>
                                <p className="text-blue-200 text-sm mt-1 leading-relaxed">
                                  {exercise.description}
                                </p>
                              </div>
                              
                              <div className="flex items-center gap-2 shrink-0">
                                <div className={`p-2 rounded-full ${getTypeColor(exercise.type)}`}>
                                  {getExerciseTypeIcon(exercise.type)}
                                </div>
                                <Badge className={getPriorityColor(exercise.priority)}>
                                  {exercise.priority}
                                </Badge>
                              </div>
                            </div>
                            
                            <div className="flex items-center gap-4 mt-3 text-xs text-blue-300">
                              <span className="flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                {exercise.estimatedHours}h estimated
                              </span>
                              <span className="capitalize">{exercise.type}</span>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  <div className="pt-4 border-t border-blue-500/20">
                    <div className="flex justify-between items-center">
                      <div className="text-sm text-blue-200 flex items-center gap-2">
                        <Brain className="w-4 h-4" />
                        Total learning time: {selectedControlDetails.exercises.reduce((sum, ex) => sum + ex.estimatedHours, 0)} hours
                      </div>
                      <Button variant="outline" className="border-blue-500/30 text-blue-300 hover:bg-blue-500/10">
                        <Plus className="w-4 h-4 mr-2" />
                        Add Learning Exercise
                      </Button>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="evidence" className="space-y-4 mt-6">
                  <div className="flex items-center justify-between">
                    <Label className="text-white text-lg font-semibold">Evidence Documentation</Label>
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="text-blue-300 border-blue-500/30 hover:bg-blue-500/10"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Add Evidence
                    </Button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input 
                      placeholder="Evidence description..."
                      className="bg-slate-700/80 border-blue-500/30 text-white focus:border-blue-400"
                    />
                    <Input 
                      placeholder="URL or reference (optional)"
                      className="bg-slate-700/80 border-blue-500/30 text-white focus:border-blue-400"
                    />
                  </div>

                  {selectedControlDetails.evidence.length > 0 && (
                    <div className="space-y-3">
                      <h5 className="font-medium text-blue-200">Existing Evidence</h5>
                      {selectedControlDetails.evidence.map((evidence, index) => (
                        <motion.div 
                          key={evidence.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="flex items-center justify-between p-4 bg-slate-700/50 rounded-lg border border-blue-500/20 hover:border-blue-400/40 transition-all"
                        >
                          <div className="flex-1">
                            <p className="text-sm text-white font-medium">{evidence.note}</p>
                            {evidence.url && (
                              <a 
                                href={evidence.url} 
                                className="text-xs text-blue-400 hover:text-blue-300 underline"
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                {evidence.url}
                              </a>
                            )}
                            <p className="text-xs text-blue-300 mt-2">Added: {evidence.dateAdded}</p>
                          </div>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </TabsContent>
              </Tabs>

              <div className="flex justify-between items-center pt-6 border-t border-blue-500/20">
                <div className="text-sm text-blue-200 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4" />
                  Compliance Score: <span className="text-blue-400 font-semibold">
                    {Math.round((selectedControlDetails.exercises.filter(ex => ex.completed).length / selectedControlDetails.exercises.length) * 100)}%
                  </span>
                </div>
                <div className="flex gap-3">
                  <Button variant="outline" className="border-blue-500/30 text-blue-300 hover:bg-blue-500/10">
                    Cancel
                  </Button>
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-600/25">
                    Save Changes
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <Card className="bg-slate-800/90 backdrop-blur-sm border-blue-500/30 shadow-xl shadow-blue-900/20">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-white">Quick Actions</CardTitle>
              <Button 
                onClick={() => handleDownloadReport('controls')}
                className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-600/25"
              >
                <Download className="w-4 h-4 mr-2" />
                Export Controls
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Button variant="outline" className="h-20 flex-col border-blue-500/30 text-blue-300 hover:bg-blue-500/10">
                <Plus className="w-6 h-6 mb-2" />
                Add Control
              </Button>
              <Button variant="outline" className="h-20 flex-col border-green-500/30 text-green-300 hover:bg-green-500/10">
                <CheckCircle className="w-6 h-6 mb-2" />
                Bulk Update
              </Button>
              <Button variant="outline" className="h-20 flex-col border-purple-500/30 text-purple-300 hover:bg-purple-500/10">
                <FileText className="w-6 h-6 mb-2" />
                Import Template
              </Button>
              <Button variant="outline" className="h-20 flex-col border-orange-500/30 text-orange-300 hover:bg-orange-500/10">
                <BarChart3 className="w-6 h-6 mb-2" />
                Analytics
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  )

  const renderProjects = () => (
    <motion.div 
      className="space-y-6 relative z-10"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            Curro Campus Projects
          </h2>
          <p className="text-blue-200 text-sm mt-1">Track cybersecurity implementation across all campuses</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="border-blue-500/30 text-blue-300 hover:bg-blue-500/10">
            <BarChart3 className="w-4 h-4 mr-2" />
            Gantt Chart
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-600/25">
            <Calendar className="w-4 h-4 mr-2" />
            New Project
          </Button>
        </div>
      </div>

      <div className="grid gap-6">
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2 }}
          >
            <Card className="bg-slate-800/90 backdrop-blur-sm border-blue-500/30 shadow-xl shadow-blue-900/20 hover:shadow-xl transition-all">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-xl flex items-center gap-2 text-white">
                      <GraduationCap className="w-5 h-5 text-blue-400" />
                      {project.name}
                    </CardTitle>
                    <p className="text-blue-200 text-sm mt-2 leading-relaxed">{project.description}</p>
                  </div>
                  <Badge className={getStatusColor(project.status)}>
                    {project.status.replace('-', ' ')}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-blue-200">Progress</span>
                    <span className="font-semibold text-blue-400">{project.progress}%</span>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-3 overflow-hidden">
                    <motion.div 
                      className="bg-gradient-to-r from-blue-500 to-blue-600 h-3 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${project.progress}%` }}
                      transition={{ duration: 1.5, ease: "easeOut" }}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div className="flex items-center gap-2 p-3 bg-slate-700/50 rounded-lg border border-blue-500/20">
                    <Calendar className="w-4 h-4 text-blue-400" />
                    <div>
                      <div className="text-blue-200">Start</div>
                      <div className="font-semibold text-white">{project.startDate}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 p-3 bg-slate-700/50 rounded-lg border border-orange-500/20">
                    <Clock className="w-4 h-4 text-orange-400" />
                    <div>
                      <div className="text-blue-200">Due</div>
                      <div className="font-semibold text-white">{project.endDate}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 p-3 bg-slate-700/50 rounded-lg border border-green-500/20">
                    <Users className="w-4 h-4 text-green-400" />
                    <div>
                      <div className="text-blue-200">Team</div>
                      <div className="font-semibold text-white">{project.team.length} members</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 p-3 bg-slate-700/50 rounded-lg border border-purple-500/20">
                    <Shield className="w-4 h-4 text-purple-400" />
                    <div>
                      <div className="text-blue-200">Controls</div>
                      <div className="font-semibold text-white">{project.controls} total</div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-blue-200 text-sm">Team:</span>
                  <div className="flex flex-wrap gap-2">
                    {project.team.map((member, memberIndex) => (
                      <motion.div
                        key={memberIndex}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.8 + memberIndex * 0.1 }}
                      >
                        <Badge variant="secondary" className="bg-slate-700 text-blue-200 text-xs border border-blue-500/20">
                          {member}
                        </Badge>
                      </motion.div>
                    ))}
                  </div>
                </div>

                <div className="flex gap-3 pt-2">
                  <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-600/25">
                    <Eye className="w-4 h-4 mr-2" />
                    View Details
                  </Button>
                  <Button variant="outline" size="sm" className="border-blue-500/30 text-blue-300 hover:bg-blue-500/10">
                    Edit
                  </Button>
                  <Button variant="outline" size="sm" className="border-blue-500/30 text-blue-300 hover:bg-blue-500/10">
                    Timeline
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )

  const renderReports = () => (
    <motion.div 
      className="space-y-6 relative z-10"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            Reports & Analytics
          </h2>
          <p className="text-blue-200 text-sm mt-1">Generate and schedule Curro compliance reports</p>
        </div>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            className="border-blue-500/30 text-blue-300 hover:bg-blue-500/10"
            onClick={() => handleDownloadReport('custom')}
          >
            <Calendar className="w-4 h-4 mr-2" />
            Schedule Report
          </Button>
          <Button 
            className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-600/25"
            onClick={() => handleDownloadReport('compliance')}
          >
            <Download className="w-4 h-4 mr-2" />
            Download Report
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Overall Compliance', value: `${overallCompliance}%`, trend: '+2%', color: 'text-blue-400' },
          { label: 'Controls Implemented', value: `${totalImplemented}/${totalControls}`, trend: '+3', color: 'text-green-400' },
          { label: 'Campus Coverage', value: '45/47', trend: '+2', color: 'text-purple-400' },
          { label: 'Days to Next Review', value: '127', trend: '-7', color: 'text-orange-400' }
        ].map((metric, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="bg-slate-800/90 backdrop-blur-sm border-blue-500/30 shadow-xl shadow-blue-900/20 hover:shadow-xl transition-all">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-blue-200 text-sm">{metric.label}</p>
                    <p className="text-3xl font-bold mt-2 text-white">
                      {metric.value}
                    </p>
                  </div>
                  <div className={`flex items-center gap-1 ${metric.color}`}>
                    <TrendingUp className="w-5 h-5" />
                    <span className="text-sm font-semibold">{metric.trend}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <Card className="bg-slate-800/90 backdrop-blur-sm border-blue-500/30 shadow-xl shadow-blue-900/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <FileText className="w-5 h-5 text-blue-400" />
            Quick Report Generation
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <Button 
                variant="outline" 
                className="h-24 flex-col w-full border-blue-500/30 text-blue-300 hover:bg-blue-500/10"
                onClick={() => handleDownloadReport('compliance')}
              >
                <Download className="w-8 h-8 mb-2 text-blue-400" />
                <span>Compliance Summary</span>
              </Button>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <Button 
                variant="outline" 
                className="h-24 flex-col w-full border-green-500/30 text-green-300 hover:bg-green-500/10"
                onClick={() => handleDownloadReport('controls')}
              >
                <BarChart3 className="w-8 h-8 mb-2 text-green-400" />
                <span>Controls Report</span>
              </Button>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <Button 
                variant="outline" 
                className="h-24 flex-col w-full border-purple-500/30 text-purple-300 hover:bg-purple-500/10"
                onClick={() => handleDownloadReport('custom')}
              >
                <GraduationCap className="w-8 h-8 mb-2 text-purple-400" />
                <span>Campus Report</span>
              </Button>
            </motion.div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )

  const renderSettings = () => (
    <motion.div 
      className="space-y-6 relative z-10"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            System Settings
          </h2>
          <p className="text-blue-200 text-sm mt-1">Configure your Curro NIST CSF compliance environment</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-600/25">
          <Settings className="w-4 h-4 mr-2" />
          Save Changes
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="bg-slate-800/90 backdrop-blur-sm border-blue-500/30 shadow-xl shadow-blue-900/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <GraduationCap className="w-5 h-5 text-blue-400" />
                Organization
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="org-name" className="text-blue-200">Organization Name</Label>
                <Input 
                  id="org-name" 
                  defaultValue="Curro Holdings" 
                  className="bg-slate-700/80 border-blue-500/30 text-white focus:border-blue-400"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="fiscal-year" className="text-blue-200">Fiscal Year</Label>
                <Select defaultValue="fy2025">
                  <SelectTrigger className="bg-slate-700/80 border-blue-500/30 text-white focus:border-blue-400">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-blue-500/30">
                    <SelectItem value="fy2024">FY 2024</SelectItem>
                    <SelectItem value="fy2025">FY 2025</SelectItem>
                    <SelectItem value="fy2026">FY 2026</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description" className="text-blue-200">Organization Description</Label>
                <Textarea 
                  id="description"
                  placeholder="Curro Holdings - Leading independent school group in South Africa..."
                  className="bg-slate-700/80 border-blue-500/30 text-white focus:border-blue-400"
                />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="bg-slate-800/90 backdrop-blur-sm border-blue-500/30 shadow-xl shadow-blue-900/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <Bell className="w-5 h-5 text-blue-400" />
                Notifications
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="email-notifications" className="text-blue-200">Email Notifications</Label>
                  <p className="text-sm text-blue-300">Receive email updates on compliance changes</p>
                </div>
                <Switch id="email-notifications" defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="due-date-alerts" className="text-blue-200">Due Date Alerts</Label>
                  <p className="text-sm text-blue-300">Get notified when controls are due</p>
                </div>
                <Switch id="due-date-alerts" defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="progress-reports" className="text-blue-200">Weekly Progress Reports</Label>
                  <p className="text-sm text-blue-300">Receive weekly compliance summaries</p>
                </div>
                <Switch id="progress-reports" />
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  )

  const renderView = () => {
    switch (activeView) {
      case 'overview':
        return renderOverview()
      case 'controls':
        return renderControls()
      case 'projects':
        return renderProjects()
      case 'reports':
        return renderReports()
      case 'settings':
        return renderSettings()
      default:
        return renderOverview()
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 text-white relative overflow-hidden">
      <AnimatedBackground />
      
      {/* Header */}
      <motion.header 
        className="border-b border-blue-500/30 bg-slate-900/95 backdrop-blur-md relative z-20 shadow-xl shadow-blue-900/20"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex items-center justify-between px-6 py-4">
          <motion.div 
            className="flex items-center gap-4"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex items-center gap-3">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                <Shield className="w-8 h-8 text-blue-400" />
              </motion.div>
              <div>
                <h1 className="text-xl font-bold text-white">
                  Curro NIST CSF 2.0 — Interactive Compliance
                </h1>
                <p className="text-xs text-blue-300">Educational Excellence Through Security</p>
              </div>
            </div>
            <span className="text-sm text-blue-200 ml-4">Curro Holdings • FY2025 Q3</span>
          </motion.div>
          
          <motion.nav 
            className="flex items-center gap-2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            {[
              { key: 'overview', label: 'Overview' },
              { key: 'controls', label: 'Controls' },
              { key: 'projects', label: 'Campus Projects' },
              { key: 'reports', label: 'Reports' },
              { key: 'settings', label: 'Settings' }
            ].map((item, index) => (
              <motion.div
                key={item.key}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + index * 0.1 }}
              >
                <Button 
                  variant={activeView === item.key ? 'default' : 'ghost'}
                  onClick={() => setActiveView(item.key as ViewType)}
                  className={`text-white relative overflow-hidden transition-all ${
                    activeView === item.key 
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/25' 
                      : 'hover:bg-blue-800/50 hover:text-blue-200'
                  }`}
                >
                  {item.label}
                  {activeView === item.key && (
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-400"
                      initial={{ width: 0 }}
                      animate={{ width: '100%' }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </Button>
              </motion.div>
            ))}
          </motion.nav>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="p-6 relative z-10">
        {renderView()}
      </main>
    </div>
  )
}