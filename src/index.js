import React from 'react';
import ReactDOM from 'react-dom/client';
import D6Graphic from './canvas';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));

// N-sided dice
class Dice extends React.Component {
  // Creates single isolated canvas for dice
  render() {
    return (
        <D6Graphic rollnumber={this.props.roll}
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

  addDice() {
    var tray = this.state.tray.slice();
    var dice = {
        dice_key: tray.length,
        dice_sides: 6,
        dice_roll: 0,
    }
    this.setState({tray: tray.concat([dice])});
  }

  rollOneDice(i) {
    var tray = this.state.tray.slice();
    var dice = tray[i];
    dice['dice_roll'] = (1 + Math.floor(Math.random() * dice.dice_sides));
    tray[i] = dice;
    this.setState({tray: tray});
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
          <button onClick={() => this.addDice()}>Add Dice</button>
          <button onClick={() => this.rollAllDice()}>Roll Dice</button>
          <button onClick={() => this.setState({tray: []})}>Clear Dice</button>
        </div>
        <div id="dice">
          {tray.map((component) => (
          <Dice 
            key={component.dice_key} 
            roll={component.dice_roll}
            onClick={() => this.rollOneDice(component.dice_key)}/>))}
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
