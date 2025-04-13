import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Task as TaskType } from './Project';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';

interface TaskProps {
  task: TaskType;
  onAddSubtask: (parentTaskId: string, title: string, priority: 'low' | 'medium' | 'high', importance: 'low' | 'medium' | 'high') => void;
  onDelete: (taskId: string) => void;
  onEdit: (taskId: string, newTitle: string, newPriority: 'low' | 'medium' | 'high', newImportance: 'low' | 'medium' | 'high') => void;
}

export function Task({ task, onAddSubtask, onDelete, onEdit }: TaskProps) {
  const [newSubtaskTitle, setNewSubtaskTitle] = useState('');
  const [newSubtaskPriority, setNewSubtaskPriority] = useState<'low' | 'medium' | 'high'>('medium');
  const [newSubtaskImportance, setNewSubtaskImportance] = useState<'low' | 'medium' | 'high'>('medium');
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task.title);
  const [editedPriority, setEditedPriority] = useState(task.priority);
  const [editedImportance, setEditedImportance] = useState(task.importance);

  const handleAddSubtask = () => {
    if (newSubtaskTitle.trim()) {
      onAddSubtask(task.id, newSubtaskTitle, newSubtaskPriority, newSubtaskImportance);
      setNewSubtaskTitle('');
    }
  };

  const handleEditSubmit = () => {
    onEdit(task.id, editedTitle, editedPriority, editedImportance);
    setIsEditing(false);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const getImportanceColor = (importance: string) => {
    switch (importance) {
      case 'high': return 'bg-purple-500';
      case 'medium': return 'bg-blue-500';
      case 'low': return 'bg-gray-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <Card className="w-full">
      <CardContent className="pt-6">
        <div className="flex flex-col space-y-4">
          {isEditing ? (
            <div className="space-y-2">
              <Input
                value={editedTitle}
                onChange={(e) => setEditedTitle(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleEditSubmit()}
              />
              <div className="flex space-x-2">
                <Select value={editedPriority} onValueChange={(value: 'low' | 'medium' | 'high') => setEditedPriority(value)}>
                  <SelectTrigger className="w-[120px]">
                    <SelectValue placeholder="Priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={editedImportance} onValueChange={(value: 'low' | 'medium' | 'high') => setEditedImportance(value)}>
                  <SelectTrigger className="w-[120px]">
                    <SelectValue placeholder="Importance" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex space-x-2">
                <Button onClick={handleEditSubmit}>Save</Button>
                <Button variant="outline" onClick={() => setIsEditing(false)}>Cancel</Button>
              </div>
            </div>
          ) : (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="font-medium">{task.title}</div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>Edit</Button>
                  <Button variant="destructive" size="sm" onClick={() => onDelete(task.id)}>Delete</Button>
                </div>
              </div>
              <div className="flex space-x-2">
                <Badge className={getPriorityColor(task.priority)}>Priority: {task.priority}</Badge>
                <Badge className={getImportanceColor(task.importance)}>Importance: {task.importance}</Badge>
              </div>
            </div>
          )}

          <div className="flex space-x-2">
            <Input
              placeholder="New subtask..."
              value={newSubtaskTitle}
              onChange={(e) => setNewSubtaskTitle(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleAddSubtask()}
            />
            <Select value={newSubtaskPriority} onValueChange={(value: 'low' | 'medium' | 'high') => setNewSubtaskPriority(value)}>
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="Priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low">Low</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="high">High</SelectItem>
              </SelectContent>
            </Select>
            <Select value={newSubtaskImportance} onValueChange={(value: 'low' | 'medium' | 'high') => setNewSubtaskImportance(value)}>
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="Importance" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low">Low</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="high">High</SelectItem>
              </SelectContent>
            </Select>
            <Button onClick={handleAddSubtask}>Add Subtask</Button>
          </div>

          {task.subtasks.length > 0 && (
            <div className="pl-4 border-l-2 space-y-2">
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
        </div>
      </CardContent>
    </Card>
  );
} 