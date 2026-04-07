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
          <Route path='/' element={<News key="general" pageSize={15} countryName='us' category='general' />} />
          <Route path='/business' element={<News key="business" pageSize={15} countryName='us' category='business' />} />
          <Route path='/entertainment' element={<News key="entertainment" pageSize={15} countryName='us' category='entertainment' />} />
          <Route path='/health' element={<News key="health" pageSize={15} countryName='us' category='health' />} />
          <Route path='/science' element={<News key="science" pageSize={15} countryName='us' category='science' />} />
          <Route path='/sports' element={<News key="sports" pageSize={15} countryName='us' category='sports' />} />
          <Route path='/technology' element={<News key="technology" pageSize={15} countryName='us' category='technology' />} />
        </Routes>

      </Router>
    )
  }
}
