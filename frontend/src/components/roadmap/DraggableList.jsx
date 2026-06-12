import { DndContext, closestCenter, PointerSensor, useSensor, useSensors, KeyboardSensor } from "@dnd-kit/core";
import { SortableContext, arrayMove, sortableKeyboardCoordinates, useSortable, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical } from "lucide-react";
import { useState } from "react";

function SortableRow({ item, labelKey = "title" }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: item.id });
  const style = { transform: CSS.Transform.toString(transform), transition,
                  opacity: isDragging ? 0.6 : 1 };
  return (
    <li ref={setNodeRef} style={style}
      className="flex items-center gap-3 p-3 rounded-xl bg-surface2 border border-border">
      <button {...attributes} {...listeners}
        className="cursor-grab text-muted hover:text-mint" aria-label="drag">
        <GripVertical className="w-4 h-4" />
      </button>
      <span className="text-sm">{item[labelKey]}</span>
    </li>
  );
}

export default function DraggableList({ items, onReorder, labelKey = "title", testid = "dnd-list" }) {
  const [list, setList] = useState(items);
  const sensors = useSensors(useSensor(PointerSensor), useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }));
  const ids = list.map(i => i.id);

  const handleEnd = (e) => {
    const { active, over } = e;
    if (!over || active.id === over.id) return;
    const oldIdx = ids.indexOf(active.id);
    const newIdx = ids.indexOf(over.id);
    const next = arrayMove(list, oldIdx, newIdx);
    setList(next);
    onReorder?.(next.map(n => n.id));
  };

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleEnd}>
      <SortableContext items={ids} strategy={verticalListSortingStrategy}>
        <ul className="space-y-2" data-testid={testid}>
          {list.map(i => <SortableRow key={i.id} item={i} labelKey={labelKey} />)}
        </ul>
      </SortableContext>
    </DndContext>
  );
}
