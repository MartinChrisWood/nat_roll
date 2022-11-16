import React, { useRef, useEffect } from 'react';
import { createContext } from 'react';

var diceFontSize = 30;
var diceFont = diceFontSize + "px monospace";

function centerNumber(number, canvasX, canvasY, fontSize) {
    // Find number of digits in the number
    var nDigits = ("" + number).length;
    return {
        xPoint: (canvasX - (nDigits * fontSize / 2)) / 2,
        yPoint: (canvasY + fontSize) / 2.3,
    }
}

// Adapted from https://medium.com/@pdx.lucasm/canvas-with-react-js-32e133c05258
const D2Graphic = props => {
    const canvasRef = useRef(null);

    // Renders a rollnumber fed through props
    const drawD2 = (ctx, canvas) => {
        ctx.canvas.width = 64;
        ctx.canvas.height = 64;
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Render outline
        ctx.fillStyle = 'Gold';
        ctx.beginPath();
        ctx.arc(32, 32, 30, 0, 2 * Math.PI);
        ctx.fill();
        ctx.stroke();

        // Render roll number#
        ctx.fillStyle = 'black';
        ctx.beginPath();
        ctx.font = "20px monospace";

        // Check coin toss
        var flip;
        if (props.rollnumber == 1) {
            flip = "head";
        } else {
            flip = "tail";
        }
        ctx.fillText(flip, 11, 38);
    }

    // Renders a rollnumber fed through props
    const drawD6 = (ctx, canvas) => {
        ctx.canvas.width = 64;
        ctx.canvas.height = 64;
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Render outline
        ctx.fillStyle = 'AliceBlue';
        ctx.beginPath();
        ctx.rect(2, 2, 60, 60);
        ctx.stroke();
        ctx.fill();

        // Render roll number
        ctx.fillStyle = 'black';
        ctx.beginPath();
        ctx.font = diceFont;
        var numCoords = centerNumber(props.rollnumber, ctx.canvas.width, ctx.canvas.height, diceFontSize);
        ctx.fillText(props.rollnumber, numCoords['xPoint'], numCoords['yPoint']);
    }

    // Renders a rollnumber fed through props
    const drawD8 = (ctx, canvas) => {
        ctx.canvas.width = 64;
        ctx.canvas.height = 64;
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Render outline
        ctx.fillStyle = 'DarkSalmon';
        ctx.beginPath();
        ctx.moveTo(0, 32);
        ctx.lineTo(32, 0);
        ctx.lineTo(64, 32);
        ctx.lineTo(32, 64);
        ctx.lineTo(0, 32);
        ctx.stroke();
        ctx.fill();

        // Render roll number#
        ctx.fillStyle = 'black';
        ctx.beginPath();
        ctx.font = diceFont;
        var numCoords = centerNumber(props.rollnumber, ctx.canvas.width, ctx.canvas.height, diceFontSize);
        ctx.fillText(props.rollnumber, numCoords['xPoint'], numCoords['yPoint']);
    }

    // Renders a rollnumber fed through props
    const drawD10 = (ctx, canvas) => {
        ctx.canvas.width = 64;
        ctx.canvas.height = 64;
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Render outline
        ctx.fillStyle = 'Aquamarine';
        ctx.beginPath();
        ctx.moveTo(0, 20);
        ctx.lineTo(32, 0);
        ctx.lineTo(64, 20);
        ctx.lineTo(32, 64);
        ctx.lineTo(0, 20);
        ctx.stroke();
        ctx.fill();

        // Render roll number#
        ctx.fillStyle = 'black';
        ctx.beginPath();
        ctx.font = diceFont;
        var numCoords = centerNumber(props.rollnumber, ctx.canvas.width, ctx.canvas.height, diceFontSize);
        ctx.fillText(props.rollnumber, numCoords['xPoint'], numCoords['yPoint']);
    }

    // Renders a rollnumber fed through props
    const drawD12 = (ctx, canvas) => {
        ctx.canvas.width = 64;
        ctx.canvas.height = 64;
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Render outline
        ctx.fillStyle = 'DarkOrange';
        ctx.beginPath();

        var c1 = Math.cos((2 * Math.PI ) / 5);
        var c2 = Math.cos(Math.PI / 5);
        var s1 = Math.sin((2 * Math.PI) / 5);
        var s2 = Math.sin((4 * Math.PI) / 5);

        ctx.moveTo(32, 0);
        ctx.lineTo(32 + (s1 * 32), c1 * 64);
        ctx.lineTo(32 + (s2 * 32), c2 * 64);
        ctx.lineTo(32 - (s2 * 32), c2 * 64);
        ctx.lineTo(32 - (s1 * 32), c1 * 64);
        ctx.lineTo(32, 0);
        
        ctx.stroke();
        ctx.fill();

        // Render roll number#
        ctx.fillStyle = 'white';
        ctx.beginPath();
        ctx.font = diceFont;
        var numCoords = centerNumber(props.rollnumber, ctx.canvas.width, ctx.canvas.height, diceFontSize);
        ctx.fillText(props.rollnumber, numCoords['xPoint'], numCoords['yPoint']);
    }

    // Renders a rollnumber fed through props
    const drawD20 = (ctx, canvas) => {
        ctx.canvas.width = 64;
        ctx.canvas.height = 64;
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Render outline
        ctx.fillStyle = 'FireBrick';
        ctx.beginPath();

        var hexHeight = 0.875;
        var topY = 32 - (32 * hexHeight);
        var bottomY = 32 + (32 * hexHeight);

        ctx.moveTo(16, topY);
        ctx.lineTo(48, topY);
        ctx.lineTo(64, 32);
        ctx.lineTo(48, bottomY);
        ctx.lineTo(16, bottomY);
        ctx.lineTo(0, 32);
        ctx.lineTo(16, topY);
        ctx.stroke();
        ctx.fill();

        // Render roll number#
        ctx.fillStyle = 'white';
        ctx.beginPath();
        ctx.font = diceFont;
        var numCoords = centerNumber(props.rollnumber, ctx.canvas.width, ctx.canvas.height, diceFontSize);
        ctx.fillText(props.rollnumber, numCoords['xPoint'], numCoords['yPoint']);
    }

    // Determine what dice gets drawn
    var drawFunc;

    if (props.sides == 2) {
        drawFunc = drawD2;
    };
    if (props.sides == 6) {
        drawFunc = drawD6;
    };
    if (props.sides == 8) {
        drawFunc = drawD8;
    };
    if (props.sides == 10) {
        drawFunc = drawD10;
    };
    if (props.sides == 12) {
        drawFunc = drawD12;
    };
    if (props.sides == 20) {
        drawFunc = drawD20;
    } else {
        new Error("Dice size D" + props.sides + " not yet implemented.");
    };

    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas.getContext("2d");
        drawFunc(context, canvas);
    }, [drawFunc]);
    
    return <canvas ref={canvasRef} {...props}/>;
}

export default D2Graphic
