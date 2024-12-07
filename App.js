import { useState } from "react"


function App() {

  const [inputValue,setInputValue] = useState('')
  const [spans,setSpans] = useState([])
  const [isAllChecked, setIsAllChecked] = useState(false)
  const [checkedCount,setCheckedCount] = useState(0)
  const [displayMode,setDisplay] = useState('all')
  const handleChange = (event) => {
    setInputValue(event.target.value)
  }
  const handleKeyDown =(e)=>{
    if (e.key === 'Enter') {
      setSpans([...spans,{text: inputValue,checked:false}])
      setInputValue('')
    }
  }
  const handlecheckboxchange = (index)=>{
    const newSpans = spans.map((span,i)=>{
      if (i === index){
        return {...span,checked:!span.checked}
      }
      return span;
    })
    const newCheckedCount = newSpans.filter(span => span.checked).length;
        setSpans(newSpans);
        setCheckedCount(newCheckedCount);
        setIsAllChecked(newCheckedCount === spans.length);
  }
  const deleteSpan = (index)=>{
    const newSpans =spans.filter((_,i)=>i!==index)
    const newCheckedCount = newSpans.filter(span => span.checked).length;
        setSpans(newSpans);
        setCheckedCount(newCheckedCount);
        setIsAllChecked(newCheckedCount === newSpans.length);
  }
  const checkAll =()=>{
    const newIsAllChecked =!isAllChecked;
    const newSpans = spans.map((span) => ({
       ...span,
        checked: newIsAllChecked
    }));
    const newCheckedCount = newIsAllChecked? spans.length : 0;
    setSpans(newSpans);
    setIsAllChecked(newIsAllChecked);
    setCheckedCount(newCheckedCount);
  }
  const showAll = ()=>{
    setDisplay('all')
  }
  const showUnchecked = ()=>{
    setDisplay('unchecked')
  }
  const showChecked = ()=>{
    setDisplay('checked')
  }
  const deleteChecked = ()=>{
    setSpans(spans.filter(span=>!span.checked))
    setCheckedCount(0)
    setIsAllChecked(false);
  }
  let displaySpans = []
  if (displayMode ==='all') {
    displaySpans = spans
  }else if (displayMode ==='unchecked'){
    displaySpans = spans.filter(span =>!span.checked)
  }else if (displayMode ==='checked'){
    displaySpans = spans.filter(span =>span.checked)
  }
    const [focusedCheckboxId, setFocusedCheckboxId] = useState(null);
  
    const handleCheckboxClick = (id) => {
      setFocusedCheckboxId(prevId => prevId === id ? null : id);
    };
  return(
    <div className="todo">
      <div className="head">todos</div>
      


      <div className="body">
        <>
        {spans.length>0 &&(
             <div className="checkall"><button className="checkall-button" onClick={checkAll}>^</button></div>
        )}
        </>

     

          <input type="text"
        value={inputValue} 
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        className="bodytext" 
        placeholder="what need to be done?">
        </input>
        {displaySpans.map((span,index)=>(
          <div key={index} className={`bodylist ${focusedCheckboxId === index ? 'focused' : ''}`}>
              <input type="checkbox" 
              class="custom-checkbox" 
              checked = {span.checked}
              onFocus={() => handleCheckboxClick(index)}
              onBlur={() => handleCheckboxClick(null)}
              onChange={()=>{handlecheckboxchange(index)}
              }></input>
              <span style={span.checked?{textDecoration: 'line-through', color:'#ccc'}:{}}>{span.text}</span>
              <button className="bouttonX" onClick={()=>{
                deleteSpan(index)
              }}>X</button>
            </div>
            
        ))}
            

        
      
        <>
         {spans.length>0 &&(
          
          <div className="bodyend">
            <div><span>{spans.length - checkedCount} items left!</span></div>
            <div className="aac">
            <div><button style={{borderColor:displayMode==="all" && 'red'}} className="accb"  onClick={showAll}>All</button></div>
            <div><button style={{borderColor:displayMode==="unchecked" && 'red'}} className="accb" onClick={showUnchecked}>Active</button></div>
            <div><button style={{borderColor:displayMode==="checked" && 'red'}} className="accb" onClick={showChecked}>Completed</button></div>
            </div>
            <div><button className="accd" onClick={deleteChecked}>Clear completed</button></div>
        </div>
       
         )}
        </>
        
        
      </div>
        
          <>
          {spans.length>0 && (
            <>
            <div className="bodyend1">
            </div>
            <div className="bodyend2">
            </div>
            </>
          )}
          </>

        
       
      


      <div className="end">
        <span>Double-click to edit a todo</span><br/>
        <span>Created by the TodoMVC Team</span><br></br>
        <span>Part of TodoMVC</span>
      </div>
    </div>
    
  )
}
export default App
