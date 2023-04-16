import frame from './images/frame.png';
import map from './images/map.png';
import hypoxic from './images/hypoxic.png';
import corn from './images/corn.png';
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

function App() {
  const options = [
    {
        label: "VERY LOW", value: 3
    },
    {
      label: "LOW", value: 4
    },
    {
      label: "MEDIUM", value: 5
    },
    {
      label: "HIGH", value: 6
    },
    {
      label: "VERY HIGH", value: 7
   }
  ];
  const initial2 = 
    {
      Fertilizer_Reduction: 0,
      Wetland_Restoration: 0,
    }

  const initial = {
      Nitrates_to_Gulf: 1492.66,
      Denitrification: 687.34,
      Nitrates_Entering_Watershed: 2180
  }
  //const [map, setMap] = React.useState(map1)
  const [data, setData] = React.useState(initial)
  const [data2, setData2] = React.useState(initial2)
  const [value1, setValue1] = React.useState(0);
  const [value2, setValue2] = React.useState(0);
  const [Indexcrop, setIndexcrop] = React.useState(3);
  
  React.useEffect(() => {
    console.log(value1, value2);
    const money ={...data2}
    money.Fertilizer_Reduction = calcaulateFertilizerReduction(value1);
    money.Wetland_Restoration = calculateWetlandRestoration(value2);
    if (value1 ==0){
      money.Fertilizer_Reduction=0;
    }
    if (value2 ==0){
      money.Wetland_Restoration=0;
    }

     if (money.Fertilizer_Reduction+money.Wetland_Restoration>10){}
    setData2(money);
  }, [Indexcrop])
  

  // React.useEffect(() => {
  //   console.log(data2.Fertilizer_Reduction)
  // }, [data2]);

  const handleChange = (event, newValue) => {
    const item ={...data}
    const money ={...data2}
    setValue1(newValue);
    // calculates Fertilizer Reduction cost
    
    money.Fertilizer_Reduction = calcaulateFertilizerReduction(newValue)
    console.log(money.Fertilizer_Reduction, "calculated based on ", newValue)
    if (newValue == 0){money.Fertilizer_Reduction = 0;}

    // calculates data for Nitrates_Entering_Watershed
    const nitrate_removed = -867.13*Math.pow((newValue/100), 2)+(1550.8*(newValue/100))+39.93;
  //  console.log('nitrate_removed', nitrate_removed);
  if  (newValue > 0){item.Nitrates_Entering_Watershed = (initial.Nitrates_Entering_Watershed - nitrate_removed).toFixed(2);}
  else if(newValue == 0){item.Nitrates_Entering_Watershed = initial.Nitrates_Entering_Watershed;}
    

    item.Nitrates_to_Gulf = (item.Nitrates_Entering_Watershed - item.Denitrification).toFixed(2);
    console.log('value1 ', newValue)
    setData(item)
    setData2(money)
    console.log(data2.Fertilizer_Reduction)
  };

  function calcaulateFertilizerReduction(newValue) {
    const initialprice = 68.881*Math.pow((newValue/100), 2)+(0.8462*(newValue/100))+0.1958;
    const cost_of_lot=(initialprice/100)*20;
    const Total_Cost=cost_of_lot*Indexcrop;
    return Total_Cost.toFixed(2);
  }

  const handleChange2 = (event, newValue) => {
    setValue2(newValue);
    
    // calculates Wetland Restoration cost
    const item2 ={...data}
    const money2 ={...data2}
    money2.Wetland_Restoration = calculateWetlandRestoration(newValue);
    if (newValue == 0){money2.Wetland_Restoration = 0;}

    //calculates data for Denitrification
    const restore_denitrification= -375.29*Math.pow((newValue/100), 2)+(766.2*(newValue/100))+687.34;
   // console.log('restore_denitrification', restore_denitrification);
    item2.Denitrification = restore_denitrification.toFixed(2);

    item2.Nitrates_to_Gulf = (item2.Nitrates_Entering_Watershed-item2.Denitrification).toFixed(2);

    setData(item2)
    setData2(money2)

  };

  function calculateWetlandRestoration(newValue) {
    const cost_of_lot2 = (18.531*Math.pow((newValue/100), 2)+(1.8322*(newValue/100))+0.007) / 5;
    const Total_Cost2=(cost_of_lot2*Indexcrop)+((newValue/100)*20);
    return  Total_Cost2.toFixed(2)
  }

    // setData((prevData) => {
    //   const newData = [...prevData];
    //   const item = newData[0]
    //   const calculation = Math.abs(newValue-tempValue)*100;
    //   console.log('calculation', calculation);
    //   if (newValue > tempValue) {
    //     //item.Nitrates_Entering_Watershed = item.Nitrates_Entering_Watershed + 100;
    //     item.Nitrates_Entering_Watershed = item.Nitrates_Entering_Watershed + calculation;
    //   } else if (newValue == tempValue){
    //     item.Nitrates_Entering_Watershed = item.Nitrates_Entering_Watershed;
    //   }
    //   else {
    //     item.Nitrates_Entering_Watershed = item.Nitrates_Entering_Watershed - calculation;
    //   }
    //   setTempValue(newValue);
    //  return newData;
    // });
  
  /*var slider1 = document.getElementById("myRange1");
  var output1 = document.getElementById("slide1");
  output1.innerHTML = slider1.value;
  
  slider1.oninput = function() {
    output1.innerHTML = this.value;
  }*/
 
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
            <div className='text-on-image' style={{zIndex:4}}>
             <h1> THE NITROGEN GAME</h1>
            </div>
            <div className='text-on-image2' style={{zIndex:5}}>
             <p>The Mississippi<br></br> Watershed</p>
          </div>
          <div className='dropdown-text'style={{zIndex:10}}>
            <p><b>WATERSHED</b></p>
          </div>
          <div className='dropdown' style={{zIndex:10}}> 
            <select className= 'dropdown2'>
                <option value="WHOLE">WHOLE</option>
                <option value="SUB_WATERSHEDS">SUB WATERSHEDS</option>
                <option value="PAST_HYPOXIC_ZONES">PAST HYPOXIC ZONES</option>
            </select>
          </div>
          <div className='weather-text'style={{zIndex:10}}>
            <p><b>WEATHER</b></p>
          </div>
          <div className='weather' style={{zIndex:10}}> 
            <select className= 'weather2'>
                <option value="WET_YEAR">WET YEAR</option>
                <option value="MEDIUM">MEDIUM</option>
                <option value="DRY_YEAR">DRY YEAR</option>
            </select>
          </div>
          <div className='crop-text'style={{zIndex:10}}>
            <p><b>CROP PRICE INDEX</b></p>
          </div>
          <div className='crop' style={{zIndex:10}}> 
            
            {/* <select className= 'crop2'> */}
                {/* <option value="VERY_LOW">VERY LOW</option>
                <option value="LOW">LOW</option>
                <option value="MEDIUM">MEDIUM</option>
                <option value="HIGH">HIGH</option>
                <option value="VERY_HIGH">VERY HIGH</option> */}
                
      <FormControl sx={{ m: 0.5, minWidth: 80 }}>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={Indexcrop}
          label="Indexcrop"
          
          onChange={(e) => setIndexcrop(e.target.value)}
        >
          {options.map((item) => {
            return (
              <MenuItem value={item.value} key={item.value}>
                {item.label}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    
            {/* </select> */}
            
          </div>
            <div className='filter-range'>
              <div className='filter-range-title'>Fertilization Reduction (%)</div>
                {/* <div className='slidercontainer'>
                  <input type="range" min="0" max="100" defaultValue="0" className="slider" step="1" id="myRange1" />
                  <div> <span id="slide1">0</span> </div>
                  <input type="range" min="0" max="100" defaultValue="0" className="slider2" step="1" id="myRange2" />
                  <div> <span id="slide2">0</span> </div>
                </div> */}
                <div className="filter-range-title2">Wetland Restoration (% area)</div>
              </div>
              
              <div className='bar'>
                  <BarChart style={{zIndex:18}}
                    width={200}
                    height={500}
                    data={[data]}
                    margin={{
                      top: 0,
                      right: 30,
                      left: 20,
                      bottom: 5
                    }}
                  >
                    
                    <XAxis dataKey="nitratebar" />
                    <YAxis type="number" domain={[0, 5000]}/>
                    <Tooltip />
                    {/* <Legend /> */}
                    <Bar dataKey="Nitrates_Entering_Watershed" stackId="a" name="Nitrates Entering Watershed" fill="#8884d8" />
                    <Bar dataKey="Denitrification" stackId="a" name="Denitrification" fill="#82ca9d" />
                    <Bar dataKey="Nitrates_to_Gulf" stackId="a" name="Nitrates to Gulf" fill="purple" />
                  </BarChart>
            </div>
    <div className='bar2'>
          <BarChart style={{zIndex:17}}
            width={150}
            height={500}
            data={[data2]}
            margin={{
              top: 0,
              right: 30,
              left: 20,
              bottom: 5
            }}
          >
            
            <XAxis dataKey="moneybar" />
            <YAxis type="number" domain={[0, 10]} allowDataOverflow={true}/>
            <Tooltip />
            {/* <Legend /> */}
            <Bar dataKey="Fertilizer_Reduction" stackId="a" name="Fertilizer Reduction" fill="green" />
            <Bar dataKey="Wetland_Restoration" stackId="a" name="Wetland Restoration"fill="green" />
            {/* <Bar dataKey="Wetland_Restoration+Fertilizer_Reduction" stackId="a" name="Total"fill="red" /> */}
            
        </BarChart>
    </div>

    <div className='slider1'>
      <Box sx={{ width: 300 }} >
          <Slider style={{zIndex:21}} sx={{color: '#000', 
                  '& .MuiSlider-thumb': {
                backgroundColor: "secondary.light",
                marginTop: "-13px",
              },
              "& .MuiSlider-track": {
                height:0
              },
            }}
          aria-label="Always visible"
          defaultValue={0}
          onChange={handleChange}
          min={0}
          max={100}
          marks
          step={1}
          valueLabelDisplay="auto" />
      </Box>
    </div>

    <div className='slider2'>
        <Box sx={{ width: 300 }} >
            <Slider style={{zIndex:21}} sx={{ color: '#000' , 
                  '& .MuiSlider-thumb': {
                backgroundColor: "primary.light",
                marginTop: "13px",

              },
              "& .MuiSlider-track": {
                height:0
                  
              },
            }}
            aria-label="Always visible"
            defaultValue={0}
            onChange={handleChange2}
            min={0}
            max={100}
            marks
            step={1}
            valueLabelDisplay="auto" />
        </Box>
    </div>
         </div>
  );
}

console.log('version 2')

export default App;
