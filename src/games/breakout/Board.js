import React, {useRef, useEffect} from 'react';
import { BallMovement } from './BallMovement';
import Paddle from './Paddle';
import Brick from './Brick';
import BrickCollision from "./util/BrickCollision";
import PaddleHit from "./util/PaddleHit";
import WallCollision from "./util/WallCollision";
import data from '../../data';


let bricks = [];
export default function Board()
{

	

	const canvasRef= useRef(null);

	let {ballObj, paddleProps, brickObj}= data;

	useEffect(()=>{
		
		const render= ()=>{
		const canvas= canvasRef.current;
		const ctx = canvas.getContext('2d');

			// Assign Bricks
      let newBrickSet = Brick(2, bricks, canvas, brickObj);

       if (newBrickSet && newBrickSet.length > 0) {
        bricks = newBrickSet;
      }
      
paddleProps.y= canvas.height-30;

		ctx.clearRect(0, 0, canvas.width, canvas.height);


      // Display Bricks
      bricks.map((brick) => {
        return brick.draw(ctx);
      });



		BallMovement(ctx, ballObj);

		// WallCollision(ballObj, canvas);

		if (ballObj.y - ballObj.rad <= 0 || ballObj.y + ballObj.rad >= canvas.height ) {
    ballObj.dy *= -1;
  }

  if (ballObj.x + ballObj.rad >= canvas.width || ballObj.x - ballObj.rad <= 0) {
    ballObj.dx *= -1;
  }


  // Brick Collision
      let brickCollision;

      for (let i = 0; i < bricks.length; i++) {
        brickCollision = BrickCollision(ballObj, bricks[i]);

        if (brickCollision.hit && !bricks[i].broke) {
          console.log(brickCollision);
          if (brickCollision.axis === "X") {
            ballObj.dx *= -1;
            bricks[i].broke = true;
          }
          else if (brickCollision.axis === "Y") {
            ballObj.dy *= -1;
            bricks[i].broke = true;
          }
          // player.score += 10;
        }
      }





    Paddle(ctx, canvas, paddleProps);


//Paddle Collision
      PaddleHit(ballObj, paddleProps);


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
		