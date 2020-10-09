import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import View from './view'

import Icon from "@mdi/react";
import { ApiClient } from './apiClient';
import { mdiBookOpenPageVariant } from '@mdi/js';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      listbooks: []
    }
    this.client = new ApiClient(() => this.state.token, () => this.logout())
  }

  componentDidMount() {
    const listContents = localStorage.getItem("list");
    this.setState(
      { listbooks: JSON.parse(listContents) || [] }
    )
  }


  updateListbooks(id, title, author,read) {
    const listbook = { id, title, author,read }
    this.setState((state) => ({
      listbooks: state.listbooks.concat(listbook)
    }), () => localStorage.setItem("list", JSON.stringify(this.state.listbooks)))
  }

  render() {
    return (
      <>



      <Row>
        <Col sm={2}></Col>
        <Col sm={4}>
       <Icon   path={mdiBookOpenPageVariant} size={5} title="Booklist" color="#007bff" />{'  '}
       </Col>
       <Col>
          <h1 sm={4} > My<span className="color">Book</span>List</h1>
          </Col>
          <Col sm={2}></Col>
          </Row>
          <br/>
          <br/>
     

        <Container>
          <View books={this.state.listbooks} client={this.client} />
        </Container>
      </>
    );
  }

}
export default App;
