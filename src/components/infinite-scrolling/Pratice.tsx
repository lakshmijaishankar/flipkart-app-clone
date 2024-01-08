import { Component } from "react";


type PraticeState = {
  incrementCount: number;
  decrementCount: number;
};

class Pratice extends Component<any, PraticeState> {
  handleIncrement = () => {
    this.setState((preCount) => {
      return {
        incrementCount: preCount.incrementCount + 1,
      };
    });
  };

  handleDecrement = () => {
    this.setState((preCount) => {
      return {
        decrementCount: preCount.decrementCount - 1,
      };
    });
  };

  render() {
    const { incrementCount, decrementCount } = this.state;
    return (
      <section className="practice-component">
        <button
          type="button"
          aria-label="increment-btn"
          onClick={this.handleDecrement}
        >
          <span>{incrementCount}</span>
        </button>
        <button
          type="button"
          aria-label="decrement-btn"
          onClick={this.handleDecrement}
        >
          <span>{decrementCount}</span>
        </button>
      </section>
    );
  }
}

export default Pratice;
