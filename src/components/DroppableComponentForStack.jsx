import React from 'react';
import { useDroppable } from '@dnd-kit/core';

function DroppableComponentForStack({ id, children, disabled }) {
  const { isOver, setNodeRef } = useDroppable({
    id,
    disabled, 
  });

  return (
    <div ref={setNodeRef} className='greenDropable' >
      {children}
    </div>
  );
}

export default DroppableComponentForStack;
