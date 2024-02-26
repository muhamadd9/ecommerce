import { createContext, useState } from "react";

export let counterContext = createContext(); 

export default function CounterContextProvider(props){
    const [counter,setCounter]=useState(10);
    function increase(){
        setCounter(Math.random);
    }
    return <counterContext.Provider value={{counter,increase}}>
             {props.children}
            </counterContext.Provider>
}