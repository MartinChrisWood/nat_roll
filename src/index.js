import React from 'react';
import ReactDOM from 'react-dom/client';
import D2Graphic from './canvas';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));

// Todo: 2, 4, 6, 8, 10, 12 and 20-sided dice with appropriate graphics render
// Dice must show appropriate shape and different pastel fills to help discern
// Must work as mobile app
// Can I add a mobius die?
// Todo: update key function to prevent clashes forever

function randomKey() {
    // For generating unique id's
    return parseInt(Math.random() * 1000000);
}

// N-sided dice
class Dice extends React.Component {
  // Creates single isolated canvas for dice
  render() {
    return (
        <D2Graphic rollnumber={this.props.roll} sides={this.props.sides}
        onClick={this.props.onClick}/>
    );
  }
}

// Tray to hold dice
class DiceTray extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tray: [],
      timer: null,
    };
  }

  addDice(n_sides) {
    // Add a single dice.  Note copying of array and use of setState to trigger
    // re-rendering
    var tray = this.state.tray.slice();
    var dice = {
        dice_key: randomKey(),
        dice_sides: n_sides,
        dice_roll: 0,
    }
    this.setState({tray: tray.concat([dice])});
  }

  getDiceIndex(diceKey) {
    for (var i = 0; i < this.state.tray.length; i++) {
        if (this.state.tray[i]['dice_key'] === diceKey) {
            return i;
        };
    };
  }

  removeDice(diceKey) {
    // Delete a specific die from the tray
    var i = this.getDiceIndex(diceKey);
    var tray = this.state.tray.slice();

    console.log(i);
    console.log(tray.length);

    // remove elements in-place
    tray.splice(i, 1);
    this.setState({tray: tray});
  }

  rollOneDice(diceKey) {
    var i = this.getDiceIndex(diceKey);
    var tray = this.state.tray.slice();
    var dice = tray[i];
    dice['dice_roll'] = (1 + Math.floor(Math.random() * dice.dice_sides));
    tray[i] = dice;
    this.setState({tray: tray});
  }

  handleDiceClick(diceKey) {
    if (window.event.ctrlKey) {
        this.removeDice(diceKey);
        return;
    }
    this.rollOneDice(diceKey);
  }

  rollAllDice() {
    var tray = this.state.tray.slice();
    for (var i=0; i<tray.length; i++) {
        var dice = tray[i];
        dice['dice_roll'] = (1 + Math.floor(Math.random() * dice.dice_sides));
        tray[i] = dice;
    }
    this.setState({tray: tray});
  }

  render() {
    // Generate dice in tray
    const tray = this.state.tray;
    return (
      <div id="dice_tray">
        <div>
          <h2>Test tray: {this.state.tray.length}.</h2>
          <button onClick={() => this.addDice(2)}>Add Coin</button>
          <button onClick={() => this.addDice(6)}>Add D6</button>
          <button onClick={() => this.addDice(8)}>Add D8</button>
          <button onClick={() => this.addDice(10)}>Add D10</button>
          <button onClick={() => this.addDice(12)}>Add D12</button>
          <button onClick={() => this.addDice(20)}>Add D20</button>
          <button onClick={() => this.rollAllDice()}>Roll Dice</button>
          <button onClick={() => this.setState({tray: []})}>Clear Dice</button>
        </div>
        <div id="dice">
          {tray.map((component) => (
          <Dice 
            key={component.dice_key} 
            roll={component.dice_roll}
            sides={component.dice_sides}
            onClick={() => this.handleDiceClick(component.dice_key)}/>))}
        </div>
      </div>
    );
  }
}

//  {tray.map((component) => (<React.Fragment key={component.dice_key}>{component.dice_roll}</React.Fragment>))}
// Establish render to root
const element = (
<div>
  <h1>Roller</h1>
  <DiceTray />
</div>
);

root.render(element);
