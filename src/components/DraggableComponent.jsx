import React from 'react';
import { useDraggable } from '@dnd-kit/core';

function DraggableComponent({ id, src, alt }) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id,
  });

  // Az osztályok dinamikus beállítása
  const className = `draggable ${isDragging ? 'dragging' : ''}`;

  return (
    <div
      ref={setNodeRef}
      className={className}
      style={{
        transform: isDragging ? `translate(${transform.x}px, ${transform.y}px)` : 'none', // Csak a pozíció
      }}
      {...listeners}
      {...attributes}
    >
      <img src={src} alt={alt} className='coatImg' />
    </div>
  );
}

export default DraggableComponent;
