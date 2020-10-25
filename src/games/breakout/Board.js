import React, {useRef, useEffect} from 'react';
import { BallMovement } from './BallMovement';
import Paddle from './Paddle';
import Brick from './Brick';
import PlayerStats from './PlayerStats';
import BrickCollision from "./util/BrickCollision";
import PaddleHit from "./util/PaddleHit";
import AllBroken from "./util/AllBroken";
import ResetBall from "./util/ResetBall";
import WallCollision from "./util/WallCollision";
import data from '../../data';


let bricks = [];
export default function Board()
{

	// alert("Press ok to start game");
	var name= prompt(" Enter name ");


	

	const canvasRef= useRef(null);

	let {ballObj, paddleProps, brickObj,player}= data;

	player.name= name;

	useEffect(()=>{
		
		const render= ()=>{
		const canvas= canvasRef.current;
		const ctx = canvas.getContext('2d');

			// Assign Bricks
      let newBrickSet = Brick(player.level, bricks, canvas, brickObj);

       if (newBrickSet && newBrickSet.length > 0) {
        bricks = newBrickSet;
      }

		paddleProps.y= canvas.height-30;

		ctx.clearRect(0, 0, canvas.width, canvas.height);


      // Display Bricks
      bricks.map((brick) => {
        return brick.draw(ctx);
      });



		//Ball Movement
		BallMovement(ctx, ballObj);


      // Check all broken
      AllBroken(bricks, player, canvas, ballObj);



 	//Wall collision
 	if( ballObj.y + ballObj.rad >= canvas.height ){
 		player.lives--;
 		ballObj.dy *= -1;


 	}
 	if (ballObj.y - ballObj.rad <= 0 ) {
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
          player.score += 10;
        }
      }

      if(player.lives==0){
      	alert("You lost all lives!! Press ok to restart");
      	bricks.length=0;
      	player.lives=5;
      	brickObj.y = 50;
      	ResetBall(ballObj, canvas, paddleProps);

      }

      PlayerStats(ctx,player,canvas);





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
        } width="800" height="500" />;

}
		