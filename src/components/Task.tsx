import { useState } from 'react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Task as TaskType } from './Project';

interface TaskProps {
  task: TaskType;
  onAddSubtask: (title: string) => void;
}

export function Task({ task, onAddSubtask }: TaskProps) {
  const [newSubtaskTitle, setNewSubtaskTitle] = useState('');

  const handleAddSubtask = () => {
    if (newSubtaskTitle.trim()) {
      onAddSubtask(newSubtaskTitle);
      setNewSubtaskTitle('');
    }
  };

  return (
    <Card className="w-full">
      <CardContent className="pt-6">
        <div className="flex flex-col space-y-4">
          <div className="font-medium">{task.title}</div>
          <div className="flex space-x-2">
            <Input
              placeholder="New subtask..."
              value={newSubtaskTitle}
              onChange={(e) => setNewSubtaskTitle(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleAddSubtask()}
            />
            <Button onClick={handleAddSubtask}>Add Subtask</Button>
          </div>
          {task.subtasks.length > 0 && (
            <div className="pl-4 border-l-2 space-y-2">
              {task.subtasks.map((subtask) => (
                <Task
                  key={subtask.id}
                  task={subtask}
                  onAddSubtask={onAddSubtask}
                />
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
} 