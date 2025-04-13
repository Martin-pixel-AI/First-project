import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Task } from "./Task";
import { Task as TaskType } from "./Project";

interface DraggableTaskProps {
  id: string;
  task: TaskType;
  onAddSubtask: (parentTaskId: string, subtaskTitle: string, subtaskDescription: string, priority: 'low' | 'medium' | 'high') => void;
  onDelete: (taskId: string) => void;
  onEdit: (taskId: string, newTitle: string, newDescription: string, newPriority: 'low' | 'medium' | 'high') => void;
}

export function DraggableTask({ id, task, onAddSubtask, onDelete, onEdit }: DraggableTaskProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <Task 
        task={task}
        onAddSubtask={onAddSubtask}
        onDelete={onDelete}
        onEdit={onEdit}
      />
    </div>
  );
} 