import { useState } from 'react'

import './App.css'

function App() {
  const [search,setSearch] = useState("")
  const [data]=useState("")
  const [setOption]=useState("Name")
  const click=async e=>{
    setSearch(e.target.value)
    const options={
      mode: 'no-cors',
      method:"POST",
      headers:{
        'Content-Type':'text/plain',
        Accept:'text/plain'
      },body:search
  }
    const response=await fetch(`http://localhost:3000/users`,options)
    // const data1=await response.text()
    console.log("DF",response)
    // setData(data1)

  }

  return (
    <>
      <div className='app'>
        <select name="options" onChange={e=>{setOption(e.target.value)}}>
          <option value="Name" name="Name">Name</option>
          <option value="Mobile" name="Mobile">Mobile</option>
          <option value="Email" name="Email">Email</option>
        </select>
      <input type="search" onChange={e=>setSearch(e.target.value)} value={search} />
      <button onClick={e=>{click(e)}}>Search</button>
      <div>
        <h1>The fetched Results:</h1>
        <p>{data}</p>
      </div>
      </div>
      
      
    </>
  )
}

export default App
