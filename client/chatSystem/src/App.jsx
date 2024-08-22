import { useState } from 'react'
import './App.css'
import { io } from 'socket.io-client';
function App() {
  const [message, setMessage] = useState("abcd")
  const [receive,setReceive]=useState([])
  const socket = io("http://localhost:5000");
  // const listener = (...args) => {
  //   console.log(args);
  // }
  const handleClick=()=>{
    socket.emit("username", message);
    socket.on("receive",(name)=>{
      console.log(name);
      setReceive([...receive,name])     
    })
    socket.on("broad",(name)=>{
      console.log(name);
      setReceive([...receive,name])     
    })
    //socket.off("receive", listener);
  }
  return (
    <>
      <div>
        <input type='text' onChange={(e)=>setMessage(e.target.value)} placeholder={message}/>
        <button onClick={handleClick}>Send</button>
          {receive}
        </div>
    </>
  )
}

export default App
