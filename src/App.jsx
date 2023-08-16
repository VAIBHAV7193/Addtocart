import React, { useEffect, useState } from 'react'
import axios from 'axios'

const App = () => {
  const[data,setData] = useState([]);
  const[search,setSearch] = useState();
  const[add,setAdd] = useState([]);
  useEffect(()=>{
    fetch('https://dummyjson.com/products')
    .then(res=>res.json())
    .then(data=> setData(data.products));
  },[])

  console.log(data)
  const clickHandler = (data)=>{
    console.log('clicked')
    setAdd([...add,data])
    localStorage.setItem('product',JSON.stringify(add))
    
  }
  console.log(add)

  const localData = JSON.parse(localStorage.getItem('product'))

  //pricing 
    const Pricing = localData.reduce((x,y)=> x + y.price,0);

    console.log(Pricing)
  
  
  return (

    
    <div>
      <h4>Cart{localData.length}</h4>
      <h4>Pricing: {Pricing}</h4>
      <input type="search"   onChange={(e)=>setSearch(e.target.value)}/>
      {
        data.filter((value)=>{ if(value.title.toLowerCase().includes(search)){
          return true;
        }}).map((value)=> { return(<div key={value.id}><li>{value.title} <button onClick={()=>clickHandler(value)}>Add To cart</button></li></div>)})
      }
    </div>
  )
}

export default App
