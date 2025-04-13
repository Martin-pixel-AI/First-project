import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Task } from './Task';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export interface ProjectProps {
  id: string;
  name: string;
  onDelete: (id: string) => void;
  onEdit: (id: string, newName: string) => void;
  filterPriority: 'all' | 'low' | 'medium' | 'high';
  filterImportance: 'all' | 'low' | 'medium' | 'high';
}

export interface Task {
  id: string;
  title: string;
  subtasks: Task[];
  priority: 'low' | 'medium' | 'high';
  importance: 'low' | 'medium' | 'high';
}

export function Project({ id, name, onDelete, onEdit, filterPriority, filterImportance }: ProjectProps) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskPriority, setNewTaskPriority] = useState<'low' | 'medium' | 'high'>('medium');
  const [newTaskImportance, setNewTaskImportance] = useState<'low' | 'medium' | 'high'>('medium');
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(name);

  // Загрузка задач из localStorage при инициализации
  useEffect(() => {
    const savedTasks = localStorage.getItem(`task-board-tasks-${id}`);
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  }, [id]);

  // Сохранение задач в localStorage при изменении
  useEffect(() => {
    localStorage.setItem(`task-board-tasks-${id}`, JSON.stringify(tasks));
  }, [tasks, id]);

  const addTask = () => {
    if (newTaskTitle.trim()) {
      const newTask: Task = {
        id: Date.now().toString(),
        title: newTaskTitle,
        subtasks: [],
        priority: newTaskPriority,
        importance: newTaskImportance
      };
      setTasks([...tasks, newTask]);
      setNewTaskTitle('');
    }
  };

  const addSubtask = (parentTaskId: string, subtaskTitle: string, priority: 'low' | 'medium' | 'high', importance: 'low' | 'medium' | 'high') => {
    setTasks(tasks.map(task => {
      if (task.id === parentTaskId) {
        return {
          ...task,
          subtasks: [...task.subtasks, {
            id: Date.now().toString(),
            title: subtaskTitle,
            subtasks: [],
            priority,
            importance
          }]
        };
      }
      return task;
    }));
  };

  const deleteTask = (taskId: string) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  const editTask = (taskId: string, newTitle: string, newPriority: 'low' | 'medium' | 'high', newImportance: 'low' | 'medium' | 'high') => {
    setTasks(tasks.map(task => {
      if (task.id === taskId) {
        return {
          ...task,
          title: newTitle,
          priority: newPriority,
          importance: newImportance
        };
      }
      return task;
    }));
  };

  const handleEditSubmit = () => {
    onEdit(id, editedName);
    setIsEditing(false);
  };

  // Фильтрация задач
  const filteredTasks = tasks.filter(task => {
    const matchesPriority = filterPriority === 'all' || task.priority === filterPriority;
    const matchesImportance = filterImportance === 'all' || task.importance === filterImportance;
    return matchesPriority && matchesImportance;
  });

  return (
    <Card className="w-full shadow-lg hover:shadow-xl transition-shadow duration-200">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4 border-b">
        {isEditing ? (
          <div className="flex space-x-2 w-full">
            <Input
              value={editedName}
              onChange={(e) => setEditedName(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleEditSubmit()}
              className="flex-1"
            />
            <Button onClick={handleEditSubmit} className="px-4">Save</Button>
            <Button variant="outline" onClick={() => setIsEditing(false)} className="px-4">Cancel</Button>
          </div>
        ) : (
          <>
            <CardTitle className="text-2xl font-bold tracking-tight">{name}</CardTitle>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm" onClick={() => setIsEditing(true)} className="hover:bg-gray-100">Edit</Button>
              <Button variant="destructive" size="sm" onClick={() => onDelete(id)} className="hover:bg-red-600">Delete</Button>
            </div>
          </>
        )}
      </CardHeader>
      <CardContent className="pt-6">
        <div className="flex flex-col space-y-6">
          <div className="flex flex-wrap gap-3 items-center bg-gray-50 p-4 rounded-lg">
            <Input
              placeholder="New task..."
              value={newTaskTitle}
              onChange={(e) => setNewTaskTitle(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addTask()}
              className="flex-1 min-w-[200px]"
            />
            <Select value={newTaskPriority} onValueChange={(value: 'low' | 'medium' | 'high') => setNewTaskPriority(value)}>
              <SelectTrigger className="w-[130px]">
                <SelectValue placeholder="Priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low">Low</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="high">High</SelectItem>
              </SelectContent>
            </Select>
            <Select value={newTaskImportance} onValueChange={(value: 'low' | 'medium' | 'high') => setNewTaskImportance(value)}>
              <SelectTrigger className="w-[130px]">
                <SelectValue placeholder="Importance" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low">Low</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="high">High</SelectItem>
              </SelectContent>
            </Select>
            <Button onClick={addTask} className="px-6">Add Task</Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredTasks.map((task) => (
              <div key={task.id} className="w-full">
                <Task
                  task={task}
                  onAddSubtask={addSubtask}
                  onDelete={deleteTask}
                  onEdit={editTask}
                />
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 