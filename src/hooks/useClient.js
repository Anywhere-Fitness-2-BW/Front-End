import { useState } from 'react';

export const useClient = () =>{
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
    
    const [isSearching, setIsSearching] = useState(true)
    const [search, setSearch] = useState(initialSearch)
    const [searchResults, setSearchResults] = useState([])
    const [selectedClass, setSelectedClass] = useState({})
    const [searchFilter, setSearchFilter] = useState(classSearchFilter)

    return [initialSearch,
        isSearching, setIsSearching, 
        search, setSearch,
        searchResults, setSearchResults,
        selectedClass, setSelectedClass,
        searchFilter, setSearchFilter,]
}