import { useState } from 'react'
import { Button } from '@/components/ui/button'

interface Task {
  id: number
  title: string
  completed: boolean
  priority: 'high' | 'medium' | 'low'
  dueDate: string
}

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: 1,
      title: "Follow up with Medicare client",
      completed: false,
      priority: "high",
      dueDate: "2025-01-27"
    },
    {
      id: 2,
      title: "Submit life insurance application",
      completed: false,
      priority: "medium",
      dueDate: "2025-01-28"
    }
  ])

  const toggleTask = (taskId: number) => {
    setTasks(tasks.map(task => 
      task.id === taskId 
        ? { ...task, completed: !task.completed }
        : task
    ))
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Tasks</h2>
        <Button variant="outline" size="sm">Add Task</Button>
      </div>
      
      <div className="space-y-3">
        {tasks.map((task) => (
          <div 
            key={task.id}
            className="flex items-center justify-between p-3 bg-gray-50 rounded"
          >
            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleTask(task.id)}
                className="h-4 w-4 rounded border-gray-300"
              />
              <div>
                <p className={task.completed ? 'line-through text-gray-500' : ''}>
                  {task.title}
                </p>
                <p className="text-sm text-gray-500">Due: {task.dueDate}</p>
              </div>
            </div>
            
            <span className={`px-2 py-1 rounded-full text-xs ${
              {
                high: 'bg-red-100 text-red-800',
                medium: 'bg-yellow-100 text-yellow-800',
                low: 'bg-green-100 text-green-800'
              }[task.priority]
            }`}>
              {task.priority}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}