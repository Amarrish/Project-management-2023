import React, { createContext, useState } from 'react'
export const addprojectResponseContext = createContext();
export const editprojectResponseContext = createContext()
const Contextshare = ({children}) => {
    const [addprojectResponse,setAddprojectResponce] = useState({})
    const [editprojectResponse,setEditProjectResponse] = useState({})
  return (
    <div>
        <addprojectResponseContext.Provider value={{addprojectResponse,setAddprojectResponce}}>
          <editprojectResponseContext.Provider value={{editprojectResponse,setEditProjectResponse}}>
          {children}
          </editprojectResponseContext.Provider>
        </addprojectResponseContext.Provider>
    </div>
  )
}

export default Contextshare