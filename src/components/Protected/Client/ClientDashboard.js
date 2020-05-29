import React, { useState, useEffect, useContext } from 'react';
import DashboardClass from './DashboardClass';
import { useHistory } from 'react-router-dom';
import { ClassListContext } from '../../../contexts/ClassListContext';
import { axiosWithAuth } from '../../../utils/axiosWithAuth';

const ClientDashboard = props =>{

    const history = useHistory()
    // const [classList, setClassList] = useState([])
    const {classList, setClassList} = useContext(ClassListContext) //TEST

    const fetchClientClassList = ()=>{
        // axiosWithAuth()
        //     .get('/api/auth/users/classes')
        //     .then(res =>{
        //         console.log(res.data)
        //     })
        //     .catch(err =>{
        //         console.log(err)
        //     })
    }

    useEffect(()=>{        
        fetchClientClassList()
    },[])

    const deleteClass = () =>{
        // axiosWithAuth()
        //     .delete()
        //     .then(res =>{
        //         console.log(res.data)
        //     })
        //     .then(// Fetch User's Class List)
        //     .catch(err =>{
        //         console.log(err)
        //     })
    }

    const cancelRegistration = cardInfo =>{
        // DELETE REQ
        deleteClass()
    }
 
    return(
        <div>
            <div onClick={()=>{history.push('/client/class_search')}}>Join a new class</div>
            <div>Registered Class</div>
            {classList.map( eachClass =>{
                return(
                    <DashboardClass key={eachClass.id} cardInfo={eachClass} cancelRegistration={cancelRegistration} setClassList={setClassList}/>
                )
            })}
        </div>
    )
}

export default ClientDashboard