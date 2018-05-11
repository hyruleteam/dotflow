import React, { Component } from 'react';
import MainLayout from '../../components/layout/index';
import DefaultRouter from '../../route';
import './App.css';

class Index extends Component {
  render() {
    return (
      <MainLayout>
        <DefaultRouter />
      </MainLayout>
    );
  }
}

export default Index;
