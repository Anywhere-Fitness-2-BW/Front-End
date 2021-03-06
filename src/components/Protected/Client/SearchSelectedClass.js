import React, { useContext } from 'react';
import { ClientContext } from '../../../contexts/ClientContext';
import { useHistory } from 'react-router-dom';
import { axiosWithAuth } from '../../../utils/axiosWithAuth';

const SearchSelectedClass = props =>{

    const { push } = useHistory()
    const { selectedClass, setIsSearching } = useContext(ClientContext)

    const goToClassSearch = () =>{
        setIsSearching(true)
        push('/client/class_search')
    }

    const clientAddClass = () =>{
        // axiosWithAuth()
        //     .post()
        //     .then(res =>{
        //         console.log(res.data)
        //     })
        //     .catch(err =>{
        //         console.log(err)
        //     })
    }

    const registerClass = selectedClass =>{
        // POST REQ
        clientAddClass()
    }

    return(
        <div>
            <p>Name: {selectedClass.name}</p>
            <p>Type: {selectedClass.type}</p>
            <p>Date: {selectedClass.date}</p>
            <p>Start Time: {selectedClass.time}</p>
            <p>Duration: {selectedClass.duration}</p>
            <p>Intensity: {selectedClass.intensity}</p>
            <p>Location: {selectedClass.location}</p>
            <p>Number of Registered Attendees: {selectedClass.registered}</p>
            <p>Max Number of Attendees: {selectedClass.max}</p>
            <div onClick={goToClassSearch}>Back to Class Search</div>
            <div onClick={()=>{registerClass(selectedClass)}}>Register</div>
        </div>
    )
}

export default SearchSelectedClass;