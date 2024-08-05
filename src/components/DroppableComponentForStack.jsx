import React from 'react';
import { useDroppable } from '@dnd-kit/core';

function DroppableComponentForStack({ id, children, disabled }) {
  const { isOver, setNodeRef } = useDroppable({
    id,
    disabled, 
  });

  return (
    <div ref={setNodeRef} className='lenti' >
        <div>
      {children}
      </div>
    </div>
  );
}

export default DroppableComponentForStack;
