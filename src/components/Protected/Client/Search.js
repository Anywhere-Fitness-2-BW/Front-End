import React, {  useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import { ClientContext } from '../../../contexts/ClientContext';
import { ClassListContext } from '../../../contexts/ClassListContext';

import { axiosWithAuth } from '../../../utils/axiosWithAuth';

import SearchCard from './SearchCard';

const Search= props =>{

    const { push } = useHistory()
    const { classList, setClassList } = useContext(ClassListContext)
    const { initialSearch, setIsSearching, search, searchResults, setSearchResults, setSelectedClass } = useContext(ClientContext)

    const fetchClientClassList = ()=>{
        axiosWithAuth()
            .get('/api/auth/users/classes')
            .then(res =>{
                console.log(res.data)
                // const newClassList = res.data.data
                // console.log(res.data.data)
                setClassList(res.data.data)
            })
            .catch(err =>{
                console.log(err)
            })
    }

    useEffect(()=>{
        fetchClientClassList()
    },[])
    
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
            const isTrue = (currentValue) => currentValue === true;
            if(result.every(isTrue)){
                return eachClass
            }
            return null
        })
        setSearchResults(newSearchResults)
    },[search, classList])

    const toggleSeeMore = info =>{
        setIsSearching(false)
        setSelectedClass(info)
        push(`/client/class/${info.id}`)
    }

    return(
        <div>
            <div>
                {searchResults.map( eachClass =>{
                    return(
                        <SearchCard key={eachClass.id} cardInfo={eachClass} toggleSeeMore={toggleSeeMore}/>
                    )
                })}
            </div>
        </div>
    )
}

export default Search;