import React, { useState, useEffect, useRef } from 'react'
import HeaderImgL from '../../public/images/headerImage2022.png'
import HeaderImgM from '../../public/images/headerImage2022_small.png'
import CoatHangerImg from '../../public/images/coathanger.png'
import Shelf from '../../public/images/shelf.png'
import Info from '../../public/images/infoIcon.png'
import LinkBtn from '../../public/images/linkIcon.png'

import axios from 'axios'

import {foundationName, links, range, spreadsheetId, fetchLink, SheetLink} from '../constans/constans'

import { DndContext } from '@dnd-kit/core';
import DraggableComponent from '../components/DraggableComponent';
import DroppableComponent from '../components/DroppableComponent';
import DroppableComponentForStack from '../components/DroppableComponentForStack';

export default function HomePage() {

    const [headerImgSrc,setHeaderImgSrc] = useState(HeaderImgL);

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
        console.log("nem");
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


      const [sentText, setSentText] = useState("Sikeresen elküldte");
      const [data, setData] = useState(null);
      const [expired, setExpired] = useState(false);
      const [sentAppear, setSentAppear] = useState(false);

      const sent = () => {
          const temp = checkExpiry();
          console.log(temp.value);
          if(sentAppear==false && data==true && temp.value==false){
              setSentAppear(true);
              setSentText("Várnod kell a következő küldésig.");
          }
          else if(sentAppear==false){
              handleUpdateCell();
              setSentText("Sikeresen elküldte");
              resetDroppedItems();
              setSentAppear(true);
              handleSave(true);
          }
      }
      const closePop = () => {
           setSentAppear(false);
      }


      const infoClicked = (text) => {
        if(sentAppear==false){
            setSentAppear(true);
            setSentText(text);
        }
    }

      useEffect(() => {
        
        const storedData = getFromLocalStorage('myKey');
        if (storedData) {
          setData(storedData);
        }    
      }, []);

      
      const handleSave = (val) => {
        saveToLocalStorage('myKey', val, 10);
        setData(val);
      };




      const [readdata, setreaddata] = useState([]);
      const [error, setError] = useState(null);
      
      useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await fetch(fetchLink);
            const text = await response.text();
            const jsonData = JSON.parse(text.substr(47).slice(0, -2));
            const rows = jsonData.table.rows.map(row => row.c.map(cell => cell ? cell.v : ''));
            setreaddata(rows);
          } catch (err) {
            setError('Error fetching data');
            console.error(err);
          }
        };
        
        fetchData();
      }, [spreadsheetId, range]);

      const [nextIndeex, setNextIndeex] = useState(10);

      const [ipAddress, setIpAddress] = useState('');

      const tellTheIndex = () => {
        var len = readdata.length + 1;
        setNextIndeex(readdata.length);
      }
      
      const fetchIpAddress = async () => {
        try {
          const response = await axios.get('https://api.ipify.org?format=json');
          setIpAddress(response.data.ip);
        } catch (error) {
          console.error('Error fetching IP address:', error);
        }
      };
      
      fetchIpAddress();
      
      const handleUpdateCell = async () => {
        tellTheIndex();
        const now = new Date();
        now.setHours(now.getHours() + 2);
        fetchIpAddress();
        tellTheIndex();
        const response = await axios.get(`${SheetLink}?action=setValue&id=${readdata.length + 1}&ip=${ipAddress}&time=${now.toISOString()}&fou1=${counters[0]}&fou2=${counters[1]}&fou3=${counters[2]}&fou4=${counters[3]}&row=${readdata.length + 2}`);
      };
      



    function checkExpiry(){
        const now = new Date().getTime();
        const itemStr = localStorage.getItem('myKey');
        if (itemStr) {
          const item = JSON.parse(itemStr);
          if (now > item.expiry) {
            setExpired(true);
            setData(null);
            localStorage.removeItem('myKey'); 
            return {value: true};
          } else {
            setData(item.value);
            setExpired(false);
            return {value: false};
          }
        } else {
          setData(null);
          return {value: false};
        }
      }




      const handleClick = (link) => {
        window.location.href = `https://${link}`;
      };






  return (
    <DndContext onDragEnd={handleDragEnd}>

    <div className="homeContainer">
        <img src={headerImgSrc} alt="headerImage" className='headerImage'/>
        <div className="coatHangerConatiner">
            <img src={CoatHangerImg} alt="" className='coatHangerImg'/>
            <div className={submitBtn} onClick={sent}>ELKÜLDÖM</div>

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
                        <img src={Info} alt="" className='infoBtn' onClick={() => infoClicked('There could be a description of the foundation imported from a const file')}/>
                        <div className="link" onClick={() => handleClick(links[index])}>{links[index]}</div>
                        <img src={LinkBtn} alt=""  className='LinkBtn' onClick={() => handleClick(links[index])}/>
                    </div>
                    </div>
                ))}


        </div>
        <div className="resetBtn" onClick={resetDroppedItems}>
            VISSZAÁLLÍTÁS
        </div>
    </div>
    <div className={sentAppear ? "popSent popSentActive" : "popSent"}>
            {sentText}
            <div className="xbutton" onClick={closePop}>
                x
            </div>
        </div>

    </DndContext>
  )
}


const saveToLocalStorage = (key, value, ttl) => {
  const now = new Date().getTime();
  const item = {
    value: value,
    expiry: now + ttl * 60000,
  };
  localStorage.setItem(key, JSON.stringify(item));
};

const getFromLocalStorage = (key) => {
  const itemStr = localStorage.getItem(key);
  if (!itemStr) {
    return null;
  }
  const item = JSON.parse(itemStr);
  const now = new Date().getTime();
  if (now > item.expiry) {
    localStorage.removeItem(key);
    return null;
  }
  return item.value;
};