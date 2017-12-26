//QUERY SELECTORS

var squares = document.querySelectorAll(".square");
var colorDisplay = document.querySelector("#colorDisplay")
var message = document.querySelector("#message");
var h1 = document.querySelector("h1");
var reset = document.querySelector("#reset");
var easy = document.querySelector("#easy");
var hard = document.querySelector("#hard");

//LOCAL VARS

var difficulty = 6;
var colors = arrGen(difficulty);
var pickedColor = pickColor();
var b = false;

// FUNCTIONS

// generates a random number between 0 and 255
function randomizer(){
	return Math.floor(Math.random() * 256);
}
// generates an output in a form of "rgb(x, y, z)"
function rgbGenerator(){
	return "rgb(" + randomizer() + ", " + randomizer() + ", " + randomizer() + ")";
}

// generates an array of rgb colors with the length defined by diff
function arrGen(diff){
	var arr = [];
	for (i = 0; i < diff; i++){
		arr.push(rgbGenerator());
	}
	return arr;
}

// randomly picks one color from the array of colors mentioned above
function pickColor(){
	return colors[(Math.floor(Math.random() * difficulty))]
}

// changes the color of all squares into one color
function changeColors(color){
	for(i = 0; i < 6; i++){
		squares[i].style.backgroundColor = color;
	}
}

// switches the amount of displayed squares depending on the diff
function displaySwitching(diff){
	if(diff === 3){
		for(i = 3; i < 6; i++){
			squares[i].style.display = "none";
			return;
		}
		if(diff === 6){
			for(i = 3; i < 6; i++){
				squares[i].style.display = "inline-block";
				return;
			}
		}
		console.log("DISPLAY SWITCHING FAILED!!!");
	}

// first colors all squares with random colors, then handles the clicking after 
function clickedColor(){
	for(i = 0; i < squares.length; i++){
		squares[i].style.backgroundColor = colors[i];
		squares[i].addEventListener("click", 
			function(){
				var clickedColor = this.style.backgroundColor;
				if(clickedColor === pickedColor){
					message.textContent = "Correct!";
					changeColors(clickedColor);
					h1.style.backgroundColor = clickedColor;
					reset.textContent = "Try Again?";
				}else{
					this.style.backgroundColor = "#232323";
					message.textContent = "Try Again.";
				}

			});
	}
}

// resets the squares
function resetGame(){
	reset.textContent = "New Colors";
	message.textContent = "";
	h1.style.backgroundColor = "steelblue";
	displaySwitching(difficulty);
	colors = arrGen(difficulty);
	pickedColor = pickColor();
	colorDisplay.textContent = pickedColor.toUpperCase();
	clickedColor();
}


// EXECUTION AND LISTENERS

resetGame();
hard.classList.add("selected");


reset.addEventListener("click", function(){
	resetGame();
});

easy.addEventListener("click", function(){
	difficulty = 3;
	resetGame();
	hard.classList.remove("selected");
	easy.classList.add("selected");
});

hard.addEventListener("click", function(){
	difficulty = 6;
	resetGame();
	easy.classList.remove("selected");
	hard.classList.add("selected");
});
