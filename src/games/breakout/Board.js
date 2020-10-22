import React, {useRef, useEffect} from 'react';

export default function Board()
{
	const canvasRef= useRef(null);

	useEffect(
		()=>{
		const canvas= canvasRef.current;
		const ctx = canvas.getContext('2d');

		ctx.fillStyle = 'green';
		ctx.fillRect(10, 10, 150, 100);


	}, []);
	return <canvas id="myCanvas" ref= { canvasRef} width="800" height="600" />;

}
		