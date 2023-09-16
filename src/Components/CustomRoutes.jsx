import React, {useEffect, useState} from 'react'
import { Routes, useLocation } from 'react-router-dom'
import TopBarProgress from 'react-topbar-progress-indicator'


TopBarProgress.config({
    barColors: {
      "0.25": "#d32f2f",
      // "0.5": "#faaf00",
      // "1.0": "#2e7d32"
    },
    shadowBlur: 5
  });

  
const CustomRoutes = ({children}) => {
    const [progress, setProgress] = useState(false)
    const [prevLoc, setPrevLoc] = useState("")
    const location = useLocation()

    useEffect(() => {
        setPrevLoc(location.pathname)
        setProgress(true)
        if(location.pathname===prevLoc){
            setPrevLoc('')
        }
     }, [location])
  
     useEffect(() => {
        setProgress(false)
     }, [prevLoc])
  return (
    <>
        {progress && <TopBarProgress />}
        <Routes>{children}</Routes>
    </>
  )
}

export default CustomRoutes