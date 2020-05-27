import React from 'react';

const Class = props =>{

    const { info } = props

    return(
        <div className="class">
            <p>Name: {info.name}</p>
            <p>Type: {info.type}</p>
            <p>Date: {info.date}</p>
            <p>Start Time: {info.time}</p>
            <p>Duration: {info.duration}</p>
            <p>Intensity: {info.intensity}</p>
            <p>Location: {info.location}</p>
            <p>Number of Registered Attendees: {info.registered}</p>
            <p>Max Number of Attendees: {info.max}</p>
        </div>
    )
}

export default Class;