import frame from './images/frame.png';
import map from './images/map.png';
import map2 from './images/map2.png';
import map2transparent from './images/map2transparent.png';
import hypoxic from './images/hypoxic.png';
import corn from './images/corn.png';
import fillcorn from './images/fillcorn.png';
import './new.css';
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
import {BASE_NITRATES, NITRATES_BY_STATE, INTIAL, WEATHER, OPTIONS} from './constants'

function Sub({mapChoices, setMap, mapSelect}) {
    const names = ["Missouri", "Tennessee", "Arkansas", "Ohio", "Upper_Mississippi", "Lower_Mississippi"]

    const [data2, setData2] = React.useState(INTIAL)
    // add the state here
    // then delete setValuex and valuex
    // the gotot handle change handleChange function to be like handleChangeTennesse
    // then change the updateWaterShed function
    const [values, setValues] = React.useState(
        {"Missouri": 0, "Tennessee" : 0, "Arkansas": 0, "Ohio": 0, "Upper_Mississippi": 0, "Lower_Mississippi": 0})
    
    const [value2Missouri, setValue2Missouri] = React.useState(0);
    const [value2Tennesse, setvalue2Tennessee] = React.useState(0);
    const [value2Arkansas, setValue2Arkansas] = React.useState(0);
    const [value7, setValue7] = React.useState(0);
    const [value2LowerMississippi, setValue2LowerMississippi] = React.useState(0);
    const [value9, setValue9] = React.useState(0);
    const [value2UpperMississippi, setvalue2UpperMississippi] = React.useState(0);
    const [value11, setValue11] = React.useState(0);
    const [value2Ohio, setValue2Ohio] = React.useState(0);
    const [Indexcrop, setIndexcrop] = React.useState(3);
    const [weather, setWeather] = React.useState(0);
    const [nitrates, setNitrates] = React.useState(NITRATES_BY_STATE)
    // const [area, setArea] = React.useState(1)
   
    React.useEffect(() => {
  
      const money = { ...data2 }
      money.Fertilizer_Reduction = calcaulateFertilizerReduction(values.Missouri);
      money.Wetland_Restoration = calculateWetlandRestoration(value2Missouri);
      if (values.Missouri == 0) {
        money.Fertilizer_Reduction = 0;
      }
      if (value2Missouri == 0) {
        money.Wetland_Restoration = 0;
      }
     
      setData2(money);
    }, [Indexcrop])
  
  //  React.useEffect(() => {
  //    updateWaterShed(value1);
  //    updateWaterShed2(value2);
 //   }, [nitrates])
  
    React.useEffect(() => {
       const n2 = { ...nitrates }
       //const money = {...data2}

       for(let i = 0 ; i < names.length ; i++) {
          const state = names[i];
          const result = updateWaterShed(values[state], state);
          n2[state] = result[state]
       }
       setNitrates(n2);
    }, [weather]);

    function updateWeather(value) {
       setWeather(value);
    }
  
    function updateSliderValues(result, state) {
        const n2 = {...nitrates}
        const d = {...data2 }
        n2[state] = result[state]
        setNitrates(n2)
        if(result.Wetland_Restoration !== undefined) {
          d['Wetland_Restoration'] =  result.Wetland_Restoration
        }
        if(result.Fertilizer_Reduction !== undefined) {
          d['Fertilizer_Reduction'] =  result.Fertilizer_Reduction
        }
        setData2(d)
        
    }
    const handleChangeMissouri = (event, newValue) => {
        setValues({...values, "Missouri": newValue});
        updateSliderValues(
            updateWaterShed(newValue, "Missouri"), "Missouri"
        )
    };
  
    const handleChangeMissouri2 = (event, newValue) => {
        setValue2Missouri(newValue);
        updateSliderValues(
          updateWaterShedMissouri2(newValue), "Missouri"
        )
    };
  
    const handleChangeTennessee = (event, newValue) => {
      setValues({...values, "Tennessee": newValue});
      updateSliderValues(
        updateWaterShed(newValue, "Tennessee"), "Tennessee"
      )
    };
  
    
    const handleChangeTennessee2 = (event, newValue) => {
      setvalue2Tennessee(newValue)
      updateSliderValues(
        updateWaterShedTennessee2(newValue), "Tennessee"
      )
  
    };

    const handleChangeArkansas = (event, newValue) => {
      setValues({...values, "Arkansas": newValue});
      updateSliderValues(
        updateWaterShed(newValue, "Arkansas"), "Arkansas"
      )
    };
    const handleChangeArkansas2 = (event, newValue) => {
      setValue2Arkansas(newValue)
      updateSliderValues(
        updateWaterShedArkansas2(newValue), "Arkansas"
      )
    };

    const handleChangeOhio = (event, newValue) => {
      setValues({...values, "Ohio": newValue});
      updateSliderValues(
        updateWaterShed(newValue, "Ohio"), "Ohio"
      )
    };
    const handleChangeOhio2 = (event, newValue) => {
      setValue2Ohio(newValue)
      updateSliderValues(
        updateWaterShedOhio2(newValue), "Ohio"
      )
    };
    const handleChangeUpperMississippi = (event, newValue) => {
      setValues({...values, "Upper_Mississippi": newValue});
      updateSliderValues(
        updateWaterShed(newValue, "Upper_Mississippi"), "Upper_Mississippi"
      )
    };
    const handleChangeUpperMississippi2 = (event, newValue) => {
      setvalue2UpperMississippi(newValue)
      updateSliderValues(
        updateWaterShedUpperMississippi2(newValue), "Upper_Mississippi"
      )
    };
    const handleChangeLowerMississippi = (event, newValue) => {
      setValues({...values, "Lower_Mississippi": newValue});
      updateSliderValues(
        updateWaterShed(newValue, "Lower_Mississippi"), "Lower_Mississippi"
      )
    };
    const handleChangeLowerMississippi2 = (event, newValue) => {
      setValue2LowerMississippi(newValue)
      updateSliderValues(
        updateWaterShedLowerMississippi2(newValue), "Lower_Mississippi"
      )
    };
    function MissouriFactor() {
       //console.log(BASE_NITRATES.Nitrates_Entering_Watershed, weather)
      return 400 * (BASE_NITRATES.Nitrates_Entering_Watershed + weather) / 1000;
    }

    function updateWaterShed(newValue, state) {
        const result = {}
        switch(state) {
          case "Missouri":
              result.Fertilizer_Reduction = calcaulateFertilizerReduction(newValue)*400/1000;
              result.Missouri = Number((((1-(value2Missouri/100))*(1-(newValue/100))* MissouriFactor())*0.45).toFixed(2));
             // console.log('result.Fertilizer_Reduction', result.Fertilizer_Reduction)
              break;
          case "Tennessee":
              result.Fertilizer_Reduction = calcaulateFertilizerReduction(newValue)*10/1000;
              result.Tennessee = Number((((1-(value2Tennesse/100))*(1-(newValue/100))*TennesseeFactor())*1).toFixed(2));
              break;
          case "Arkansas":
              result.Fertilizer_Reduction = calcaulateFertilizerReduction(newValue)*120/1000;
              result.Arkansas = Number((((1-(value2Arkansas/100))*(1-(newValue/100))*ArkansasFactor())*2).toFixed(2));
              break;
          case "Ohio":
              result.Fertilizer_Reduction = calcaulateFertilizerReduction(newValue)*120/1000;
              result.Ohio = Number((((1-(value2Ohio/100))*(1-(newValue/100))*OhioFactor())*1).toFixed(2));
              break;
          case "Upper_Mississippi":
            result.Fertilizer_Reduction = calcaulateFertilizerReduction(newValue)*300/1000;
            result.Upper_Mississippi = Number((((1-(value2UpperMississippi/100))*(1-(newValue/100))*UpperMississippiFactor())*1).toFixed(2));
              break;
          case "Lower_Mississippi":
            result.Fertilizer_Reduction = calcaulateFertilizerReduction(newValue)*50/1000;   
            result.Lower_Mississippi = Number((((1-(value2LowerMississippi/100))*(1-(newValue/100))*LowerMississippiFactor())*3).toFixed(2));
              break;
        }
        //console.log('result.Fertilizer_Reduction', result.Fertilizer_Reduction)
        if (newValue == 0) { result.Fertilizer_Reduction = 0; }
        return result;
    }
    
    function updateWaterShedMissouri2(newValue) {
        const result = {}
        result.Wetland_Restoration = calculateWetlandRestoration(newValue)*400/1000;
        if (newValue == 0) { result.Wetland_Restoration = 0; }
        result.Missouri = Number((((1-(newValue/100))*(1-(values.Missouri/100))* MissouriFactor())*0.45).toFixed(2));
        return result;
    };
    
    
    function updateWaterShedTennessee2(newValue) {
        const result = {}
        result.Wetland_Restoration = calculateWetlandRestoration(newValue)*10/1000;
        if (newValue == 0) { result.Wetland_Restoration = 0; }

        result.Tennessee = Number((((1-(newValue/100))*(1-(values.Tennessee/100))*TennesseeFactor())*1).toFixed(2));
        return result;
    }

    function calcaulateFertilizerReduction(newValue) {
      const initialprice = 68.881 * Math.pow((newValue / 100), 2) + (0.8462 * (newValue / 100)) + 0.1958;
      const cost_of_lot = (initialprice / 100) * 20;
      const Total_Cost = cost_of_lot * Indexcrop;
      return Total_Cost
    }
  
    function updateWaterShedArkansas2(newValue) {
      const result = {}
      result.Wetland_Restoration = calculateWetlandRestoration(newValue)*120/1000;
      if (newValue == 0) { result.Wetland_Restoration = 0; }
      result.Arkansas = Number((((1-(newValue/100))*(1-(values.Arkansas/100))*ArkansasFactor())*2).toFixed(2));
      return result;
    };
    function updateWaterShedOhio2(newValue) {
      const result = {}
      result.Wetland_Restoration = calculateWetlandRestoration(newValue)*120/1000;
      if (newValue == 0) { result.Wetland_Restoration = 0; }

      result.Ohio = Number((((1-(newValue/100))*(1-(values.Ohio/100))*OhioFactor())*1).toFixed(2));
      return result;
  };
  function updateWaterShedUpperMississippi2(newValue) {
    const result = {}
    result.Wetland_Restoration = calculateWetlandRestoration(newValue)*300/1000;
    if (newValue == 0) { result.Wetland_Restoration = 0; }

    result.Upper_Mississippi = Number((((1-(newValue/100))*(1-(values.Upper_Mississippi/100))*UpperMississippiFactor())*1).toFixed(2));
    return result;
};
function updateWaterShedLowerMississippi2(newValue) {
  const result = {}
  result.Wetland_Restoration = calculateWetlandRestoration(newValue)*50/1000;
  if (newValue == 0) { result.Wetland_Restoration = 0; }

  result.Lower_Mississippi = Number((((1-(newValue/100))*(1-(values.Lower_Mississippi/100))*LowerMississippiFactor())*3).toFixed(2));
  return result;
};
  
    function calculateWetlandRestoration(newValue) {
      let cost_of_lot2 = (18.531 * Math.pow((newValue / 100), 2) + (1.8322 * (newValue / 100)) + 0.007) / 5;
      if (newValue==0){cost_of_lot2=0;}
      const Total_Cost2 = (cost_of_lot2 * Indexcrop) + ((newValue / 100) * 20);
      return Total_Cost2
    }

    const total_area=calculate_area();
    function calculate_area(){
      const totalnit=Number(nitrates.Lower_Mississippi)+Number(nitrates.Arkansas)+Number(nitrates.Ohio)+Number(nitrates.Tennessee)+Number(nitrates.Upper_Mississippi)+Number(nitrates.Missouri);
      let total_area=((totalnit-687.34)*20)-5000;
      if (total_area<0){total_area=0;}
      return total_area;
    }
    
    const total_percent_reduction=calculate_reduction_crop_yield();
    function calculate_reduction_crop_yield(){
      let percentMissouri= 68.881 * Math.pow((values.Missouri / 100), 2) + (0.8462 * (values.Missouri / 100)) + 0.1958;
      let percentMissouri2= 18.531 * Math.pow((value2Missouri / 100), 2) + (1.8322 * (value2Missouri / 100)) + 0.007;
      if (values.Missouri == 0){percentMissouri=0}
      if (value2Missouri == 0){percentMissouri2=0}
      const weightMissouri= 100-((100-percentMissouri)*(1-percentMissouri2/100));


      let percentTennessee= 68.881 * Math.pow((values.Tennessee / 100), 2) + (0.8462 * (values.Tennessee / 100)) + 0.1958;
      let percentTennessee2= 18.531 * Math.pow((value2Tennesse / 100), 2) + (1.8322 * (value2Tennesse / 100)) + 0.007;
      if (values.Tennessee == 0){percentTennessee=0}
      if (value2Tennesse == 0){percentTennessee2=0}
      const weightTennessee= 100-((100-percentTennessee)*(1-percentTennessee2/100));


      let percentArkansas= 68.881 * Math.pow((values.Arkansas / 100), 2) + (0.8462 * (values.Arkansas / 100)) + 0.1958;
      let percentArkansas2= 18.531 * Math.pow((value2Arkansas / 100), 2) + (1.8322 * (value2Arkansas / 100)) + 0.007;
      if (values.Arkansas == 0){percentArkansas=0}
      if (value2Arkansas == 0){percentArkansas2=0}
      const weightArkansas= 100-((100-percentArkansas)*(1-percentArkansas2/100));


      let percentLowerMississippi= 68.881 * Math.pow((values.Lower_Mississippi / 100), 2) + (0.8462 * (values.Lower_Mississippi / 100)) + 0.1958;
      let percentLowerMississippi2= 18.531 * Math.pow((value2LowerMississippi / 100), 2) + (1.8322 * (value2LowerMississippi / 100)) + 0.007;
      if (values.Lower_Mississippi == 0){percentLowerMississippi=0}
      if (value2LowerMississippi == 0){percentLowerMississippi2=0}
      const weightLowerMississippi= 100-((100-percentLowerMississippi)*(1-percentLowerMississippi2/100));


      let percentUpperMississippi= 68.881 * Math.pow((values.Upper_Mississippi / 100), 2) + (0.8462 * (values.Upper_Mississippi / 100)) + 0.1958;
      let percentUpperMississippi2= 18.531 * Math.pow((value2UpperMississippi / 100), 2) + (1.8322 * (value2UpperMississippi / 100)) + 0.007;
      if (values.Upper_Mississippi == 0){percentUpperMississippi=0}
      if (value2UpperMississippi == 0){percentUpperMississippi2=0}
      const weightUpperMississippi= 100-((100-percentUpperMississippi)*(1-percentUpperMississippi2/100));


      let percentOhio= 68.881 * Math.pow((values.Ohio / 100), 2) + (0.8462 * (values.Ohio / 100)) + 0.1958;
      let percentOhio2= 18.531 * Math.pow((value2Ohio / 100), 2) + (1.8322 * (value2Ohio / 100)) + 0.007;
      if (values.Ohio == 0){percentOhio=0}
      if (value2Ohio == 0){percentOhio2=0}
      const weightOhio= 100-((100-percentOhio)*(1-percentOhio2/100));
  

      const  total_percent_reduction= (120/1000*weightOhio)+(50/1000*weightLowerMississippi)+(120/1000*weightArkansas)+(10/1000*weightTennessee)+400/1000*weightMissouri+(300/1000*weightUpperMississippi);
    
      return total_percent_reduction;
    }
    //console.log('total_percent_reduction', total_percent_reduction)
    const overlay = { 
        position: 'absolute',
        zIndex: 7, left: 20, top: 320,
        clip : `rect(${361 - (361*total_percent_reduction/100)}px, 320px, 900px, 0px)` 
    }
    
     //console.log('total_area', total_area)

    function UpperMississippiFactor() {
      //console.log(BASE_NITRATES.Nitrates_Entering_Watershed, weather)
     return 300 * (BASE_NITRATES.Nitrates_Entering_Watershed + weather) / 1000;
    }

    function TennesseeFactor() {
      //console.log(BASE_NITRATES.Nitrates_Entering_Watershed, weather)
      return 10 * (BASE_NITRATES.Nitrates_Entering_Watershed + weather) / 1000;
    }
    function OhioFactor() {
      //console.log(BASE_NITRATES.Nitrates_Entering_Watershed, weather)
      return 120 * (BASE_NITRATES.Nitrates_Entering_Watershed + weather) / 1000;
    }
    function ArkansasFactor() {
      //console.log(BASE_NITRATES.Nitrates_Entering_Watershed, weather)
      return 120 * (BASE_NITRATES.Nitrates_Entering_Watershed + weather) / 1000;
    }
    function LowerMississippiFactor() {
      //console.log(BASE_NITRATES.Nitrates_Entering_Watershed, weather)
      return 50 * (BASE_NITRATES.Nitrates_Entering_Watershed + weather) / 1000;
    }

    console.log(data2)
    return (
      <div className="App">
  
        <img src={frame} alt="main frame" height={720} width={950} />
        {/* <img src={map} alt="main map" height={700} width={700} style={{ position: 'absolute', zIndex: 2, left: 0, top: 20 }} /> */}
        <img src={map2} alt="map2" height={700} width={700} style={{ position: 'absolute', zIndex: 2, left: 10, top: 20 }} />
        <img src={map2transparent} alt="map2transparent" height={700} width={700} style={{opacity: 0.5, position: 'absolute', zIndex: 3, left: 10, top: 20 }} />
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
        <div className="percentage" style={{ position: 'absolute', zIndex: 8, left: -100, top: 466 }}>
        <p>|&ensp; &nbsp; |&ensp; &nbsp; |&ensp; &nbsp; |&ensp; &nbsp; |&ensp; &nbsp; |&ensp; &nbsp; |&ensp; &nbsp; |&ensp; &nbsp; |&ensp; &nbsp; |&ensp; &nbsp; |
        </p>
      </div>
      <div className="percentage2" style={{ position: 'absolute', zIndex: 8, left: 40, top: 285 }}>
        <p>100<br></br>90<br></br>80<br></br>70<br></br>60<br></br>50<br></br>40<br></br>30<br></br>20<br></br>10<br></br>0</p>
      </div>
      
        <img src={corn} alt="corn" height={362} width={153} style={{ position: 'absolute', zIndex: 6, left: 20, top: 320 }} />
        <img src={fillcorn} alt="fillcorn" height={362} width={153} style={overlay} />
        <div className='text-on-image' style={{ zIndex: 4 }}>
          <h1> THE NITROGEN GAME</h1>
        </div>
        <div className='text-on-image2' style={{ zIndex: 5 }}>
          <p>The Mississippi<br></br> Watershed</p>
        </div>
        <div className='text-on-image3' style={{ zIndex: 5 }}>
          <p>Missouri</p>
        </div>
        <div className='text-on-image4' style={{ zIndex: 5 }}>
          <p>Upper <br></br> Mississippi</p>
        </div>
        <div className='text-on-image5' style={{ zIndex: 5 }}>
          <p>Ohio</p>
        </div>
        <div className='text-on-image6' style={{ zIndex: 5 }}>
          <p>Tennessee</p>
        </div>
        <div className='text-on-image7' style={{ zIndex: 5 }}>
          <p>Arkansas <br></br> Red-White</p>
        </div>
        <div className='text-on-image8' style={{ zIndex: 5 }}>
          <p>Lower <br></br> Mississippi</p>
        </div>

        <div className='dropdown-text' style={{ zIndex: 10 }}>
          <p><b>WATERSHED</b></p>
        </div>
        <div className='dropdown' style={{ zIndex: 10 }}>
          {/* <select className='dropdown2'>
            <option value="WHOLE">WHOLE</option>
            <option value="SUB_WATERSHEDS">SUB WATERSHEDS</option>
            <option value="PAST_HYPOXIC_ZONES">PAST HYPOXIC ZONES</option>
          </select> */}
         <Chooser mapChoices={mapChoices} mapSelect={mapSelect} setMap={setMap} />
        </div>
        <div className='weather-text' style={{ zIndex: 10 }}>
          <p><b>WEATHER</b></p>
        </div>
        <div className='weather' style={{ zIndex: 10 }}>
          {/* <select className= 'weather2'>
                  <option value="WET_YEAR">WET YEAR</option>
                  <option value="MEDIUM">MEDIUM</option>
                  <option value="DRY_YEAR">DRY YEAR</option>
              </select> */}
          <FormControl sx={{ m: 0.1, minWidth: 80 }}>
            <Select
              labelId="weather"
              id="weather"
              value={weather}
              displayEmpty
              inputProps={{ 'aria-label': 'Without label' }}
              onChange={(e) => updateWeather(e.target.value)}
            >
              {WEATHER.map((item) => {
                return (
                  <MenuItem value={item.value} key={item.value}>
                    {item.label}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </div>
        <div className='crop-text' style={{ zIndex: 10 }}>
          <p><b>CROP PRICE INDEX</b></p>
        </div>
        <div className='crop' style={{ zIndex: 10 }}>
  
          {/* <select className= 'crop2'> */}
          {/* <option value="VERY_LOW">VERY LOW</option>
                  <option value="LOW">LOW</option>
                  <option value="MEDIUM">MEDIUM</option>
                  <option value="HIGH">HIGH</option>
                  <option value="VERY_HIGH">VERY HIGH</option> */}
  
          <FormControl sx={{ m: 0.1, minWidth: 80 }}>
            <Select
              labelId="Indexcrop"
              id="Indexcrop"
              value={Indexcrop}
              displayEmpty
              inputProps={{ 'aria-label': 'Without label' }}
  
              onChange={(e) => setIndexcrop(e.target.value)}
            >
              {OPTIONS.map((item) => {
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
          {/* <div className='filter-range-title'>Fertilization Reduction (%)</div> */}
          {/* <div className='slidercontainer'>
                    <input type="range" min="0" max="100" defaultValue="0" className="slider" step="1" id="myRange1" />
                    <div> <span id="slide1">0</span> </div>
                    <input type="range" min="0" max="100" defaultValue="0" className="slider2" step="1" id="myRange2" />
                    <div> <span id="slide2">0</span> </div>
                  </div> */}
          {/* <div className="filter-range-title2">Wetland Restoration (% area)</div> */}
        </div>
        <div className='bar-y'style={{ zIndex: 18 }}>
              <h5>(thousand <br></br> tonnes)</h5>
          </div>
        <div className='bar3'>
          <BarChart style={{ zIndex: 18 }}
            width={200}
            height={500}
            data={[nitrates]}
            margin={{
              top: 0,
              right: 30,
              left: 20,
              bottom: 5
            }}
          >
            <XAxis dataKey="nitratebar" />
            <YAxis type="number" domain={[0, 2200]} />
            <Tooltip />
            {/* <Legend /> */}
            {/* Tennessee */}
            <Bar dataKey="Tennessee" stackId="a" name="Tennessee" fill="rgb(185,94,61)" />
           {/* Lower Mississippi */}
           <Bar dataKey="Lower_Mississippi" stackId="a" name="Lower Mississippi" fill="rgb(121,123,69)" />
            {/* Arkansas Red-White */}
            <Bar dataKey="Arkansas" stackId="a" name="Arkansas Red-White" fill="rgb(185,80,113)" />
            {/* Ohio */}
            <Bar dataKey="Ohio" stackId="a" name="Ohio" fill="rgb(194,201,43)" />
            {/* Upper Mississippi */}
            <Bar dataKey="Upper_Mississippi" stackId="a" name="Upper Mississippi" fill="rgb(140,99,114)" />
             {/* Missouri */}
             <Bar dataKey="Missouri" stackId="a" name="Missouri" fill="rgb(150,189,150)" />
          </BarChart>
        </div>
        <div className='bar-x'style={{ zIndex: 18 }}>
              <h5>($ billion)</h5>
          </div>
        <div className='bar4'>
          <BarChart style={{ zIndex: 17 }}
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
            <YAxis type="number" domain={[0, 10]} allowDataOverflow={true} />
            <Tooltip />
            {/* <Legend /> */}
            
            <Bar dataKey="Fertilizer_Reduction" stackId="a" name="Fertilizer Reduction"
               fill={ Number(data2.Fertilizer_Reduction) + Number(data2.Wetland_Restoration) >10 ? "red" : "green"} />
            <Bar dataKey="Wetland_Restoration" stackId="a" name="Wetland Restoration"
               fill={ Number(data2.Fertilizer_Reduction) + Number(data2.Wetland_Restoration) >10 ? "red" : "green"}
            />
            
          </BarChart>
        </div>
  
        <div className='sliderMissouri'>
          <Box sx={{ width: 180 }} >
            <Slider style={{ zIndex: 21 }} sx={{
              color: '#000',
              '& .MuiSlider-thumb': {
                backgroundColor: "secondary.light",
                marginTop: "-13px",
              },
              "& .MuiSlider-track": {
                height: 0
              },
            }}
              aria-label="Always visible"
              defaultValue={0}
              onChange={handleChangeMissouri}
              min={0}
              max={100}
              marks
              step={1}
              valueLabelDisplay="auto" />
          </Box>
        </div>
  
        <div className='sliderMissouri2'>
          <Box sx={{ width: 180 }} >
            <Slider style={{ zIndex: 21 }} sx={{
              color: '#000',
              '& .MuiSlider-thumb': {
                backgroundColor: "primary.light",
                marginTop: "13px",
  
              },
              "& .MuiSlider-track": {
                height: 0
  
              },
            }}
              aria-label="Always visible"
              defaultValue={0}
              onChange={handleChangeMissouri2}
              min={0}
              max={100}
              marks
              step={1}
              valueLabelDisplay="auto" />
          </Box>
        </div>
        <div className='sliderUpperMississippi'>
          <Box sx={{ width: 180 }} >
            <Slider style={{ zIndex: 21 }} sx={{
              color: '#000',
              '& .MuiSlider-thumb': {
                backgroundColor: "secondary.light",
                marginTop: "-13px",
              },
              "& .MuiSlider-track": {
                height: 0
              },
            }}
              aria-label="Always visible"
              defaultValue={0}
              onChange={handleChangeUpperMississippi}
              min={0}
              max={100}
              marks
              step={1}
              valueLabelDisplay="auto" />
          </Box>
        </div>
        <div className='sliderUpperMississippi2'>
          <Box sx={{ width: 180 }} >
            <Slider style={{ zIndex: 21 }} sx={{
              color: '#000',
              '& .MuiSlider-thumb': {
                backgroundColor: "primary.light",
                marginTop: "13px",
  
              },
              "& .MuiSlider-track": {
                height: 0
  
              },
            }}
              aria-label="Always visible"
              defaultValue={0}
              onChange={handleChangeUpperMississippi2}
              min={0}
              max={100}
              marks
              step={1}
              valueLabelDisplay="auto" />
          </Box>
        </div>
        <div className='sliderOhio'>
          <Box sx={{ width: 180 }} >
            <Slider style={{ zIndex: 21 }} sx={{
              color: '#000',
              '& .MuiSlider-thumb': {
                backgroundColor: "secondary.light",
                marginTop: "-13px",
              },
              "& .MuiSlider-track": {
                height: 0
              },
            }}
              aria-label="Always visible"
              defaultValue={0}
              onChange={handleChangeOhio}
              min={0}
              max={100}
              marks
              step={1}
              valueLabelDisplay="auto" />
          </Box>
        </div>
        <div className='sliderOhio2'>
          <Box sx={{ width: 180 }} >
            <Slider style={{ zIndex: 21 }} sx={{
              color: '#000',
              '& .MuiSlider-thumb': {
                backgroundColor: "primary.light",
                marginTop: "13px",
  
              },
              "& .MuiSlider-track": {
                height: 0
  
              },
            }}
              aria-label="Always visible"
              defaultValue={0}
              onChange={handleChangeOhio2}
              min={0}
              max={100}
              marks
              step={1}
              valueLabelDisplay="auto" />
          </Box>
        </div>
        <div className='sliderTennessee'>
          <Box sx={{ width: 180 }} >
            <Slider style={{ zIndex: 21 }} sx={{
              color: '#000',
              '& .MuiSlider-thumb': {
                backgroundColor: "secondary.light",
                marginTop: "-13px",
              },
              "& .MuiSlider-track": {
                height: 0
              },
            }}
              aria-label="Always visible"
              defaultValue={0}
              onChange={handleChangeTennessee}
              min={0}
              max={100}
              marks
              step={1}
              valueLabelDisplay="auto" />
          </Box>
        </div>
        <div className='sliderTennessee2'>
          <Box sx={{ width: 180 }} >
            <Slider style={{ zIndex: 21 }} sx={{
              color: '#000',
              '& .MuiSlider-thumb': {
                backgroundColor: "primary.light",
                marginTop: "13px",
  
              },
              "& .MuiSlider-track": {
                height: 0
  
              },
            }}
              aria-label="Always visible"
              defaultValue={0}
              onChange={handleChangeTennessee2}
              min={0}
              max={100}
              marks
              step={1}
              valueLabelDisplay="auto" />
          </Box>
        </div>
        <div className='sliderArkansas'>
          <Box sx={{ width: 180 }} >
            <Slider style={{ zIndex: 21 }} sx={{
              color: '#000',
              '& .MuiSlider-thumb': {
                backgroundColor: "secondary.light",
                marginTop: "-13px",
              },
              "& .MuiSlider-track": {
                height: 0
              },
            }}
              aria-label="Always visible"
              defaultValue={0}
              onChange={handleChangeArkansas}
              min={0}
              max={100}
              marks
              step={1}
              valueLabelDisplay="auto" />
          </Box>
        </div>
        <div className='sliderArkansas2'>
          <Box sx={{ width: 180 }} >
            <Slider style={{ zIndex: 21 }} sx={{
              color: '#000',
              '& .MuiSlider-thumb': {
                backgroundColor: "primary.light",
                marginTop: "13px",
  
              },
              "& .MuiSlider-track": {
                height: 0
  
              },
            }}
              aria-label="Always visible"
              defaultValue={0}
              onChange={handleChangeArkansas2}
              min={0}
              max={100}
              marks
              step={1}
              valueLabelDisplay="auto" />
          </Box>
        </div>
        <div className='sliderLowerMississippi'>
          <Box sx={{ width: 180 }} >
            <Slider style={{ zIndex: 21 }} sx={{
              color: '#000',
              '& .MuiSlider-thumb': {
                backgroundColor: "secondary.light",
                marginTop: "-13px",
              },
              "& .MuiSlider-track": {
                height: 0
              },
            }}
              aria-label="Always visible"
              defaultValue={0}
              onChange={handleChangeLowerMississippi}
              min={0}
              max={100}
              marks
              step={1}
              valueLabelDisplay="auto" />
          </Box>
        </div>
        <div className='sliderLowerMississippi2'>
          <Box sx={{ width: 180 }} >
            <Slider style={{ zIndex: 21 }} sx={{
              color: '#000',
              '& .MuiSlider-thumb': {
                backgroundColor: "primary.light",
                marginTop: "13px",
  
              },
              "& .MuiSlider-track": {
                height: 0
  
              },
            }}
              aria-label="Always visible"
              defaultValue={0}
              onChange={handleChangeLowerMississippi2}
              min={0}
              max={100}
              marks
              step={1}
              valueLabelDisplay="auto" />
          </Box>
        </div>
        
        <div className='corntext' style={{ zIndex: 21 }}>
          <h3>Crop Yield Reduction(%)</h3>
        </div>
      </div>
    );
  }
  
  export default Sub;