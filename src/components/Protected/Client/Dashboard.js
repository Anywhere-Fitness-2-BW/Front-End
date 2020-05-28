import React, { useState, useEffect, useContext } from 'react';
import DashboardClass from './DashboardClass';
import { useHistory } from 'react-router-dom';
import { ClassListContext } from '../../../contexts/ClassListContext';

const Dashboard = props =>{

    const history = useHistory()
    // const [classList, setClassList] = useState([])
    const {classList, setClassList} = useContext(ClassListContext) //TEST

    // Fetch User's Class List
    useEffect(()=>{

    },[])

    const cancelRegistration = cardInfo =>{
        // DELETE REQ
    }
 
    return(
        <div>
            <div onClick={()=>{history.push('/client/class_search')}}>Join a new class</div>
            <div>Registered Class</div>
            {classList.map( eachClass =>{
                return(
                    <DashboardClass key={eachClass.id} cardInfo={eachClass} cancelRegistration={cancelRegistration}/>
                )
            })}
        </div>
    )
}

export default Dashboard