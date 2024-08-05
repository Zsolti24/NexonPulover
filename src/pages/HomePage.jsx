import React, { useState, useEffect, useRef } from 'react'
import HeaderImgL from '../../public/images/headerImage2022.png'
import HeaderImgM from '../../public/images/headerImage2022_small.png'
import CoatHangerImg from '../../public/images/coathanger.png'
import Shelf from '../../public/images/shelf.png'
import Info from '../../public/images/infoIcon.png'
import LinkBtn from '../../public/images/linkIcon.png'

import { DndContext } from '@dnd-kit/core';
import DraggableComponent from '../components/DraggableComponent';
import DroppableComponent from '../components/DroppableComponent';
import DroppableComponentForStack from '../components/DroppableComponentForStack';
import { findRenderedComponentWithType } from 'react-dom/test-utils'

// LINK FOR THE SCRIPT https://script.google.com/macros/s/AKfycbwo_wPjNaIIvXR60FgBIudGWYvUmYhEgyfsocdxzAevbKlajZvzdw8_bHZ_i2hA8OuZ/exec


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
        droppable8: ['draggable-4'],
        droppable9: ['draggable-5'],
        droppable10: ['draggable-6'],
        droppable11: ['draggable-7'],
        droppable12: ['draggable-8'],
        droppable13: ['draggable-9'],
        droppable14: ['draggable-10'],
        droppable15: ['draggable-11'],
        droppable16: ['draggable-12'],
      });
    
      const [draggableItems] = useState([
        { id: 'draggable-1', alt: 'Image 1' },
        { id: 'draggable-2', alt: 'Image 2' },
        { id: 'draggable-3', alt: 'Image 3' },
        { id: 'draggable-4', alt: 'Image 4' },
        { id: 'draggable-5', alt: 'Image 5' },
        { id: 'draggable-6', alt: 'Image 6' },
        { id: 'draggable-7', alt: 'Image 7' },
        { id: 'draggable-8', alt: 'Image 8' },
        { id: 'draggable-9', alt: 'Image 9' },
        { id: 'draggable-10', alt: 'Image 10' },
        { id: 'draggable-11', alt: 'Image 11' },
      ]);

      const handleDragEnd = (event) => {
        const { active, over } = event;
    
        if (over) {
          setDroppedItems((prev) => {
            const updated = { ...prev };
    
            Object.keys(updated).forEach((key) => {
              updated[key] = updated[key].filter((item) => item !== active.id);
            });
    
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
    

      const droppableIds = Array.from({ length: 12 }, (_, index) => `droppable${index + 5}`);


      const resetDroppedItems = () => {
        setDroppedItems({
          droppable1: [],
          droppable2: [],
          droppable3: [],
          droppable4: [],
          droppable5: ['draggable-1'],
          droppable6: ['draggable-2'],
          droppable7: ['draggable-3'],
          droppable8: ['draggable-4'],
          droppable9: ['draggable-5'],
          droppable10: ['draggable-6'],
          droppable11: ['draggable-7'],
          droppable12: ['draggable-8'],
          droppable13: ['draggable-9'],
          droppable14: ['draggable-10'],
          droppable15: ['draggable-11'],
          droppable16: ['draggable-12'],
        });
        setCounters([0,0,0,0]);
      };


      const [submitBtn, setSubmitBtn] = useState('SubmitBtn');

      useEffect(() => {
        const emptyDroppables = [
          droppedItems.droppable5,
          droppedItems.droppable6,
          droppedItems.droppable7,
          droppedItems.droppable8,
          droppedItems.droppable9,
          droppedItems.droppable10,
          droppedItems.droppable11,
          droppedItems.droppable12,
          droppedItems.droppable13,
          droppedItems.droppable14,
          droppedItems.droppable15,
          droppedItems.droppable16,
        ];
    
        const allEmpty = emptyDroppables.every(item => item.length === 0);
        setSubmitBtn(allEmpty ? 'SubmitBtn SubmitBtnActive' : 'SubmitBtn');
      }, [droppedItems]); 

  return (
    <DndContext onDragEnd={handleDragEnd}>

    <div className="homeContainer">
        <img src={headerImgSrc} alt="headerImage" className='headerImage'/>
        <div className="coatHangerConatiner">
            <img src={CoatHangerImg} alt="" className='coatHangerImg'/>
            <div className={submitBtn}>ELKÜLDÖM</div>

            <div className="coatFlexContainer">
            {droppableIds.map((id) => (
                <div className="coat" key={id}>
                <DroppableComponent id={id} disabled={droppedItems[id].length > 0}>
                    {droppedItems[id].map((itemId) => (
                    <DraggableComponent 
                        key={itemId} 
                        id={itemId} 
                        src={`../public/images/Image${itemId.split('-')[1]}.png`} 
                        alt={`Image ${itemId.split('-')[1]}`} 
                    />
                    ))}
                </DroppableComponent>
                </div>
            ))}
            </div>

        </div>
        <div className="shelfContainer">
            {foundationName.map((name, index) => (
                    <div className="shelf" key={index}>
                    <div>
                      <div className='DroppPlace'>
                          <DroppableComponentForStack id={`droppable${index + 1}`}>
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
                          </DroppableComponentForStack>
                      </div>
                      <img src={Shelf} alt="" className='ShelfImg' />
                    </div>
                    <div className="counter">{counters[index]}</div>
                    <div className="foundationName">{name}</div>
                    <div className="buttons">
                        <img src={Info} alt="" className='infoBtn' />
                        <div className="link">{links[index]}</div>
                        <img src={LinkBtn} alt=""  className='LinkBtn'/>
                    </div>
                    </div>
                ))}


        </div>
        <div className="resetBtn" onClick={resetDroppedItems}>
            VISSZAÁLLÍTÁS
        </div>
    </div>
    </DndContext>
  )
}
