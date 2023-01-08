import React, { useState } from 'react';
import LineChart from './LineChart';
import Navbar from './Navbar';
import { FaWind } from 'react-icons/fa';
import BarChart from './BarChart';
import {motion} from 'framer-motion';
import {AiOutlineSmallDash} from 'react-icons/ai';
import {WiSmoke} from 'react-icons/wi';
import {RiCloudWindyFill} from 'react-icons/ri';
// light - https://i.ibb.co/nkSS6zW/light.jpg
// dark - https://i.ibb.co/Ky0FWfc/dark.jpg

const Dashboard = (props) => {
  const [mode,setMode] = useState("");
  const [ws,setWs] = useState(3.6);
  const [d,setD] = useState("");
  const [p1,setP1] = useState();
  const [p2,setP2] = useState();
  const [p10,setP10] = useState();
  let sum = 0;

  // pulling data from BarChart component
  const pull_data = (data) => {
    props.data(data);
    setMode(data);
  }

  const pullWindSpeed = (windS) => {
    setWs(windS);
  }

  const pullWindDate = (windD) => {
    setD(windD);
  }

  const pullWindP1 = (windP1) => {
    setP1(windP1);
  }

  const pullWindP2 = (windP2) => {
    setP2(windP2);
  }

  const pullWindP10 = (windP10) => {
    setP10(windP10);
  }

  return (
    <>
      <Navbar data={pull_data}/>
      <motion.div whileInView={{opacity:[0,1],scale:1,transition:{duration:0.5,ease:'easeInOut'}}} transition={{duration:0.5, type:'tween'}} className={mode === "dark"? 'md:flex md:gap-4 lg:gap-16 xl:gap-20 md:justify-center flex-row h-full m-4 cursor-default text-white' :'md:flex md:gap-4 lg:gap-16 xl:gap-24 md:justify-center flex-row h-full m-4 cursor-default'}>
        <motion.div whileHover={{scale:1.03}} className='bg-white/30 rounded-lg mt-6 transition-all duration-300 ease-in-out shadow-xl hover:shadow-blue-600'>
          <div className='w-full h-[100px] flex justify-between items-center'>
            <div className='pl-4 text-3xl xl:text-4xl font-bold '>{ws}Km/Hr</div>
            <FaWind className='pr-4 w-[20%] h-full flex justify-end items-end' />
          </div>
          <div className='w-full h-[50px] flex justify-between items-center'>
            <div className='w-full h-full text-left pl-4 font-medium'>Avg. Wind Speed</div>
            <div className='w-full h-full text-right pr-4 font-medium'>{d}</div>
          </div>
        </motion.div>
        <motion.div whileHover={{scale:1.03}} className='bg-white/30 rounded-lg mt-6 transition-all duration-300 ease-in-out shadow-xl hover:shadow-blue-600'>
          <div className='w-full h-[100px] flex justify-between items-center'>
            <div className='pl-4 text-4xl lg:text-5xl font-bold '>{p1}%</div>
            <AiOutlineSmallDash className='pr-4 w-[20%] h-full flex justify-end items-end' />
          </div>
          <div className='w-full h-[50px] flex justify-between items-center'>
            <div className='w-full h-full text-left pl-4 font-medium'>Avg. P1 in Air</div>
            <div className='w-full h-full text-right pr-4 font-medium'>{d}</div>
          </div>
        </motion.div>
        <motion.div whileHover={{scale:1.03}} className='bg-white/30 rounded-lg mt-6 transition-all duration-300 ease-in-out shadow-xl hover:shadow-blue-600'>
          <div className='w-full h-[100px] flex justify-between items-center'>
            <div className='pl-4 text-4xl lg:text-5xl font-bold '>{p2}%</div>
            <WiSmoke className='pr-4 w-[20%] h-full flex justify-end items-end' />
          </div>
          <div className='w-full h-[50px] flex justify-between items-center'>
            <div className='w-full h-full text-left pl-4 font-medium'>Avg. P2.5 in Air</div>
            <div className='w-full h-full text-right pr-4 font-medium'>{d}</div>
          </div>
        </motion.div>
        <motion.div whileHover={{scale:1.03}} className='bg-white/30 rounded-lg mt-6 transition-all duration-300 ease-in-out shadow-xl hover:shadow-blue-600'>
          <div className='w-full h-[100px] flex justify-between items-center'>
            <div className='pl-4 text-4xl lg:text-5xl font-bold '>{p10}%</div>
            <RiCloudWindyFill className='pr-4 w-[20%] h-full flex justify-end items-end' />
          </div>
          <div className='w-full h-[50px] flex justify-between items-center'>
            <div className='w-full h-full text-left pl-4 font-medium'>Avg. P10 in Air</div>
            <div className='w-full h-full text-right pr-4 font-medium'>{d}</div>
          </div>
        </motion.div>
      </motion.div>
      <motion.div whileInView={{opacity:[0,1],scale:1,transition:{duration:0.5,ease:'easeInOut'}}} transition={{duration:0.5, type:'tween'}} className='lg:flex flex-row flex-1 justify-center items-center'>
        <div className='lg:flex-col flex-row flex-1 py-8'>
          <BarChart windP1={pullWindP1} windP2={pullWindP2} windP10={pullWindP10} windD={pullWindDate} windS={pullWindSpeed} mode={mode}/>
        </div>
        <div className='lg:flex-col flex-row flex-1 py-8'>
          <LineChart mode={mode}/>
        </div>
      </motion.div>
    </>
  );
}

export default Dashboard;