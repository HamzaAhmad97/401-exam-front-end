import axios from 'axios';
import React, { Component } from 'react'
import { Card, Button, Modal } from 'react-bootstrap';

export class CryptoCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cardData: {},
      currentUser: {},
      inWatch: false,
      showForm: false,
    }
  }
  componentDidMount() {
    this.setState({ cardData: this.props.cardData })
  }
  addToWatchList = () => {
    let watching = this.props.currentUser.watching;
    watching.push(this.props.cardData.id)
    let config = {
      method: 'put',
      baseURL: 'http://localhost:3001',
      url: `/user/${this.props.currentUser.email}`,
      data: { watching }
    }
    axios(config)
      .then(res => {
        console.log(res.data);
      })
  }

  updateCrypto = () => {
    this.setState({
      showForm: true,
    })
  }

  deleteCrypto = () => {

  }
  render() {
    return (
      <Card style={{ width: '18rem' }}>
        <Card.Img variant="top" src={this.state.cardData.image_url} />
        <Card.Body>
          <Card.Title>{this.state.cardData.title}</Card.Title>
          <Card.Text>
            {this.state.cardData.description}
          </Card.Text>
          {!this.state.inWatch ? <Button onClick={this.addToWatchList} variant="primary">Add To watch list</Button> : undefined}
          {this.state.inWatch ?
            <>
              <Button onClick={this.updateCrypto}>Update</Button>
              <Button onClick={this.deleteCrypto} >Delete</Button>
            </>
            : undefined}
        </Card.Body>

            {this.state.showForm ? 
        <Modal.Dialog>
          <Modal.Header closeButton>
            <Modal.Title>Modal title</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <p>Modal body text goes here.</p>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary">Close</Button>
            <Button variant="primary">Save changes</Button>
          </Modal.Footer>
        </Modal.Dialog>
        : undefined}
      </Card>
    )
  }
}

export default CryptoCard
