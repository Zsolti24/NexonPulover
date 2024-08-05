import React from 'react';
import { useDroppable } from '@dnd-kit/core';

function DroppableComponent({ id, children, disabled }) {
  const { isOver, setNodeRef } = useDroppable({
    id,
    disabled, // Apply the disabled prop here
  });

  const styleD = {
    width:'200px',
    height:'400px',
    // backgroundColor: isOver ? 'lightgreen' : 'lightgrey',
  };

  return (
    <div ref={setNodeRef} style={styleD} >
      {children}
    </div>
  );
}

export default DroppableComponent;
