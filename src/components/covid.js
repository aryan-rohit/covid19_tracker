import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './covid.css'
import exploimage from './images/exploimage.png'
// import Coronaexplo from './images/coronaexplo.jpg'

function CovidTracker() {
  const [data, setStateData] = useState([]);
  const [records, setRecords] = useState([]);
 

  useEffect(() => {
    axios
      .get('https://data.covid19india.org/data.json')
      .then((response) => {
        // console.log(response.data.statewise);
        setStateData(response.data.statewise);
        setRecords(response.data.statewise);
        // console.log(records);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  const filter = (event)=>{
    setRecords(data.filter(f=>f.state.toLowerCase().includes(event.target.value)))
  }

  return (
    <>
    
    <div className='container'>
      <div className='navbar'>
      <h1 className='heading'>COVID-19 TRACKER</h1>
      <h3 className='navcontent'>COVID CASES OF VARIOUS INDIAN STATES</h3>
      <input type="text" className='form-control inputdata' onChange={filter} placeholder='Type the name of State'/>
      </div>
          {records.map(country => (
            <ul className='maincontent'>
            <div className='image'> 
            <img src={exploimage} alt='image' className='headerimage'></img> 
            </div>
            <div className='content'>
            <div className='stateheading'>
            
            {/* <h2 className='country'>STATE</h2> */}
            <h2 className='country '>{country.state}</h2>
            
            </div>
            <div className='statecontent'>
            <div className='cases small'>
                <p className='title'>ACTIVE </p>
                <p className='cases '>{country.active}</p>
            </div>
            <div className='deaths small '>
                <p className='title'>DEATHS</p>
                <p className='deaths'>{country.deaths}</p>
                </div>
                <div className='recovered small '>
                <p className='title'>RECOVERED</p>
                <p className='recovered'>{country.recovered}</p>
                </div>
                </div>

            </div>
            
                
            </ul>
           
          ))}
        
    </div></>
  );
}

export default CovidTracker;

