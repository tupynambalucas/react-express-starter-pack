import React, { Component } from 'react';
import './header.css';

class Header extends Component {
  constructor() {
    super();
    this.state = {
    //   produtos: []
    };
  }

  componentDidMount() {
    // fetch('/produtos')
    //   .then(res => res.json())
    //   .then(produtos => this.setState({produtos}, () => console.log('Produtos fetched...', produtos)));
  }

  render() {
    return (
        <header className="header"></header>
    );
  }
}

export default Header;
