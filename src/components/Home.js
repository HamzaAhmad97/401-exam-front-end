import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import CryptoCard from './CryptoCard';
import {withAuth0} from '@auth0/auth0-react';
class Home extends React.Component {
  constructor() {
    super();

    this.state = {
      data: [],
      currentUser: {},
    }
  }

  componentDidMount() {
    let config = {
      method: 'get',
      baseURL: 'http://localhost:3001',
      url: '/crypto'
    }
    axios(config)
      .then(res => {
        console.log(res.data);
        this.setState({ data: res.data })
      })
      .then(res => {
        let config = {
          method: 'get',
          baseURL: 'http://localhost:3001',
          url: '/user',
        }
        axios(config)
        .then(res => {
          if (res.data.filter(itm => itm.email === this.props.auth0.user.email).length === 0) {
            let config = {
              method: 'post',
              baseURL: 'http://localhost:3001',
              url: '/user',
              data: {email: this.props.auth0.user.email, yemail: 'v.salvatore7.gs@gmail.com'}
            }
            axios(config)
            .then(res => {
              console.log(res.data)
              this.setState({currentUser: res.data.filter(itm => itm.email === this.props.auth0.user.email)[0]});
            })
            .then(res => {
              console.log(this.state.currentUser)
            })
          } else {
            let config = {
              method: 'get',
              baseURL: 'http://localhost:3001',
              url: '/user',
            }
            axios(config)
            .then(res => {
              this.setState({currentUser: res.data.filter(itm => itm.email === this.props.auth0.user.email)[0]});
            })
          }
        })
      })
      .catch(err => console.log(err))

  }
  addToWatchList = () => {

  }
  render() {
    return (
      <>
        <h1>Crypto List</h1>

        <div>
          {this.state.data.map((itm, i) => <CryptoCard cardData={itm} key={i} currentUser={this.state.currentUser}/> )}
        </div>
      </>
    )
  }
}

export default withAuth0(Home);
