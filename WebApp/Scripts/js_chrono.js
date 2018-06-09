// JavaScript Document
			
var canvas, clockWidth, centerX, centerY, ctx;
var date = new Date(2018, 10, 10, 0, 0, 13);
var around = 'green';
var inside = '#FFFFFF';

//flagTimer - QUAND IL ARRIVE A 0 C'EST PERDU, VOIR LIGNE 33-34
var flagTimer = 13;

function setupAnalogClock(cw) {

	canvas = document.getElementById("chrono");
	ctx = canvas.getContext("2d");
	clockWidth = cw;
	centerX = canvas.width / 2;
	centerY = canvas.height / 2;

	tick();
	var intervals = window.setInterval(tick, 1000);
	

}


$("#time").click(function ()
{
    resetTimer();
    $("#time").addClass("disabled");

    // clear input when enter
    var input = document.getElementById("answer");
    input.focus();
})


//FONCTION APPELEE CHAQUE SECONDE
function tick() {

    console.log(flagTimer);
    //QUAND C'EST PERDU
    if (flagTimer == 0) {
        endGame();
        document.getElementById("chrono").classList.remove("shaky");
    }

    //CHANGE COULEURS DU CADRAN
	changeColors();
	this.flagTimer--;
	
		
	ctx.clearRect(0,0,canvas.width, canvas.height);
	this.date.setSeconds(date.getSeconds()-1);
	drawStaticElts();

	var seconds = date.getSeconds();
	ctx.strokeStyle = around;
	ctx.lineWidth = 2;
	
	//TANT QU'IL RESTE DES SECONDES, ON FAIT RECULER LA MONTRE
	if (flagTimer>=0) {
			drawHand(clockWidth / 2, seconds * 30);
			ctx.beginPath();
			ctx.moveTo(centerX, centerY);
			ctx.arc(centerX, centerY, clockWidth / 2, 1.5 * Math.PI, ((seconds * 30 + 270) / 180) * Math.PI, false);
			ctx.moveTo(centerX, centerY);

			ctx.strokeStyle = this.outside;
			ctx.lineWidth = 0;
			ctx.stroke();
			ctx.closePath();
			ctx.fillStyle = this.outside;

			ctx.fill();
		}




}

//FCT DE DESSIN
function drawStaticElts() {
	ctx.beginPath();
	ctx.arc(centerX, centerY, clockWidth / 2, 0, 2 * Math.PI, false);
	ctx.strokeStyle = this.around;
	ctx.lineWidth = 5;
	ctx.stroke();
	ctx.closePath();
	ctx.fillStyle = this.inside;

	ctx.fill();	


	ctx.beginPath();
	ctx.arc(centerX, centerY, 2, 0, 2*Math.PI, false);
	ctx.strokeStyle = "black";
	ctx.fill();
	ctx.closePath();
	ctx.fillStyle = this.around;
	ctx.fill();	


	drawNumbers();

}

//DESSINE LES NOMBRES
function drawNumbers() {
	var i = 12;
	ctx.strokeStyle = around;
	ctx.lineWidth = 2;

	while (i>0){
		ctx.save();
		ctx.beginPath();
		ctx.translate(centerX, centerY);
		var angle = (i*30) * Math.PI / 180;
		ctx.rotate(angle);
		ctx.translate(0, -clockWidth / 2);

		ctx.save();
		ctx.translate(0, -10);
		ctx.rotate(-angle);

		/*
		switch (i)
		{
			case 3:
				ctx.font="20px Arial";
				ctx.fillText(i, -2, 1);
				break;
			case 6:
				ctx.font="20px Arial";
				ctx.fillText(i, -5, -20);
				break;
			case 9:
				ctx.font="20px Arial";
				ctx.fillText(i, -6, 2);
				break;


		} */

		ctx.restore();

		ctx.moveTo(0,0);
		ctx.lineTo(0, 10);
		ctx.stroke();
		ctx.closePath();
		ctx.restore();

		i--;
	}
}

//FCT DE DESSIN
function drawHand(length, angle)
{
	ctx.save();
	ctx.beginPath();
	ctx.translate(centerX, centerY);
	ctx.rotate(-180 * Math.PI / 180);
	ctx.rotate(angle * Math.PI / 180);
	ctx.moveTo(0,0);
	ctx.lineTo(0, length);
	ctx.stroke();
	
	ctx.closePath();
	ctx.restore();
	
	
}

window.onload = function() {
	setupAnalogClock(100);
}

//CHANGE LES COULEURS
function changeColors()
{
	if(this.flagTimer < 5 && this.flagTimer >0)
	{
		//shake
		document.getElementById("chrono").classList.add("shaky");
		this.around = "red";
	}
	else if(this.flagTimer < 8 && this.flagTimer >0)
	{	
		this.around = '#ff9933';
	}
	else if(this.flagTimer < 11 && this.flagTimer >0)
	{
		this.around = '#000000'
	}
	else
	{
		document.getElementById("chrono").classList.remove("shaky");
		this.around = 'green';
	}
}


//FONCTION QUI RESET LE TIMER
function resetTimer() {
	this.date = new Date(2018, 10, 10, 00, 00, 13);
	this.flagTimer = 13;
}


//FONCTION QUI AJOUTE 2 SECONDES AU CHRONO (ON UTILISE PAS)
function addTwoSeconds() {
	var secs = this.date.getSeconds()+3;
	if (secs >13)
	{
		this.date.setSeconds(13);
		this.flagTimer = 13;
	}
	else
	{
		this.date.setSeconds(secs);
		this.flagTimer+=3;
	}


}