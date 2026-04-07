import Navbar from './Components/Navbar';
import News from './Components/News';
import React, { Component } from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

export default class App extends Component {

  render() {
    return (
      <Router>
        <Navbar />

        <Routes>
          <Route exact path='/' element={<News key="general" pageSize={15} countryName='us' category='general' />} />
          <Route exact path='/business' element={<News key="buisness" pageSize={15} countryName='us' category='business' />} />
          <Route exact path='/entertainment' element={<News key="entertainment" pageSize={15} countryName='us' category='entertainment' />} />
          <Route exact path='/health' element={<News key="health" pageSize={15} countryName='us' category='health' />} />
          <Route exact path='/science' element={<News key="science" pageSize={15} countryName='us' category='science' />} />
          <Route exact path='/sports' element={<News key="sports" pageSize={15} countryName='us' category='sports' />} />
          <Route exact path='/technology' element={<News key="technology" pageSize={15} countryName='us' category='technology' />} />
        </Routes>

      </Router>
    )
  }
}
