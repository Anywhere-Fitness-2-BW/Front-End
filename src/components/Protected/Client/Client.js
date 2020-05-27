import React, { useState, useContext, useEffect } from 'react';
import { ClassListContext } from '../../../contexts/ClassListContext';
import Class from './Class';

const Client = props =>{

    const initialSearch = {
        location: '',
        type: [],
        date: '',
        time:[],
        duration: [],
        intensity: [],
    }

    const classSearchFilter = {
        location: '',
        type:{
            'yoga': false,
            'weightlifting': false,
            'biking/Spin': false,
            'functional fitness': false,
            'boxing': false,
            'cardio': false,
            'stretch': false,
            'dance': false,
            'running': false,
            'bootcamp': false,
        },
        date:'',
        time:{
            '06:00~10:00': false,
            '10:00~14:00': false,
            '14:00~18:00': false,
            '18:00~22:00': false,
        },
        duration:{
            '0~15 mins': false,
            '15~30 mins': false,
            '30~45 mins': false,
            '45~60 mins': false,
            '60+ mins': false,
        },
        intensity:{
            beginner: false,
            intermediate: false,
            advanced: false,
        },
    }

    const { classList } = useContext(ClassListContext)
    const [searchResults, setSearchResults] = useState(classList)
    const [search, setSearch] = useState(initialSearch)
    const [searchFilter, setSearchFilter] = useState(classSearchFilter)

    useEffect(()=>{
        // display search result
        const searchChange = Object.entries(search).filter( attribute =>{
            const key = attribute[0]
            const value = attribute[1]
            if( key === 'location' || key === 'date'){
                if(value !== initialSearch[key]){
                    return true
                }
            }
            if( key === 'type' || key === 'time' || key === 'duration' || key === 'intensity'){
                if(JSON.stringify(value) !== JSON.stringify(initialSearch[key])){
                    return true
                }
            }
            return false
        })

        const newSearchResults = classList.filter( eachClass =>{
            const result = searchChange.map( attribute =>{
                const key = attribute[0]
                const value = attribute[1]
                if(key === 'location' || key === 'date'){
                    return eachClass[key].includes(value)?  true: false
                }
                if(key === 'type' || key === 'intensity'){
                    for(let i = 0; i < value.length; i++){
                        if(i !== value.length-1){
                            if(eachClass[key].includes(value[i])){
                                continue
                            }else{
                                return false
                            }
                        }else{
                            return eachClass[key].includes(value[i])? true: false
                        }
                    }
                }
                if(key === 'duration'){
                    const duration = parseInt(eachClass[key])
                    for(let i = 0; i < value.length; i++){
                        if(i !== value.length-1){
                            switch(value[i]){
                                case "0~15 mins":
                                    if(0 <= duration && duration < 15){
                                        break
                                    }else{
                                        return false
                                    }
                                case "15~30 mins":
                                    if(15 <= duration && duration < 30){
                                        break
                                    }else{
                                        return false
                                    }
                                case "30~45 mins":
                                    if(30 <= duration && duration < 45){
                                        break
                                    }else{
                                        return false
                                    }
                                case "45~60 mins":
                                    if(45 <= duration && duration < 60){
                                        break
                                    }else{
                                        return false
                                    }
                                case "60+ mins":
                                    if(60 <= duration ){
                                        break
                                    }else{
                                        return false
                                    }
                                default:
                                    return false
                            }
                            continue
                        }else{
                            switch(value[i]){
                                case "0~15 mins":
                                    return 0 <= duration && duration < 15? true:false
                                case "15~30 mins":
                                    return 15 <= duration && duration < 30? true:false
                                case "30~45 mins":
                                    return 30 <= duration && duration < 45? true:false
                                case "45~60 mins":
                                    return 45 <= duration && duration < 60? true: false
                                case "60+ mins":
                                    return 60 <= duration ? true: false
                                default:
                                    return false
                            }
                        }
                    }
                }
                if(key === 'time'){
                    const time = parseInt(eachClass[key].substr(0,2) + eachClass[key].substr(3,5))
                    for(let i = 0; i < value.length; i++){
                        if(i !== value.length-1){
                            switch(value[i]){
                                case "06:00~10:00":
                                    if(600 <= time && time < 1000){
                                        break
                                    }else{
                                        return false
                                    }
                                case "10:00~14:00":
                                    if(1000 <= time && time < 1400){
                                        break
                                    }else{
                                        return false
                                    }
                                case "14:00~18:00":
                                    if(1400 <= time && time < 1800){
                                        break
                                    }else{
                                        return false
                                    }
                                case "18:00~22:00":
                                    if(1800 <= time && time < 2200){
                                        break
                                    }else{
                                        return false
                                    }
                                default:
                                    return false
                            }
                            continue
                        }else{
                            switch(value[i]){
                                case "06:00~10:00":
                                    return 600 <= time && time < 1000? true:false
                                case "10:00~14:00":
                                    return 1000 <= time && time < 1400? true:false
                                case "14:00~18:00":
                                    return 1400 <= time && time < 1800? true:false
                                case "18:00~22:00":
                                    return 1800 <= time && time < 2200? true: false
                                default:
                                    return false
                            }
                        }
                    }
                }
                return null
            })
            console.log(result)
            const isTrue = (currentValue) => currentValue === true;
            if(result.every(isTrue)){
                return eachClass
            }
            return null
        })
        setSearchResults(newSearchResults)
    },[search])

    const handleChange = event =>{

        setSearchFilter({
            ...searchFilter,
            [event.target.name]: event.target.value,
        })
    }
    
    const handleFilterCheckBox = event =>{
        setSearchFilter({
            ...searchFilter,
            [event.target.name]: {
                ...searchFilter[event.target.name],
                [event.target.id]: event.target.checked,
            }
        })
    }

    const handleSubmit = event =>{
        event.preventDefault()
        const newSearch = initialSearch
        Object.entries(searchFilter).forEach( (item, index) =>{
            const filterItem = item[0]
            const filterList = item[1]
            if(filterItem === 'type' || filterItem === 'time' || filterItem === 'duration' || filterItem === 'intensity'){
                Object.keys(filterList).map( item =>{
                    if(searchFilter[filterItem][item]){
                        if(!newSearch[filterItem].includes(item)){
                            newSearch[filterItem].push(item)
                        }
                    }else{
                        newSearch[filterItem] = newSearch[filterItem].filter( arrayItem =>
                            arrayItem !== item   
                        )
                    }
                    return null
                })
            }if(filterItem === 'location' ){
                newSearch[filterItem] = filterList
            }if(filterItem === 'date'){
                let value = filterList
                value = value.substr(5)+"-"+value.substr(0,4)
                newSearch[filterItem] = value
            }
        })
        setSearch(newSearch)
    }

    const toggleAdvancedSearch = () =>{
        const advancedSearch = document.querySelector(".advanced-search")
        advancedSearch.classList.toggle("hidden")
    }

    return(
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    name="location"
                    value={searchFilter.location}
                    type="text"
                    placeholder="Search by Location or Keywords"
                    onChange={handleChange}
                />
                <div onClick={handleSubmit}>Search</div>
            </form>

            <div onClick={toggleAdvancedSearch}>Advanced Search</div>

            <form className="advanced-search hidden" onSubmit={handleSubmit}>

                {/* Class Type */}
                <div>Class Type</div>
                {Object.keys(searchFilter.type).map( (type,index) =>{

                    return(
                        <label key={index}>{type}
                        <input 
                            name="type"
                            id={type}
                            type="checkbox"
                            checked={searchFilter.type[type]}
                            onChange={handleFilterCheckBox}
                        ></input>
                        </label>
                    )
                })}
                
                {/* Class Duration */}
                <div>Class Duration</div>
                {Object.keys(searchFilter.duration).map( (length,index) =>{

                    return(
                        <label key={index}>{length}
                        <input 
                            name="duration"
                            id={length}
                            type="checkbox"
                            checked={searchFilter.duration[length]}
                            onChange={handleFilterCheckBox}
                        ></input>
                        </label>
                    )
                })}

                {/* Class Date */}
                <div>Class Date</div>
                <input
                    name="date"
                    type="date"
                    value={searchFilter.date}
                    onChange={handleChange}
                />

                {/* Class Time */}
                <div>Class Time</div>
                {Object.keys(searchFilter.time).map( (period,index) =>{

                    return(
                        <label key={index}>{period}
                        <input 
                            name="time"
                            id={period}
                            type="checkbox"
                            checked={searchFilter.time[period]}
                            onChange={handleFilterCheckBox}
                        ></input>
                        </label>
                    )
                })}

                {/* Class Intensity */}
                <div>Class Intensity</div>
                {Object.keys(searchFilter.intensity).map( (level,index) =>{

                    return(
                        <label key={index}>{level}
                        <input 
                            name="intensity"
                            id={level}
                            type="checkbox"
                            checked={searchFilter.intensity[level]}
                            onChange={handleFilterCheckBox}
                        ></input>
                        </label>
                    )
                })}

                <div onClick={handleSubmit}>Filter</div>
            </form>
            <div>
                {searchResults.map( eachClass =>{
                    return(
                        <Class key={eachClass.id} info={eachClass} />
                    )
                })}
            </div>
        </div>
    )
}

export default Client;