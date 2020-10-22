import React, {useRef, useEffect} from 'react';
import { BallMovement } from './BallMovement';
import Paddle from './Paddle';
import WallCollision from "./util/WallCollision";
import data from '../../data';



export default function Board()
{
	const canvasRef= useRef(null);

	let {ballObj, paddleProps}= data;

	useEffect(()=>{
		
		const render= ()=>{
		const canvas= canvasRef.current;
		const ctx = canvas.getContext('2d');

		

		ctx.clearRect(0, 0, canvas.width, canvas.height);

		BallMovement(ctx, ballObj);

		// WallCollision(ballObj, canvas);

		if (ballObj.y - ballObj.rad <= 0 || ballObj.y + ballObj.rad >= canvas.height ) {
    ballObj.dy *= -1;
  }

  if (ballObj.x + ballObj.rad >= canvas.width || ballObj.x - ballObj.rad <= 0) {
    ballObj.dx *= -1;
  }

    Paddle(ctx, canvas, paddleProps);

	requestAnimationFrame(render);
}

render();
		

	}, []);
	return <canvas id="myCanvas" 
	ref= { canvasRef } 
	onMouseMove={(event) =>
          (paddleProps.x =
            event.clientX -
            (window.innerWidth < 900 ? 10 : (window.innerWidth * 20) / 200) -
            paddleProps.width / 2 -
            10)
        } width="800" height="600" />;

}
		