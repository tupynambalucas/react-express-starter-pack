import React, { Component } from 'react';
import './produtos.css';

class Produtos extends Component {
  constructor() {
    super();
    this.state = {
      produtos: []
    };
  }

  componentDidMount() {
    fetch('/produtos')
      .then(res => res.json())
      .then(produtos => this.setState({produtos}, () => console.log('Produtos fetched...', produtos)));
  }

  render() {
    return (
      <div className="produtos">
        {this.state.produtos.map(produtos => 
        <div className="produto" key={produtos._id}>
          <p>
            {produtos.nome}
          </p>
          <p>
            {produtos.descricao}
          </p>
          <p>
            {produtos.preco}
          </p>
        </div>
        )}
      </div>
    );
  }
}

export default Produtos;
