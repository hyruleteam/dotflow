import React, { Component } from 'react';
import MainLayout from '../layout/MainLayout';

class ProjectList extends Component{
  render() {
    return (
      <MainLayout location={this.props.location}>
        <h3>项目管理</h3>
      </MainLayout>
    )
  }
}

export default ProjectList;