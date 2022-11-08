import React, { useRef, useEffect } from 'react';

// Adapted from https://medium.com/@pdx.lucasm/canvas-with-react-js-32e133c05258
const D6Graphic = props => {
    const canvasRef = useRef(null);

    // Renders a rollnumber fed through props
    const draw = (ctx, canvas) => {
        ctx.canvas.width = 64;
        ctx.canvas.height = 64;
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Render outline
        ctx.fillStyle = 'black';
        ctx.beginPath();
        ctx.rect(1, 1, 62, 62);
        ctx.stroke();

        // Render roll number#
        ctx.fillStyle = 'blue';
        ctx.beginPath();
        ctx.font = "48px Arial";
        ctx.fillText(props.rollnumber, 16, 48);
    }

    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas.getContext("2d");
        draw(context, canvas);
    }, [draw]);
    
    return <canvas ref={canvasRef} {...props}/>;
}

export default D6Graphic
