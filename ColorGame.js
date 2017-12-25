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

// random number between 0 and 255
function randomizer(){
	return Math.floor(Math.random() * 256);
}
// generates an output in a form of "rgb(x, y, z)"
function rgbGenerator(){
	return "rgb(" + randomizer() + ", " + randomizer() + ", " + randomizer() + ")";
}

// generates an array of rgb colors with the size defined by broj
function arrGen(broj){
	var arr = [];
	for (i = 0; i < broj; i++){
		arr.push(rgbGenerator());
	}
	return arr;
}


// randomly picks one color from the array of colors mentioned above
function pickColor(){
	var rand = Math.floor(Math.random() * difficulty);
	return colors[rand];
}

// changes the background of the difficulty number of squares
function changeColors(color){

	for(i = 0; i < difficulty; i++){
		squares[i].style.backgroundColor = color;
	}
}

function resetG(broj){
	reset.textContent = "New Colors";
	message.textContent = "";
	h1.style.backgroundColor = "steelblue";
	
	console.log("diff is: " + difficulty);
	if(broj === 1 && difficulty == 3){
		for(i = 3; i < 6; i++){
			squares[i].style.display = "none";
		}
	}else{
		for(i = 3; i < 6; i++){
			squares[i].style.display = "inline-block";
		}
	}

	colors = arrGen(difficulty);
	pickedColor = pickColor();
	colorDisplay.textContent = pickedColor.toUpperCase();
	for(i = 0; i < squares.length; i++){
		squares[i].style.backgroundColor = colors[i];
		squares[i].addEventListener("click", function(){
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

//EXECUTION

resetG(0);
hard.classList.add("selected");


reset.addEventListener("click", function(){
	console.log(difficulty);
	resetG(0);
});

easy.addEventListener("click", function(){
	difficulty = 3;
	resetG(1);
	hard.classList.remove("selected");
	easy.classList.add("selected");
});

hard.addEventListener("click", function(){
	difficulty = 6;
	resetG(0);
	easy.classList.remove("selected");
	hard.classList.add("selected");
});
