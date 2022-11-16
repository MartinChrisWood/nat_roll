import React from 'react';
import ReactDOM from 'react-dom/client';
import D2Graphic from './canvas';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
// Todo: update key function to prevent clashes forever
// Add dice Sum functionality (excluding coins?)
// Style the app
// Deploy with Heroku

function randomKey() {
    // For generating unique id's
    return parseInt(Math.random() * 1000000000000000);
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
      diceTotal: 0,
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
    this.setState({tray: tray.concat([dice]), diceTotal: this.sumDice()});
  }

  getDiceIndex(diceKey) {
    for (var i = 0; i < this.state.tray.length; i++) {
        if (this.state.tray[i]['dice_key'] === diceKey) {
            return i;
        };
    };
  }

  sumDice() {
    var diceTotal = 0;
    this.state.tray.forEach((item) => diceTotal = diceTotal + item.dice_roll);
    return diceTotal;
  }

  removeDice(diceKey) {
    // Delete a specific die from the tray
    var i = this.getDiceIndex(diceKey);
    var tray = this.state.tray.slice();

    // remove elements in-place
    tray.splice(i, 1);
    this.setState({tray: tray, diceTotal: this.sumDice()});
  }

  rollOneDice(diceKey) {
    var i = this.getDiceIndex(diceKey);
    var tray = this.state.tray.slice();
    var dice = tray[i];

    // Coin is zero/one, all else are 1/N
    if (dice.dice_sides == 2) {
      dice['dice_roll'] = (Math.floor(Math.random() * dice.dice_sides));
    } else {
      dice['dice_roll'] = (1 + Math.floor(Math.random() * dice.dice_sides));
    };
    tray[i] = dice;
    this.setState({tray: tray, diceTotal: this.sumDice()});
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
        // Coin is zero/one, all else are 1/N
        if (dice.dice_sides == 2) {
          dice['dice_roll'] = (Math.floor(Math.random() * dice.dice_sides));
        } else {
          dice['dice_roll'] = (1 + Math.floor(Math.random() * dice.dice_sides));
        };
        tray[i] = dice;
    }
    this.setState({tray: tray, diceTotal: this.sumDice()});
  }

  render() {
    // Generate dice in tray
    const tray = this.state.tray;
    return (
      <div id="dice_tray">
        <header>
          <h3>Dice Tray: {this.state.diceTotal}</h3>
        </header>
        <section>
          <nav>
            <ul>
              <li><button onClick={() => this.addDice(2)}>Add Coin</button></li>
              <li><button onClick={() => this.addDice(6)}>Add D6</button></li>
              <li><button onClick={() => this.addDice(8)}>Add D8</button></li>
              <li><button onClick={() => this.addDice(10)}>Add D10</button></li>
              <li><button onClick={() => this.addDice(12)}>Add D12</button></li>
              <li><button onClick={() => this.addDice(20)}>Add D20</button></li>
            </ul>
            <ul>
              <li><button onClick={() => this.rollAllDice()}>Roll Dice</button></li>
              <li><button onClick={() => this.setState({tray: [], diceTotal: 0})}>Clear Dice</button></li>
            </ul>
          </nav>
          <article>
            <div id="dice">
              {tray.map((component) => (
              <Dice 
                key={component.dice_key} 
                roll={component.dice_roll}
                sides={component.dice_sides}
                onClick={() => this.handleDiceClick(component.dice_key)}/>))}
            </div>
          </article>
        </section>
      </div>
    );
  }
}

//  {tray.map((component) => (<React.Fragment key={component.dice_key}>{component.dice_roll}</React.Fragment>))}
// Establish render to root
const element = (
<div>
  <DiceTray />
</div>
);

root.render(element);
