import React, { useContext } from 'react';
import { ClientContext } from '../../../contexts/ClientContext';

import SearchBar from './SearchBar';
import Search from './Search';
import SearchSelectedClass from './SearchSelectedClass';

const Client = props =>{

    const {isSearching} = useContext(ClientContext)
    
    return(
        <div>
            <SearchBar />
            
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
