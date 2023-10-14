import React, { Component } from 'react';
import './Calculator.css';

class Calculator extends Component {
  constructor() {
    super();
    this.state = {
      display: '0',
      currentInput: '',
      previousInput: '',
      operator: '',
    };
  }

  handleNumberClick = (num) => {
    if (this.state.operator) {
      this.setState({
        display: num,
        currentInput: num,
        operator: '',
      });
    } else {
      this.setState((prevState) => ({
        display: prevState.display === '0' ? num : prevState.display + num,
        currentInput: prevState.display === '0' ? num : prevState.currentInput + num,
      }));
    }
  };

  handleOperatorClick = (operator) => {
    if (this.state.currentInput && !this.state.operator) {
      this.setState({
        operator,
        previousInput: this.state.currentInput,
        currentInput: '',
      });
    }
  };

  handleEqualsClick = () => {
    if (this.state.currentInput && this.state.operator) {
      const result = this.calculateResult();
      this.setState({
        display: result,
        currentInput: result,
        previousInput: '',
        operator: '',
      });
    }
  };

  calculateResult = () => {
    const num1 = parseFloat(this.state.previousInput);
    const num2 = parseFloat(this.state.currentInput);
    switch (this.state.operator) {
      case '+':
        return (num1 + num2).toString();
      case '-':
        return (num1 - num2).toString();
      case '*':
        return (num1 * num2).toString();
      case '/':
        if (num2 === 0) {
          return 'Error'; // Handle division by zero
        }
        return (num1 / num2).toString();
      default:
        return this.state.currentInput;
    }
  };

  handleClearClick = () => {
    this.setState({
      display: '0',
      currentInput: '',
      previousInput: '',
      operator: '',
    });
  };

  render() {
    return (
      <div className="calculator">
        <div className="display">{this.state.display}</div>
        <div className="buttons">
          <button onClick={() => this.handleNumberClick('7')}>7</button>
          <button onClick={() => this.handleNumberClick('8')}>8</button>
          <button onClick={() => this.handleNumberClick('9')}>9</button>
          <button onClick={() => this.handleOperatorClick('+')}>+</button>
          <button onClick={() => this.handleNumberClick('4')}>4</button>
          <button onClick={() => this.handleNumberClick('5')}>5</button>
          <button onClick={() => this.handleNumberClick('6')}>6</button>
          <button onClick={() => this.handleOperatorClick('-')}>-</button>
          <button onClick={() => this.handleNumberClick('1')}>1</button>
          <button onClick={() => this.handleNumberClick('2')}>2</button>
          <button onClick={() => this.handleNumberClick('3')}>3</button>
          <button onClick={() => this.handleOperatorClick('*')}>*</button>
          <button onClick={() => this.handleNumberClick('0')}>0</button>
          <button onClick={this.handleClearClick}>C</button>
          <button onClick={this.handleEqualsClick}>=</button>
          <button onClick={() => this.handleOperatorClick('/')}>/</button>
        </div>
      </div>
    );
  }
}

export default Calculator;
