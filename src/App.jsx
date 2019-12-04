import React, { Component } from "react";
import "./App.css";
import { Button } from "./components/Button";
import { Input } from "./components/Input";
import { ClearButton } from "./components/ClearButton";
import * as math from "mathjs";

class App extends Component {
  state = {
    input: ""
  };

  addToInput = async val => {
    const { input } = this.state;

    let copyInput = String(input);
    let lastChar = copyInput.slice(-1);

    if ((val === "*" || val === "/") && input.length < 1) {
      return await this.setState({ input: "" });
    }
    if (
      (lastChar === "+" ||
        lastChar === "-" ||
        lastChar === "*" ||
        lastChar === "/" ||
        lastChar === ".") &&
      (val === "+" || val === "-" || val === "*" || val === "/" || val === ".")
    ) {
      let sliceStr = input.slice(0, -1);

      return await this.setState({ input: sliceStr + val });
    }

    await this.setState({ input: input + val });
  };

  handleEqual = async => {
    const { input } = this.state;

    let copyInput = String(input);
    const lastInput = copyInput.slice(-1);

    if (
      lastInput === "+" ||
      lastInput === "-" ||
      lastInput === "*" ||
      lastInput === "/"
    ) {
      return this.setState({ input: input.slice(0, -1) });
    }
    this.setState({ input: math.eval(input) });
  };

  handleReset = () => {
    this.setState({ input: "" });
  };

  render() {
    return (
      <div className="app">
        <div className="calc-wrapper">
          <Input input={this.state.input} />

          <div className="row">
            <Button handleClick={this.addToInput}>7</Button>
            <Button handleClick={this.addToInput}>8</Button>
            <Button handleClick={this.addToInput}>9</Button>
            <Button handleClick={this.addToInput}>/</Button>
          </div>

          <div className="row">
            <Button handleClick={this.addToInput}>4</Button>
            <Button handleClick={this.addToInput}>5</Button>
            <Button handleClick={this.addToInput}>6</Button>
            <Button handleClick={this.addToInput}>*</Button>
          </div>

          <div className="row">
            <Button handleClick={this.addToInput}>1</Button>
            <Button handleClick={this.addToInput}>2</Button>
            <Button handleClick={this.addToInput}>3</Button>
            <Button handleClick={this.addToInput}>+</Button>
          </div>

          <div className="row">
            <Button handleClick={this.addToInput}>.</Button>
            <Button handleClick={this.addToInput}>0</Button>
            <Button handleClick={this.handleEqual}>=</Button>
            <Button handleClick={this.addToInput}>-</Button>
          </div>

          <div className="row ">
            <ClearButton handleClear={this.handleReset}>Clear</ClearButton>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
