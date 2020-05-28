import React, { useContext } from 'react';
import { ClientContext } from '../../../contexts/ClientContext';

import SearchBar from './SearchBar';
import Search from './Search';
import SearchSelectedClass from './SearchSelectedClass';

const Client = props =>{

    const {isSearching} = useContext(ClientContext)
    
    console.log("CliENT")
    return(
        <div>
            <SearchBar />
            {console.log("RENDER")}
            {isSearching && (
                <Search />
            )}
            {!isSearching && (
                <SearchSelectedClass />
            )}               
        </div>
    )
}

export default Client
