import { useState } from 'react'
import './App.css'
import { io } from 'socket.io-client';
function App() {
  const [message, setMessage] = useState("")
  const [receive,setReceive]=useState([])
  const socket = io("http://localhost:5000");
  // const listener = (...args) => {
  //   console.log(args);
  // }
  const handleClick=()=>{
    socket.emit("username", message);
    
    //socket.off("receive", listener);
  }
  socket.on("broad",(name)=>{
    console.log(name);
    
    setReceive(name)     
  })
  socket.on("message",(name)=>{
    console.log("message",name);
    
  })
  return (
    <>
      <div>
        <input type='text' onChange={(e)=>setMessage(e.target.value)} placeholder={message}/>
        <button onClick={handleClick}>Send</button>
        </div>
        <div>
        <ul>
           {receive.map((item,index)=> <li key={index}>{item}</li>)}
           
          </ul>
        </div>
    </>
  )
}

export default App
