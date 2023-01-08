import React, { useState,useEffect } from 'react';
import { motion } from 'framer-motion';
import { MdOutlineLightMode } from 'react-icons/md';
import { MdOutlineNightlightRound } from 'react-icons/md';

const Navbar = (props) => {
    const [mode, setMode] = useState(localStorage.getItem("mode"));

    const switchTheme = () => {
        if(localStorage.getItem("mode") === "dark"){
            localStorage.setItem("mode","light");
        }else{
            localStorage.setItem("mode","dark");
        }
        setMode(localStorage.getItem("mode"));
    }

    useEffect(()=>{
        setMode(localStorage.getItem("mode"));
    },[mode]);

    props.data(mode);

    return (
        <nav className={mode == "dark" ? 'text-white flex w-full justify-between items-center py-4 px-8 bg-white/20 backdrop-blur-sm -webkit-backdrop-blur-sm border-2 border-solid border-white/10 z-10':'flex w-full justify-between items-center py-4 px-8 bg-white/20 backdrop-blur-sm -webkit-backdrop-blur-sm border-2 border-solid border-white/10 z-10'}>
            <div className='flex justify-start items-center'>
                {/* <img className='w-full h-10' src={logo} alt="logo" /> */}
                <motion.div whileHover={{ scale: 1.03 }} className='text-4xl font-mono font-extrabold transition-all duration-300 ease-in-out hover:shadow-lg hover:cursor-pointer'>DASHBOARD</motion.div>
            </div>
            {
                mode === "dark" ? 
                    <MdOutlineLightMode onClick={switchTheme} className="text-white cursor-pointer" />
                : 
                    <MdOutlineNightlightRound className='cursor-pointer' onClick={switchTheme}/>
            }
        </nav>
    );
}

export default Navbar;
