import Navbar from './Components/Navbar';
import News from './Components/News';
import React, { Component } from 'react'

export default class App extends Component {
  c = "Kirten";
  render() {
    return (
      <div>
        <Navbar />
        <News />
      </div>
    )
  }
}
