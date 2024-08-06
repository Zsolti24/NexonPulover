import React from 'react';
import { useDroppable } from '@dnd-kit/core';

function DroppableComponent({ id, children, disabled }) {
  const { isOver, setNodeRef } = useDroppable({
    id,
    disabled, // Apply the disabled prop here
  });

  return (
    <div ref={setNodeRef} className='DroppableContentHanger' >
      {children}
    </div>
  );
}

export default DroppableComponent;
