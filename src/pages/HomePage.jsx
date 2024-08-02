import React, { useState, useEffect, useRef } from 'react'
import HeaderImgL from '../../public/images/headerImage2022.png'
import HeaderImgM from '../../public/images/headerImage2022_small.png'
import CoatHangerImg from '../../public/images/coathanger.png'
import Coat1 from '../../public/images/sweater1.png'
import Coat2 from '../../public/images/sweater2.png'
import Coat3 from '../../public/images/sweater3.png'
import Coat4 from '../../public/images/sweater4.png'
import Coat5 from '../../public/images/sweater5.png'
import Coat6 from '../../public/images/sweater6.png'
import Coat7 from '../../public/images/sweater7.png'
import Coat8 from '../../public/images/sweater8.png'
import Coat9 from '../../public/images/sweater9.png'
import Coat10 from '../../public/images/sweater10.png'
import Coat11 from '../../public/images/sweater11.png'
import Coat12 from '../../public/images/sweater12.png'
import Shelf from '../../public/images/shelf.png'





import {useDroppable} from '@dnd-kit/core';
import {useDraggable} from '@dnd-kit/core';
import {CSS} from '@dnd-kit/utilities';



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


    const {setNodeRef: setFirstDroppableRef} = useDroppable({
        id: 'droppable-1',
      });
      const {setNodeRef: setSecondDroppableRef} = useDroppable({
        id: 'droppable-2',
      });
      const {setNodeRef: setThirdDroppableRef} = useDroppable({
        id: 'droppable-3',
      });
      const {setNodeRef: setFourthDroppableRef} = useDroppable({
        id: 'droppable-4',
      });


      const {attributes, listeners, setNodeRef, transform} = useDraggable({
        id: 'unique-id',
      });
      const style = {
        transform: CSS.Translate.toString(transform),
      }; 


  return (
    <div className="homeContainer">
        <img src={headerImgSrc} alt="headerImage" className='headerImage'/>
        <div className="coatHangerConatiner">
            <img src={CoatHangerImg} alt="" className='coatHangerImg'/>
            <div className="coatFlexContainer">
                <div className="coat">
                    <img src={Coat1} alt="" className='coatImg'/>
                </div>  
                <div className="coat">
                    <img src={Coat2} alt="" className='coatImg'/>
                </div>
                <div className="coat">
                    <img src={Coat3} alt="" className='coatImg'/>
                </div>
                <div className="coat">
                    <img src={Coat4} alt="" className='coatImg'/>
                </div>
                <div className="coat">
                    <img src={Coat5} alt="" className='coatImg'/>
                </div>
                <div className="coat">
                    <img src={Coat6} alt="" className='coatImg'/>
                </div>
                <div className="coat">
                    <img src={Coat7} alt="" className='coatImg'/>
                </div>
                <div className="coat">
                    <img src={Coat8} alt="" className='coatImg'/>
                </div>
                <div className="coat">
                    <img src={Coat9} alt="" className='coatImg'/>
                </div>
                <div className="coat">
                    <img src={Coat10} alt="" className='coatImg'/>
                </div>
                <div className="coat">
                    <img src={Coat11} alt="" className='coatImg'/>
                </div>
                <div className="coat">
                    <img src={Coat12} alt="" className='coatImg'/>
                </div>
            </div>
        </div>
        <div className="shelfContainer">
            <div className="shelf">
                <div ref={setFirstDroppableRef} className='DroppPlace'>
                </div>
                <img src={Shelf} alt="" className='ShelfImg'/>
            </div>
            <div className="shelf">
                <div ref={setSecondDroppableRef} className='DroppPlace'>
                </div>
                <img src={Shelf} alt="" className='ShelfImg'/>
            </div>
            <div className="shelf">
                <div ref={setThirdDroppableRef} className='DroppPlace'>
                </div>
                <img src={Shelf} alt="" className='ShelfImg'/>
            </div>
            <div className="shelf">
                <div ref={setFourthDroppableRef} className='DroppPlace'>
                </div>
                <img src={Shelf} alt="" className='ShelfImg'/>
            </div>
        </div>
    </div>
  )
}
