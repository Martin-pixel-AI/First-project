import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Task as TaskType } from './Project';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';

interface TaskProps {
  task: TaskType;
  onAddSubtask: (parentTaskId: string, subtaskTitle: string, priority: 'low' | 'medium' | 'high', importance: 'low' | 'medium' | 'high') => void;
  onDelete: (taskId: string) => void;
  onEdit: (taskId: string, newTitle: string, newPriority: 'low' | 'medium' | 'high', newImportance: 'low' | 'medium' | 'high') => void;
}

export function Task({ task, onAddSubtask, onDelete, onEdit }: TaskProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task.title);
  const [editedPriority, setEditedPriority] = useState(task.priority);
  const [editedImportance, setEditedImportance] = useState(task.importance);
  const [newSubtaskTitle, setNewSubtaskTitle] = useState('');
  const [newSubtaskPriority, setNewSubtaskPriority] = useState<'low' | 'medium' | 'high'>('medium');
  const [newSubtaskImportance, setNewSubtaskImportance] = useState<'low' | 'medium' | 'high'>('medium');

  const handleEditSubmit = () => {
    onEdit(task.id, editedTitle, editedPriority, editedImportance);
    setIsEditing(false);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 hover:bg-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 hover:bg-green-200';
      default: return 'bg-gray-100 text-gray-800 hover:bg-gray-200';
    }
  };

  const getImportanceColor = (importance: string) => {
    switch (importance) {
      case 'high': return 'bg-purple-100 text-purple-800 hover:bg-purple-200';
      case 'medium': return 'bg-blue-100 text-blue-800 hover:bg-blue-200';
      case 'low': return 'bg-gray-100 text-gray-800 hover:bg-gray-200';
      default: return 'bg-gray-100 text-gray-800 hover:bg-gray-200';
    }
  };

  return (
    <Card className="w-full shadow-md hover:shadow-lg transition-shadow duration-200">
      <CardHeader className="pb-3">
        {isEditing ? (
          <div className="space-y-3">
            <Input
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
              className="w-full"
            />
            <div className="flex gap-2">
              <Select value={editedPriority} onValueChange={(value: 'low' | 'medium' | 'high') => setEditedPriority(value)}>
                <SelectTrigger className="w-[130px]">
                  <SelectValue placeholder="Priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                </SelectContent>
              </Select>
              <Select value={editedImportance} onValueChange={(value: 'low' | 'medium' | 'high') => setEditedImportance(value)}>
                <SelectTrigger className="w-[130px]">
                  <SelectValue placeholder="Importance" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex gap-2">
              <Button onClick={handleEditSubmit} className="flex-1">Save</Button>
              <Button variant="outline" onClick={() => setIsEditing(false)} className="flex-1">Cancel</Button>
            </div>
          </div>
        ) : (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-semibold">{task.title}</CardTitle>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => setIsEditing(true)} className="hover:bg-gray-100">Edit</Button>
                <Button variant="destructive" size="sm" onClick={() => onDelete(task.id)} className="hover:bg-red-600">Delete</Button>
              </div>
            </div>
            <div className="flex gap-2">
              <Badge className={getPriorityColor(task.priority)}>{task.priority}</Badge>
              <Badge className={getImportanceColor(task.importance)}>{task.importance}</Badge>
            </div>
          </div>
        )}
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-wrap gap-3 items-center bg-gray-50 p-3 rounded-lg">
          <Input
            placeholder="New subtask..."
            value={newSubtaskTitle}
            onChange={(e) => setNewSubtaskTitle(e.target.value)}
            className="flex-1 min-w-[150px]"
          />
          <Select value={newSubtaskPriority} onValueChange={(value: 'low' | 'medium' | 'high') => setNewSubtaskPriority(value)}>
            <SelectTrigger className="w-[130px]">
              <SelectValue placeholder="Priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="low">Low</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="high">High</SelectItem>
            </SelectContent>
          </Select>
          <Select value={newSubtaskImportance} onValueChange={(value: 'low' | 'medium' | 'high') => setNewSubtaskImportance(value)}>
            <SelectTrigger className="w-[130px]">
              <SelectValue placeholder="Importance" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="low">Low</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="high">High</SelectItem>
            </SelectContent>
          </Select>
          <Button 
            onClick={() => {
              if (newSubtaskTitle.trim()) {
                onAddSubtask(task.id, newSubtaskTitle, newSubtaskPriority, newSubtaskImportance);
                setNewSubtaskTitle('');
              }
            }}
            className="px-4"
          >
            Add Subtask
          </Button>
        </div>
        {task.subtasks.length > 0 && (
          <div className="space-y-3 pl-4 border-l-2 border-gray-200">
            {task.subtasks.map((subtask) => (
              <Task
                key={subtask.id}
                task={subtask}
                onAddSubtask={onAddSubtask}
                onDelete={onDelete}
                onEdit={onEdit}
              />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
} 