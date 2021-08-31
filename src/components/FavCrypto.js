import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { withAuth0 } from '@auth0/auth0-react';

class FavCrypto extends React.Component {
  constructor() {
    super();
    this.state = {
      currentUser: {},
    }
  }
  componentDidMount() {
    console.log('hi')
    let config = {
      method: 'get',
      baseURL: 'http://localhost:3001',
      url: '/user',
    }
    axios(config)
      .then(res => {

        this.setState({ currentUser: res.data.filter(itm => itm.email === this.props.auth0.user.email)[0] });
      })
      .then(res => {
        config = {
          method: 'get',
          baseURL: 'http://localhost:3001',
          url: '/crypto',
        }
        axios(config)
        .then(res => {
          console.log(res.data)
          let fav = res.data.filter(itm => this.state.currentUser.watching.includes(itm.id));
          console.log(fav);
        })
      })
  }
  render() {
    return (
      <>
        <h1>Fav Crypto List</h1>
      </>
    )
  }
}

export default withAuth0(FavCrypto);
