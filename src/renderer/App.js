import React, { Component } from 'react';
import logo from './logo.svg';
import MainLayout from './components/layout';
import './App.css';

class App extends Component {
  render() {
    return (
      <MainLayout>
        <img src={ logo } alt="" width={200}/>
      </MainLayout>
    );
  }
}

export default App;
