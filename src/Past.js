import frame from './images/frame.png';
import map from './images/map.png';
import map2 from './images/map2.png';
import map2transparent from './images/map2transparent.png';
import hypoxic from './images/hypoxic.png';
import corn from './images/corn.png';
import fillcorn from './images/fillcorn.png';
import './App.css';
import Slider from '@mui/material/Slider';
import Box from '@mui/material/Box';
import { createTheme } from '@mui/material/styles';
//import { useState } from 'react'
// import * as React from 'react';
import React, { PureComponent } from 'react';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chooser from './mapChooser';
import {BASE_NITRATES, INTIAL, WEATHER, OPTIONS} from './constants'


function Past({mapChoices, setMap, mapSelect}) {
    const YEARS = [
        {
          label: "1985", value: 0
        },
        {
          label: "1986", value: 1
        },
        {
          label: "1987", value: 2
        },
        {
            label: "1990", value: 3
          },
          {
            label: "1991", value: 4
          },
          {
            label: "1992", value: 5
          },
          {
            label: "1993", value: 6
          },
          {
            label: "1994", value: 7
          },
          {
            label: "1995", value: 8
          },
          {
            label: "1996", value: 9
          },
          {
            label: "1997", value: 10
          },
          {
            label: "1998", value: 11
          },
          {
            label: "1999", value: 12
          },
          {
            label: "2000", value: 13
          },
          {
            label: "2001", value: 14
          },
          {
            label: "2002", value: 15
          },
        
          {
            label: "2003", value: 16
          },
          {
            label: "2004", value: 17
          },
        
          {
            label: "2005", value: 18
          },
        
          {
            label: "2006", value: 19
          },
        
          {
            label: "2007", value: 20
          },
        
          {
            label: "2008", value: 21
          },
        
          {
            label: "2009", value: 22
          }
      ];
  const [data, setData] = React.useState(BASE_NITRATES)
  const [data2, setData2] = React.useState(INTIAL)
  const [value1, setValue1] = React.useState(0);
  const [value2, setValue2] = React.useState(0);
  const [Indexcrop, setIndexcrop] = React.useState(3);
  const [Weather, setWeather] = React.useState(0);
  const [nitrates, setNitrates] = React.useState(BASE_NITRATES)
  const [Years, setYears]= React.useState(0);
  //const [currentMap, setCurrentMap] = React.useState(map)
  

  const total_area=calculate_area();
  function calculate_area(){
    let total_area=0;
    if (Years== 0){total_area=9582.956007}
    if (Years== 1){total_area=9323.957196}
    if (Years== 2){total_area=6474.970275}
    if (Years== 3){total_area=9064.958385}
    if (Years== 4){total_area=11654.9465}
    if (Years== 5){total_area=10618.95125}
    if (Years== 6){total_area=17352.92034}
    if (Years== 7){total_area=16316.92509}
    if (Years== 8){total_area=17870.91796}
    if (Years== 9){total_area=17611.91915}
    if (Years== 10){total_area=15539.92866}
    if (Years== 11){total_area=12172.94412}
    if (Years== 12){total_area=19683.90964}
    if (Years== 13){total_area=4143.980976}
    if (Years== 14){total_area=20460.90607}
    if (Years== 15){total_area=21755.90012}
    if (Years== 16){total_area=8287.961952}
    if (Years== 17){total_area=14762.93223}
    if (Years== 18){total_area=11654.9465}
    if (Years== 19){total_area=17093.92153}
    if (Years== 20){total_area=20201.90726}
    if (Years== 21){total_area=20460.90607}
    if (Years== 22){total_area=7769.96433}
    return total_area;
  }
  


   console.log('total_area', total_area)

  return (
    <div className="App">

      <img src={frame} alt="main frame" height={720} width={950} />
      <img src={map} alt="main map" height={700} width={700} style={{ position: 'absolute', zIndex: 2, left: 0, top: 20 }} />
     
      {/* <img src={map2transparent} alt="map2transparent" height={700} width={700} style={{opacity: 0.2, position: 'absolute', zIndex: 1, left: 0, top: 20 }} /> */}
      <img src={hypoxic} alt="hypoxic"  width={300 * ((total_area)/24853.2)} style={{ position: 'absolute', zIndex: 6, left: 324, top: 570 }} />
    <div style={{ position: 'absolute', zIndex: 6, left: 323, top: 644 }}>
      <h4>
      |&emsp;&ensp;|&emsp;&ensp;|&emsp;&ensp;|&emsp;&ensp;|&emsp;&ensp;|&emsp;&ensp;|&emsp;&ensp;|&emsp;&ensp;|&emsp;&ensp;|&emsp; &ensp;|
      </h4>
      </div>
      <div style={{ position: 'absolute', zIndex: 6, left: 313, top: 664 }}>
        <h5>
      0 km<sup>2</sup>&emsp; 5,000 &emsp; 10,000&emsp; 15,000 &emsp;20,000 &emsp; 25,000
      </h5>
      </div>
      <div className='text-on-image' style={{ zIndex: 4 }}>
        <h1> THE NITROGEN GAME</h1>
      </div>
      <div className='text-on-image2' style={{ zIndex: 5 }}>
        <p>The Mississippi<br></br> Watershed</p>
      </div>
      <div className='dropdown-text' style={{ zIndex: 10 }}>
        <p><b>WATERSHED</b></p>
      </div>
      <div className='dropdown' style={{ zIndex: 10 }}>
        
        <Chooser mapChoices={mapChoices} mapSelect={mapSelect} setMap={setMap} />
        
      </div>
      <div className='year-text' style={{ zIndex: 10 }}>
        <p><b>Year</b></p>
      </div>
      <div className='year' style={{ zIndex: 10 }}>
        <FormControl sx={{minWidth: 150}}>
          <Select sx={{ maxHeight: '1%' }}
            labelId="Years"
            id="years"
            value={Years}
            displayEmpty
            inputProps={{ 'aria-label': 'Without label' }}
            

            onChange={(e) => setYears(e.target.value)}
          >
            {YEARS.map((item) => {
              return (
                <MenuItem value={item.value} key={item.value}>
                  {item.label}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </div>
    </div>
  );
}


export default Past;
