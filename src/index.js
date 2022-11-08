import React from 'react';
import ReactDOM from 'react-dom/client';
import D6Graphic from './canvas';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));

// N-sided dice
class Dice extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sides: props.sides,
      roll: 0,
    };
    if (props.startRoll) {
      this.rollDice();
    };
  }
  
  // Change dice state at random
  rollDice() {
    this.setState({roll: (1 + Math.floor(Math.random() * this.state.sides))});
  }

  // Creates single isolated canvas for dice
  render() {
    return (
      <div id="dice_image">
        <D6Graphic onClick = {() => this.rollDice()} rollnumber={this.state.roll}/>
      </div>
    );
  }
}


// Tray to hold dice
// class DiceTray extends React.Component {
// }

// Establish render to root
const element = (
<div>
  <h1>Roller</h1>
  <Dice sides = {30}/>
</div>
);

root.render(element);
