import frame from './images/frame.png';
import map from './images/map.png';
import red from './images/red.png';
import hypoxic from './images/hypoxic.png';
import corn from './images/corn.png';
import './App.css';
// import { useState } from 'react'
// import * as React from 'react';
import React, { PureComponent } from 'react';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

function App() {
  const data = [
    {
      Nitrates_Entering_Watershed: 1000,
      Denitrification: 1400,
      Nitrates_to_Gulf: 1100,
    },
  ];
  const data2 = [
    {
      Money: 1,
      Money2: 2,
      Money3: 3,
    },
  ];


 
    /*const [top, setTop] = useState(250)
    const [left, setLeft] = useState(220)
    const [start, setStart] = useState(null)

    function onDragStart(e) {
        setStart({ x: e.clientX - left, y: e.clientY - top})
        e.preventDefault();
    }

    function onDrag(e) {
       
        if (start !== null) {
            const dx = start.x - e.clientX;
            //const dy = start.y - e.clientY;
           // setTop(-dy)
            setLeft(-dx)
        }
        e.preventDefault();
    }

    function onDragEnd() {
        console.log('END')
        setStart(null)
    }*/

    return (
        <div className="App">

            <img src={frame} alt="main frame" height={720} width={950} />
            <img src={map} alt="main map" height={700} width={700} style={{ position: 'absolute', zIndex:2, left: 0, top: 20 }} />
            {/* <img src={red} alt="drag element" height={100} width={100} style={{ position: 'absolute', top: top, left: left, zIndex: 3 }}
                onMouseDown={onDragStart} onMouseMove={onDrag} onMouseUp={onDragEnd}/> */}
            <img src={hypoxic} alt="hypoxic"height={93} width={300} style={{ position: 'absolute', zIndex:6, left: 324, top: 574 }} />
            <img src={corn} alt="corn"height={362} width={153} style={{ position: 'absolute', zIndex:6, left: 20, top: 320 }} />
            <div class='text-on-image' style={{zIndex:4}}>
             <h1> THE NITROGEN GAME</h1>
            </div>
            <div class='text-on-image2' style={{zIndex:5}}>
             <p>The Mississippi<br></br> Watershed</p>
          </div>
          <div class='dropdown-text'style={{zIndex:10}}>
            <p><b>WATERSHED</b></p>
          </div>
          <div class='dropdown' style={{zIndex:10}}> 
            <select class= 'dropdown2'>
                <option value="WHOLE">WHOLE</option>
                <option value="SUB_WATERSHEDS">SUB WATERSHEDS</option>
                <option value="PAST_HYPOXIC_ZONES">PAST HYPOXIC ZONES</option>
            </select>
          </div>
          <div class='weather-text'style={{zIndex:10}}>
            <p><b>WEATHER</b></p>
          </div>
          <div class='weather' style={{zIndex:10}}> 
            <select class= 'weather2'>
                <option value="WET_YEAR">WET YEAR</option>
                <option value="MEDIUM">MEDIUM</option>
                <option value="DRY_YEAR">DRY YEAR</option>
            </select>
          </div>
          <div class='crop-text'style={{zIndex:10}}>
            <p><b>CROP PRICE INDEX</b></p>
          </div>
          <div class='crop' style={{zIndex:10}}> 
            <select class= 'crop2'>
                <option value="VERY_LOW">VERY LOW</option>
                <option value="LOW">LOW</option>
                <option value="MEDIUM">MEDIUM</option>
                <option value="HIGH">HIGH</option>
                <option value="VERY_HIGH">VERY HIGH</option>
            </select>
          </div>
            <div class="filter-range">
              <div class="filter-range-title">Fertilization Reduction (%)</div>
                <div class="slidercontainer">
                  <input type="range" min="1" max="100" defaultvalue="0" class="slider" step="1" id="myRange" />
                  <input type="range" min="1" max="100"  class="slider2" id="myRange2"/>
                  <div id="demo"></div>
                </div>
                <div class="filter-range-title2">Wetland Restoration (% area)</div>
              </div>
              <div class='bar'>
          <BarChart style={{zIndex:18}}
      width={200}
      height={500}
      data={data}
      margin={{
        top: 0,
        right: 30,
        left: 20,
        bottom: 5
      }}
    >
      
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      {/* <Legend /> */}
      <Bar dataKey="Nitrates_Entering_Watershed" stackId="a" fill="#8884d8" />
      <Bar dataKey="Denitrification" stackId="a" fill="#82ca9d" />
      <Bar dataKey="Nitrates_to_Gulf" stackId="a" fill="purple" />
    </BarChart>
    </div>
    <div class='bar2'>
          <BarChart style={{zIndex:17}}
      width={150}
      height={500}
      data={data2}
      margin={{
        top: 0,
        right: 30,
        left: 20,
        bottom: 5
      }}
    >
      
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      {/* <Legend /> */}
      <Bar dataKey="Money" stackId="a" fill="green" />
      <Bar dataKey="Money2" stackId="a" fill="green" />
      <Bar dataKey="Money3" stackId="a" fill="green" />
    </BarChart>
    </div>
    


         </div>
  );
}

export default App;
