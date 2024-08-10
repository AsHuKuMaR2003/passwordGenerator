import { useCallback, useState, useEffect, useRef } from 'react'
import './App.css'

function App() {
  const [length, setlength] = useState(8)
  const [numberallowed,setnumberallowed]= useState(false)
  const [charallowed, setcharallowed]=useState(false)
  const [password, setpassword]= useState("")
  const passwordref= useRef(null)
  const passwordGenerator = useCallback(()=>{
    let pass=""
    let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if(numberallowed) str+="0123456789"
    if(charallowed) str+="*/!@#$^&*()_+{}~`"
    for(let i=1;i<=length;i++){
      let char = Math.floor(Math.random() * str.length+1)
      pass += str.charAt(char)
    }
    setpassword(pass)
    

  }, [length,charallowed,numberallowed,setpassword])
  useEffect(()=>{
    passwordGenerator()
  },[length, numberallowed,charallowed,passwordGenerator])
  const copyPassword = useCallback(()=>{
    passwordref.current?.select()
    window.navigator.clipboard.writeText(password)
  },[password])
  return (
    <>
      <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 text-orange-500 bg-gray-800'>
       <h1 className='text-white text-center my-3'>Password Generator</h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input
          type="text"
          value={password}
          className='outline-none w-full py-1 px-3'
          placeholder='password'
          readOnly
          ref={passwordref}
          />
           <button
           onClick={copyPassword}
           className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0' >copy</button>
        </div>
        <div className='flex text-sm gap-x-2'>
        <div className='flex items-center gap-x-1'>
          <input 
          type='range' 
          min={6}
          max={100}
          value={length}
          className='cursor-pointer'
          onChange={(e)=>{setlength(e.target.value)}}
          />
          <label className='text-white'>length: {length}</label>
        </div>
        <div className='flex items-center gap-x-1'>
            <input
              type="checkbox"
              defaultChecked={numberallowed}
              id="numberinput"
              onChange={()=>{
                setnumberallowed((prev)=>!prev);
              }}/>
              <label className='text-white'>Number</label>
        </div>
        <div className='flex items-center gap-x-1'>
            <input
              type="checkbox"
              defaultChecked={charallowed}
              id="charinput"
              onChange={()=>{
                setcharallowed((prev)=>!prev);
              }}/>
              <label className='text-white'>char</label>
        </div>
      </div>
       
      </div>
      
    </> 
  )
}

export default App
