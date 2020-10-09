import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

class Add extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      disabled: false
    }
  }

  submitHandler(e) {
    e.preventDefault()
    this.setState({ disabled: true })
    let result
    if (this.props.currentbook) {
      result = this.props.client.updatebook(this.props.currentbook.id, e.target.title.value,  e.target.author.value, e.target.read.value ,e.target.uri.value)
      console.log(result)
    } else {
      result = this.props.client.addbook( e.target.title.value,  e.target.author.alue, e.target.read.value,e.target.uri.value)
    }
    result.then(() => {
      this.setState({ disabled: false })
      document.getElementById("bookForm").reset()
      this.props.refreshList()
    })
      .catch(() => {
        alert("an error occured, please try again");
        this.setState({ disabled: false })
      })
  }
  
  render() {
    return (
      <>
        <Form id="bookForm" onSubmit={(e) => this.submitHandler(e)} >

         
            <h5>Title</h5>
            <Form.Control name="title" type="text" defaultValue={this.props.currentbook?.title} disabled={this.state.disabled}  /><br/>
            <h5>Author</h5>
            <Form.Control name="author" type="text" defaultValue={this.props.currentbook?.author} disabled={this.state.disabled}  /><br/>
            <h5>Read/Not Read</h5>
            <Form.Control name="read" type="text" defaultValue={this.props.currentbook?.read} disabled={this.state.disabled}  /><br/>
            <h5>URI</h5>
            <Form.Control name="uri" type="text" defaultValue={this.props.currentbook?.uri} disabled={this.state.disabled}  /><br/>
          <Button variant="primary" type="submit" disabled={this.state.disabled}>
          {this.props.currentbook? "Update" : "Add"  }
  </Button>
  
        </Form>
      </>
    );
  }

}
export default Add;
