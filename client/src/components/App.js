import React, { Component } from 'react';
import axios from 'axios';
import Carousel from './Carousel';
import Footer from './Footer';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      productId: 0, // If category id = 0; return all products
      counter: 0,
      productsAll: '',
      productsFive: '',
      productsNumber: '',
    };
    this.getProducts = this.getProducts.bind(this);
    this.getFive = this.getFive.bind(this);
    this.nextFive = this.nextFive.bind(this);
    this.lastFive = this.lastFive.bind(this);
    this.resetProducts = this.resetProducts.bind(this);
  }

  // Sets Inital products & sets click listener
  componentDidMount() {
    window.addEventListener('click', (event) => {
      console.log('Click listener triggered');
      if (event.target.getAttribute('data-id') && event.target.getAttribute('data-id') !== this.state.productId) {
        this.setState({ productId: event.target.getAttribute('data-id') }, () => {
          console.log(`state.productId = ${this.state.productId}`);
          this.state.counter = 0;
          this.getProducts();
        });
      }
    });
    this.getProducts();
  }

  // Retrieves 5 products from productsAll (results of getProducts db query) and assigns them to productsFive
  getFive() {
    const getFive = this.state.productsAll.slice(this.state.counter, this.state.counter + 5);
    this.setState({ productsFive: getFive } /*, () => { console.log('getFive =', this.state.productsFive); }*/);
  }

  // Gets all products in db that match category of product @ productId (0 being all) and assigns them to productsAll
  getProducts() {
    axios.get(`/getProducts/${this.state.productId}`)
      .then((response) => {
        this.setState({ productsAll: response.data });
      })
      .then(() => {
        this.state.productsNumber = this.state.productsAll.length;
        this.getFive();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  // Increments state.counter and loads next 5 items when right button clicked
  nextFive() {
    let nextCounter = 0;
    if (!(this.state.counter + 5 >= this.state.productsNumber)) {
      nextCounter = this.state.counter + 5;
    }
    this.setState({ counter: nextCounter }, () => { this.getFive(); });
  }

  // Decrements state.counter and loads last 5 items when left button clicked
  lastFive() {
    let lastCounter = 0;
    if (this.state.counter - 5 < 0) {
      if (this.state.productsNumber % 5 === 0) {
        lastCounter = this.state.productsNumber - 5;
      } else {
        lastCounter = this.state.productsNumber - (this.state.productsNumber % 5);
      }
    } else {
      lastCounter = this.state.counter - 5;
    }
    this.setState({ counter: lastCounter }, () => { this.getFive(); });
  }

  // Displays all products again after selecting a category *** Turn off in production ***
  resetProducts() {
    this.setState({ productId: 0, counter: 0 }, () => {
      this.getProducts();
    });
  }

  render() {
    return (
      <div className="carousel-parentContainer">
        <Carousel
          productsFive={this.state.productsFive}
          nextFive={this.nextFive}
          lastFive={this.lastFive}
          counter={this.state.counter}
          productsNumber={this.state.productsNumber}
        />
        <button onClick={this.resetProducts} type="button">See All Products</button>
        <Footer />
      </div>
    );
  }
}
