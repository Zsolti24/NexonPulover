import React, { useState, useEffect, useRef } from 'react'
import HeaderImgL from '../../public/images/headerImage2022.png'
import HeaderImgM from '../../public/images/headerImage2022_small.png'
import CoatHangerImg from '../../public/images/coathanger.png'
import Shelf from '../../public/images/shelf.png'
import Info from '../../public/images/infoIcon.png'

import { DndContext } from '@dnd-kit/core';
import DraggableComponent from '../components/DraggableComponent';
import DroppableComponent from '../components/DroppableComponent';


export default function HomePage() {

    const [headerImgSrc,setHeaderImgSrc] = useState(HeaderImgL)

    useEffect(() => {
        const handleResize = () => {
        const width = window.innerWidth;
        if (width <= 1024) {
            setHeaderImgSrc(HeaderImgM);
        } else {
            setHeaderImgSrc(HeaderImgL);    
        }
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const [counters, setCounters] = useState([0,0,0,0])
    const [foundationName, setFoundationName] = useState(["SZENT ISTVÁN KIRÁLY ZENEI ALAPÍTVÁNY","AUTIZMUS ALAPÍTVÁNY","ÉLELMISZERBANK EGYESÜLET","LÁMPÁS '92 ALAPÍTVÁNY"])
    const [links, setLinks] = useState(["www.szentistvanzene.hu","www.autizmus.hu","www.elemiszerbank.hu","www.lampas92.hu"]);


    const [droppedItems, setDroppedItems] = useState({
        droppable1: [],
        droppable2: [],
        droppable3: [],
        droppable4: [],
        droppable5: ['draggable-1'],
        droppable6: ['draggable-2'],
        droppable7: ['draggable-3'],
      });
    
      const [draggableItems] = useState([
        { id: 'draggable-1', alt: 'Image 1' },
        { id: 'draggable-2', alt: 'Image 2' },
        { id: 'draggable-3', alt: 'Image 3' },
        { id: 'draggable-4', alt: 'Image 4' },
      ]);

      const handleDragEnd = (event) => {
        const { active, over } = event;
    
        if (over) {
          setDroppedItems((prev) => {
            const updated = { ...prev };
    
            // Remove item from its original droppable
            Object.keys(updated).forEach((key) => {
              updated[key] = updated[key].filter((item) => item !== active.id);
            });
    
            // Add item to the new droppable if conditions are met
            if (over.id === 'droppable1' || over.id === 'droppable2' || over.id === 'droppable3' || over.id === 'droppable4') {
              updated[over.id].push(active.id);
            } else if (updated[over.id].length === 0) {
              updated[over.id] = [active.id];
            }
            
            const newCounters = Object.values(updated).map((items) => items.length);
            setCounters(newCounters);

            return updated;
          });
        }
      };
    





  return (
    <DndContext onDragEnd={handleDragEnd}>

    <div className="homeContainer">
        <img src={headerImgSrc} alt="headerImage" className='headerImage'/>
        <div className="coatHangerConatiner">
            <img src={CoatHangerImg} alt="" className='coatHangerImg'/>
            <div className="coatFlexContainer">
                <div className="coat">
                    <DroppableComponent id="droppable5" disabled={droppedItems.droppable5.length > 0}>
                
                        {droppedItems.droppable5.map((id) => (
                            <DraggableComponent key={id} id={id} src={`../public/images/Image${id.split('-')[1]}.png`} alt={`Image ${id.split('-')[1]}`} />
                        ))}
                    </DroppableComponent>
                </div> 
                <div className="coat">
                    <DroppableComponent id="droppable6" disabled={droppedItems.droppable6.length > 0}>
                
                        {droppedItems.droppable6.map((id) => (
                            <DraggableComponent key={id} id={id} src={`../public/images/Image${id.split('-')[1]}.png`} alt={`Image ${id.split('-')[1]}`} />
                        ))}
                    </DroppableComponent>
                </div> 
                <div className="coat">
                    <DroppableComponent id="droppable7" disabled={droppedItems.droppable7.length > 0}>
                        {droppedItems.droppable7.map((id) => (
                            <DraggableComponent key={id} id={id} src={`../public/images/Image${id.split('-')[1]}.png`} alt={`Image ${id.split('-')[1]}`} />
                        ))}
                    </DroppableComponent>
                </div> 
            </div>
        </div>
        <div className="shelfContainer">
            {foundationName.map((name, index) => (
                    <div className="shelf" key={index}>
                    <div className='DroppPlace'>
                        <DroppableComponent id={`droppable${index + 1}`}>
                        <div className="dropPlace">
                            {droppedItems[`droppable${index + 1}`].map((id) => (
                            <DraggableComponent 
                                key={id} 
                                id={id} 
                                src={`../public/images/FImage${id.split('-')[1]}.png`} 
                                alt={`Image ${id.split('-')[1]}`} 
                            />
                            ))}
                        </div>
                        </DroppableComponent>
                    </div>
                    <img src={Shelf} alt="" className='ShelfImg' />
                    <div className="counter">{counters[index]}</div>
                    <div className="foundationName">{name}</div>
                    <div className="buttons">
                        <img src={Info} alt="" className='infoBtn' />
                        <div className="link">{links[index]}</div>
                    </div>
                    </div>
                ))}


        </div>
        <div className="resetBtn">
            VISSZAÁLLÍTÁS
        </div>
    </div>
    </DndContext>
  )
}
