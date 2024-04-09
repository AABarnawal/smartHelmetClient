import React, { useState, useEffect } from 'react';
import boopSfx from './Components/Beep.mp3';
import './App.css';
import axios from 'axios';

// const ButtonBox = {
//     backgroundColor: "#04AA6D",
//     border: "none",
//     color: "white",
//     padding: "15px 32px",
//     textAlign: "center",
//     textDecoration: "none",
//     display: "inline-block",
//     borderRadius : "5px",
//     fontSize: "16px"
// }

const RedBox = {
  color: "white",
  backgroundColor: "red",
  height: "100px",
  width: "100px",
  borderRadius : "50%",
  margin : "5px"
};

const GreenBox = {
  color: "white",
  backgroundColor: "green",
  height: "100px",
  width: "100px",
  borderRadius : "50%",
  margin : "5px"
};
function App() {
  const [flag, setFlag] = useState(0);
  const [data, setData] = useState([]);
    const audioUrl = boopSfx; // Replace with your audio file URL
  
  
  
    const fetchData = async () => {
      const audioElement = new Audio(audioUrl);
      try {
        const response = await fetch('https://smarthelmetserver.onrender.com/api/send',{ method: 'GET', mode: 'no-cors' });
        // const response = await axios.get('https://smarthelmetserver.onrender.com/api/send');
        // const result = response.data; // Axios automatically parses JSON response
        // console.log(result);
        const result = await response.json();
        console.log(result);
        if (!result && flag==0 ) {
          audioElement.play();
          setFlag(1);
        } else if (result && flag==1 ) {
          audioElement.pause();
          audioElement.currentTime = 0;
          setFlag(0);
        }
        setData(result);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    useEffect(() => {
      // Fetch data initially
      fetchData();
  
      // Set up an interval to fetch data every 5 seconds
      const intervalId = setInterval(fetchData, 5000);
  
      // Clean up the interval when the component unmounts
      return () => {
        clearInterval(intervalId);
      };
    }, []); // Empty dependency array ensures this effect runs only once
  


  return (
    <div className="App">
      <h1>Smart Helmet</h1>
      <div style={{margin:'auto', width: '100px'}}>
        {data ? 
        (<div >
          <div className='Green'  style={GreenBox}></div>
          <h3>Good to Go</h3>
        </div>):
        (<div >
          <div className='Red' style={RedBox}></div>
          <h3>Put Your Helmet On</h3>
        </div>)}
      </div>

    </div>
  );
}

export default App;
