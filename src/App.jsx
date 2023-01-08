import React,{useState} from 'react';
import Dashboard from './components/Dashboard';

const App = () => {

  const [mode,setMode] = useState("");
  const pull_data = (data) => {
    setMode(data);
  }

  return (
    <div className={mode === "dark" ? "bg-[url('https://i.ibb.co/Ky0FWfc/dark.jpg')] bg-cover bg-no-repeat" :"bg-[url('https://i.ibb.co/nkSS6zW/light.jpg')] bg-cover bg-no-repeat"}>
      <Dashboard data={pull_data}/>
    </div>
  );
}

export default App;