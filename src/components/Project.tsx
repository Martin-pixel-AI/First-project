import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Task } from './Task';

export interface ProjectProps {
  id: string;
  name: string;
  onDelete: (id: string) => void;
}

export interface Task {
  id: string;
  title: string;
  subtasks: Task[];
}

export function Project({ id, name, onDelete }: ProjectProps) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  const addTask = () => {
    if (newTaskTitle.trim()) {
      const newTask: Task = {
        id: Date.now().toString(),
        title: newTaskTitle,
        subtasks: []
      };
      setTasks([...tasks, newTask]);
      setNewTaskTitle('');
    }
  };

  const addSubtask = (parentTaskId: string, subtaskTitle: string) => {
    setTasks(tasks.map(task => {
      if (task.id === parentTaskId) {
        return {
          ...task,
          subtasks: [...task.subtasks, {
            id: Date.now().toString(),
            title: subtaskTitle,
            subtasks: []
          }]
        };
      }
      return task;
    }));
  };

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-xl font-bold">{name}</CardTitle>
        <Button variant="destructive" size="sm" onClick={() => onDelete(id)}>
          Delete Project
        </Button>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col space-y-4">
          <div className="flex space-x-2">
            <Input
              placeholder="New task..."
              value={newTaskTitle}
              onChange={(e) => setNewTaskTitle(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addTask()}
            />
            <Button onClick={addTask}>Add Task</Button>
          </div>
          <div className="grid grid-cols-1 gap-4">
            {tasks.map((task) => (
              <Task
                key={task.id}
                task={task}
                onAddSubtask={(title) => addSubtask(task.id, title)}
              />
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 