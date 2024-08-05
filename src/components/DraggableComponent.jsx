import React from 'react';
import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';

function DraggableComponent({ id, src, alt }) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id,
  });

  // Csak a translate értéket használjuk a transform-ban
  const style = {
    touchAction: 'none',
    width: '100%', 
    opacity: isDragging ? 1 : 1, 
    zIndex: isDragging ? 1000 : 'auto',
    cursor: isDragging ? 'grab' : 'pointer',
    transform: isDragging ? `translate(${transform.x}px, ${transform.y}px)` : 'none', // Csak a pozíció
  };

  return (
    <div ref={setNodeRef} style={style} {...listeners} {...attributes} className="draggable">
      <img src={src} alt={alt} style={{ width: '100%'}} />
    </div>
  );
}

export default DraggableComponent;
