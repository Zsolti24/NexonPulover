import React from 'react';
import { useDroppable } from '@dnd-kit/core';

function DroppableComponentForStack({ id, children, disabled }) {
  const { isOver, setNodeRef } = useDroppable({
    id,
    disabled, 
  });

//   const styleD = {
//     width: '600px',
//     height: '120px',
//     backgroundColor: 'lightgreen',
//     display: 'flex',
//     flexDirection: 'column',
//     flexWrap: 'wrap',
//     alignContent: 'flex-start',
//     justifyContent: 'flex-end',
//     flexFlow: 'column',
//   };
  
  return (
    <div ref={setNodeRef} className='lenti' >
        <div>
      {children}
      </div>
    </div>
  );
}

export default DroppableComponentForStack;
