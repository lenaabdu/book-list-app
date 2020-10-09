import React from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import './App.css';
import Add from './add'

class View extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      books: [],
      currentbook: undefined
    }
  }

  refreshList() {
    this.props.client.getbooks()
      .then((response) => this.setState({ books: response.data }))
  }

  removebook(id) {
    this.props.client.removebook(id)
      .then(this.refreshList())
  }

  updatebook(book) {
    this.setState({ currentbook: book })
  }

  componentDidMount() {
    this.refreshList()
  }

  buildRows() {
    return this.state.books.map((current) => {
      return (<tr key={current.id}>
        <td> {current.id}</td>
        <td>{current.title}</td>
        <td>{current.author}</td>
        <td>{current.read? "Read":"Not read"}</td>
     <td> <a href="url">{current.uri}</a></td>  


        
        <td>
          <Button className='mr-2 mb-2' onClick={() => this.updatebook(current)}> update</Button>
          <Button className='mb-2'variant="danger" onClick={() => this.removebook(current.id)}> remove</Button>
        </td>
      </tr>)
    })
  }

  render() {
    return (
      <>
        <Add client={this.props.client} refreshList={() => {
          this.refreshList()
          this.setState({
            currentbook: undefined
          })
        }}
          currentbook={this.state.currentbook} />
        <br /><hr /><br />
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Author</th>
              <th>Read/NOT</th>
              <th>Book Link</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {this.buildRows()}
          </tbody>
        </Table>
      </>
    );
  }
}

export default View;
