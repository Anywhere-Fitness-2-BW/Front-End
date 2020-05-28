import React, { useContext } from 'react';
import { ClientContext } from '../../../contexts/ClientContext';

const SearchBar = props =>{

    const { initialSearch, setIsSearching, setSearch, searchFilter, setSearchFilter } = useContext(ClientContext)
    
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
        setIsSearching(true)
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
        </div>
    )
}

export default SearchBar