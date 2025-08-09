import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { Calendar, Users, Clock, BarChart3 } from 'lucide-react'

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

const projects: Project[] = [
  {
    id: '1',
    name: 'Identity & Access Management Implementation',
    description: 'Implementing comprehensive IAM controls across all systems',
    status: 'on-track',
    progress: 65,
    startDate: '2025-06-01',
    endDate: '2025-10-15',
    team: ['David Wilson', 'Sarah Chen', 'Mike Rodriguez'],
    controls: 12
  },
  {
    id: '2',
    name: 'Incident Response Plan Development',
    description: 'Creating and testing incident response procedures',
    status: 'at-risk',
    progress: 35,
    startDate: '2025-07-01',
    endDate: '2025-09-30',
    team: ['Alice Johnson', 'Bob Smith'],
    controls: 8
  },
  {
    id: '3',
    name: 'Asset Inventory & Classification',
    description: 'Complete inventory and classification of organizational assets',
    status: 'delayed',
    progress: 20,
    startDate: '2025-05-15',
    endDate: '2025-11-30',
    team: ['Carol Davis', 'Eva Brown', 'Tom Wilson'],
    controls: 15
  }
]

export function ProjectsView() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'on-track': return 'bg-green-500/20 text-green-300'
      case 'at-risk': return 'bg-yellow-500/20 text-yellow-300'
      case 'delayed': return 'bg-red-500/20 text-red-300'
      default: return 'bg-gray-500/20 text-gray-300'
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold">Projects (Gantt View)</h2>
          <p className="text-gray-400 text-sm mt-1">Track compliance implementation projects</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <BarChart3 className="w-4 h-4 mr-2" />
            Gantt Chart
          </Button>
          <Button>
            <Calendar className="w-4 h-4 mr-2" />
            New Project
          </Button>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid gap-6">
        {projects.map((project) => (
          <Card key={project.id} className="bg-gray-900 border-gray-800">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg">{project.name}</CardTitle>
                  <p className="text-gray-400 text-sm mt-2">{project.description}</p>
                </div>
                <Badge className={getStatusColor(project.status)} variant="outline">
                  {project.status.replace('-', ' ')}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Progress Bar */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Progress</span>
                  <span className="font-semibold">{project.progress}%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div 
                    className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${project.progress}%` }}
                  />
                </div>
              </div>

              {/* Project Details */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  <div>
                    <div className="text-gray-400">Start</div>
                    <div className="font-semibold">{project.startDate}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-gray-400" />
                  <div>
                    <div className="text-gray-400">Due</div>
                    <div className="font-semibold">{project.endDate}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-gray-400" />
                  <div>
                    <div className="text-gray-400">Team</div>
                    <div className="font-semibold">{project.team.length} members</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <BarChart3 className="w-4 h-4 text-gray-400" />
                  <div>
                    <div className="text-gray-400">Controls</div>
                    <div className="font-semibold">{project.controls} total</div>
                  </div>
                </div>
              </div>

              {/* Team Members */}
              <div className="flex items-center gap-2">
                <span className="text-gray-400 text-sm">Team:</span>
                <div className="flex flex-wrap gap-1">
                  {project.team.map((member, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {member}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2 pt-2">
                <Button size="sm">View Details</Button>
                <Button variant="outline" size="sm">Edit</Button>
                <Button variant="outline" size="sm">Timeline</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Gantt Chart Placeholder */}
      <Card className="bg-gray-900 border-gray-800">
        <CardHeader>
          <CardTitle>Project Timeline (Gantt Chart)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 flex items-center justify-center text-gray-400">
            <div className="text-center">
              <BarChart3 className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>Interactive Gantt chart visualization would appear here</p>
              <p className="text-sm mt-2">Showing project timelines, dependencies, and milestones</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}