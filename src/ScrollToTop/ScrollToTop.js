import React, { Component } from 'react';
import './ScrollToTop.scss';

class ScrollToTop extends Component {
  constructor(props) {
    super(props);
    this.state = { show: false };
    this.toggleBtn.bind(this);
  }

  componentDidMount() {
    window.addEventListener('scroll', this.toggleBtn);
  }

  toggleBtn = () => {
    this.setState({ show: window.scrollY > 150 }); 
  }

  scroll = () => {
    document.body.scrollTop = 0; 
    document.documentElement.scrollTop = 0;
  }

  render() {
    return (
      <button className={`scroll-to-top ${this.state.show ? 'scroll-to-top_show' : ''}`}
        onClick={() => this.scroll()}>
        <img alt='Back to top' src='/images/up.svg' />
      </button>
    );
  }
}

export default ScrollToTop;