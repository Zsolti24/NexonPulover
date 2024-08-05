import React from 'react';
import { useDroppable } from '@dnd-kit/core';

function DroppableComponent({ id, children, disabled }) {
  const { isOver, setNodeRef } = useDroppable({
    id,
    disabled, // Apply the disabled prop here
  });

  const style = {
    // backgroundColor: isOver ? 'lightgreen' : 'lightgrey',
    // padding: '20px',
    // margin: '10px',
    minHeight: '100px',
    display: 'flex',
    flexDirection: 'column-reverse',
    alignItems: 'center',
    justifyContent: 'bottom',
  };

  return (
    <div ref={setNodeRef} style={style} >
      {children}
    </div>
  );
}

export default DroppableComponent;
