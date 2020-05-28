import React, { useState } from "react";
import { BrowserRouter as Router, Route } from 'react-router-dom';

import { ClassListContext } from './contexts/ClassListContext';
import { NavContext } from './contexts/NavContext';
import { ClientContext } from './contexts/ClientContext'

import PrivateRoute from './components/Protected/PrivateRoute';

import Home from './components/Home';
import Login from './components/Login';
import Navigation from './components/Navigation';
import Instructor from './components//Protected/Instructor/Instructor';
import Client from "./components/Protected/Client/Client";
import Dashboard from "./components/Protected/Client/Dashboard";

import { useClient } from './hooks/useClient';


const sampleClassList = [
  {
    id: 0,
    name: 'class 0',
    coursDetails:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras quis orci varius sem euismod gravida. Nulla ac diam eu urna suscipit ultricies. Nullam mi mauris, blandit non enim nec, pulvinar vulputate tellus. Cras bibendum justo in tincidunt euismod. Duis a velit gravida, vehicula ex nec, ultrices nulla.',
    instructor: 'instructor 0',
    type: 'yoga',
    date: '01-20-2020',
    time: '10:00',
    duration: '30',
    intensity: 'beginner',
    location:'1 street, Seattle, WA',
    registered: 0,
    max: 20,
  },
  {
    id: 1,
    name: 'class 1',
    coursDetails:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras quis orci varius sem euismod gravida. Nulla ac diam eu urna suscipit ultricies. Nullam mi mauris, blandit non enim nec, pulvinar vulputate tellus. Cras bibendum justo in tincidunt euismod. Duis a velit gravida, vehicula ex nec, ultrices nulla.',
    instructor: 'instructor 1',
    type: 'boxing',
    date: '01-23-2020',
    time: '12:00',
    duration: '30',
    intensity: 'intermediate',
    location:'2 street, Seattle, WA',
    registered: 5,
    max: 15,
  },
  {
    id: 2,
    name: 'class 2',
    coursDetails:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras quis orci varius sem euismod gravida. Nulla ac diam eu urna suscipit ultricies. Nullam mi mauris, blandit non enim nec, pulvinar vulputate tellus. Cras bibendum justo in tincidunt euismod. Duis a velit gravida, vehicula ex nec, ultrices nulla.',
    instructor: 'instructor 2',
    type: 'cardio',
    date: '05-25-2020',
    time: '10:00',
    duration: '30',
    intensity: 'advanced',
    location:'3 street, Portland, OR',
    registered: 5,
    max: 15,
  },
  {
    id: 3,
    name: 'class 3',
    coursDetails:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras quis orci varius sem euismod gravida. Nulla ac diam eu urna suscipit ultricies. Nullam mi mauris, blandit non enim nec, pulvinar vulputate tellus. Cras bibendum justo in tincidunt euismod. Duis a velit gravida, vehicula ex nec, ultrices nulla.',
    instructor: 'instructor 3',
    type: 'boxing',
    date: '05-23-2020',
    time: '18:00',
    duration: '30',
    intensity: 'advanced',
    location:'53 street, Portland, OR',
    registered: 5,
    max: 15,
  },
  {
    id: 4,
    name: 'class 4',
    coursDetails:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras quis orci varius sem euismod gravida. Nulla ac diam eu urna suscipit ultricies. Nullam mi mauris, blandit non enim nec, pulvinar vulputate tellus. Cras bibendum justo in tincidunt euismod. Duis a velit gravida, vehicula ex nec, ultrices nulla.',
    instructor: 'instructor 4',
    type: 'dance',
    date: '05-23-2020',
    time: '18:00',
    duration: '15',
    intensity: 'beginner',
    location:'23 street, Los Angeles, CA',
    registered: 2,
    max: 5,
  },

]

function App() {

  const [classList, setClassList] = useState(sampleClassList)

  // Login
  const [isClient, setIsClient] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const [initialSearch,
    isSearching, setIsSearching, 
    search, setSearch,
    searchResults, setSearchResults,
    selectedClass, setSelectedClass,
    searchFilter, setSearchFilter] = useClient()
  

  return (
    <div className="App">
      <ClassListContext.Provider value={{classList, setClassList, isClient, setIsClient,}}>
        <Router>

          <NavContext.Provider value={{isLoggedIn, setIsLoggedIn, isClient, setIsClient}} >
            <Navigation />
              <Route path="/login">
                <Login /> {/* Dummy Login page, replace with REACT I's Login*/}
              </Route>
          </NavContext.Provider>

          <ClientContext.Provider value={{
                initialSearch,
                isSearching, setIsSearching, 
                search, setSearch,
                searchResults, setSearchResults,
                selectedClass, setSelectedClass,
                searchFilter, setSearchFilter,
                }}>

                <PrivateRoute exact path="/client/class_search" component={Client} />
                <PrivateRoute exact path="/client/class/:id" component={Client} />
                <PrivateRoute exact path="/client/dashboard" component={Dashboard} />
                
          </ClientContext.Provider>
            
          <PrivateRoute path="/instructor" component={Instructor} />

          <Route exact path="/">
            <Home />
          </Route>
          
        </Router>      
      </ClassListContext.Provider>
    </div>
  );
}

export default App;
