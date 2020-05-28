import React from 'react';

const SearchCard = props =>{

    const { cardInfo, toggleSeeMore } = props

    return(
        <div className="class">
            <p>Name: {cardInfo.name}</p>
            <p>Type: {cardInfo.type}</p>
            <p>Date: {cardInfo.date}</p>
            <p>Start Time: {cardInfo.time}</p>
            <p>Duration: {cardInfo.duration}</p>
            <p>Intensity: {cardInfo.intensity}</p>
            <p>Location: {cardInfo.location}</p>
            <p>Number of Registered Attendees: {cardInfo.registered}</p>
            <p>Max Number of Attendees: {cardInfo.max}</p>
            <div onClick={()=>toggleSeeMore(cardInfo)}>See More</div>
        </div>
    )
}

export default SearchCard;