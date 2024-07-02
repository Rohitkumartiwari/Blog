'use client';

import React,{useState} from "react";
import { PageContext } from "./context";
export const Providers=({ children })=> {
    const[search,setSearch]=useState("");
  return (
  
      <PageContext.Provider value={{search,setSearch}}>{children}</PageContext.Provider>
    
  );
}