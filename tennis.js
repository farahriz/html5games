var canvas;
			var canvasContext;
			var ballX = 50;
			var ballY = 50;
			var ballSpeedX = 10;
			var ballSpeedY = 4;

			var paddle1Y = 250;
			var paddle2Y = 250;
			const PADDLE_HEIGHT = 100;
			const PADDLE_WIDTH = 10;

			var player1score = 0;
			var player2score = 0;
			const WINNING_SCORE = 3;

			var showingWinScreen = false;

			function calculateMousePos(evt) {
				var rect = canvas.getBoundingClientRect();
				var root = document.documentElement;
				var mouseX = evt.clientX - rect.left - root.scrollLeft;
				var mouseY = evt.clientY - rect.top - root.scrollTop;
				return {
					x:mouseX,
					y:mouseY
				};
			};

			function handleMouseClick(evt){
				if(showingWinScreen) {
					player1score = 0;
					player2score = 0;
					showingWinScreen = false;
				}
			}

			window.onload = function() {
				canvas = document.getElementById('gameCanvas');
				canvasContext = canvas.getContext('2d');

				var framesPerSecond = 30;
				setInterval(function() {
						moveEverything();
						drawEverything();	
					}, 1000/framesPerSecond);

				canvas.addEventListener('mousedown', handleMouseClick);

				canvas.addEventListener('mousemove',
					function(evt){
						var mousePos = calculateMousePos(evt);
						paddle1Y = mousePos.y-(PADDLE_HEIGHT/2);
					});
			}

			function ballReset() {
				if(player1score>= WINNING_SCORE || 
					player2score>= WINNING_SCORE) {
						showingWinScreen = true;
				}

				ballX=canvas.width/2;
				ballY=canvas.height/2;
				ballSpeedX = -ballSpeedX;
			};

			function computerMovement() {
				var paddle2YCenter = paddle2Y + (PADDLE_HEIGHT/2);


				if(paddle2YCenter < ballY - 35) {
					paddle2Y += 6;
				} else if(paddle2YCenter > ballY+35){
					paddle2Y -= 6;
				}
			};

			function moveEverything() {
				computerMovement();
				ballX = ballX + ballSpeedX;
				ballY = ballY + ballSpeedY;

				// check if ball touches left wall
				if(ballX < 0) {
					// ballSpeedX = -ballSpeedX;
					if(ballY > paddle1Y && 
						ballY < paddle1Y+PADDLE_HEIGHT) {
							ballSpeedX = -ballSpeedX;

							var deltaY = ballY - (paddle1Y+PADDLE_HEIGHT/2);
							ballSpeedY = deltaY * 0.35;
					} else {
						player2score++; //must be before ballReset()
						ballReset();
						
					}	
				};

				// check if ball touches right wall
				if(ballX > canvas.width) {
					// ballSpeedX = -ballSpeedX;
					if(ballY > paddle2Y && 
						ballY < paddle2Y+PADDLE_HEIGHT) {
							ballSpeedX = -ballSpeedX;
							var deltaY = ballY - (paddle2Y+PADDLE_HEIGHT/2);
							ballSpeedY = deltaY * 0.35;
					} else {
						player1score++; //must be before ballReset()
						ballReset();
						
					}	
				};


				if(ballY < 0) {
					ballSpeedY = -ballSpeedY;
				}
				if(ballY > canvas.height) {
					ballSpeedY = -ballSpeedY;
				}
			}

			function drawNet() {
				for (var i = 0; i <canvas.height; i+=40) {
					colorRect(canvas.width/2-1, i, 2, 20, 'white');
				}
			}


			function drawEverything() {
				// next line blanks out background black
				colorRect(0,0,canvas.width,canvas.height, 'black');
				if(showingWinScreen) {
					canvasContext.fillStyle = 'white';
					if(player1score>= WINNING_SCORE) {
						canvasContext.fillText("Left Player Won!", 350, 200)
					} else if(player2score>= WINNING_SCORE){
						canvasContext.fillText("Right Player Won!", 350, 200)
					} 
					canvasContext.fillText("click to continue", 350, 500);
					
				} 
				
				drawNet()

				// draws player paddle
				colorRect(0,paddle1Y, PADDLE_WIDTH, PADDLE_HEIGHT, 'white');
				// draws computer paddle
				colorRect(canvas.width-PADDLE_WIDTH,paddle2Y,PADDLE_WIDTH, PADDLE_HEIGHT, 'white');
				// next line draws ball
				colorCircle(ballX, ballY, 10, 'white');

				canvasContext.fillText(player1score, 100, 100);
				canvasContext.fillText(player2score, canvas.width-100, 100);
			}

			function colorRect(leftX, topY, width, height, drawColor){
				canvasContext.fillStyle = drawColor;
				canvasContext.fillRect(leftX, topY, width, height);
			}

			function colorCircle(centerX, centerY, radius, drawColor) {
				canvasContext.fillStyle = drawColor;
				canvasContext.beginPath();
				canvasContext.arc(centerX,centerY,radius,0, Math.PI*2, true);
				canvasContext.fill();
			}
