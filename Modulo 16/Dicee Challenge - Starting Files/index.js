var randomNumber = Math.floor(Math.random() * 6)+1;
var randomNumber2 = Math.floor(Math.random() * 6)+1;
var rutaDado = "";
var rutaDado2 = "";
var mayor=0;
if(randomNumber === 1){
    rutaDado = "images/dice1.png";
}else if(randomNumber === 2){
    rutaDado = "images/dice2.png";
}else if(randomNumber === 3){
    rutaDado = "images/dice3.png";
}else if(randomNumber === 4){
    rutaDado = "images/dice4.png";
}else if(randomNumber === 5){
    rutaDado = "images/dice5.png";
}else if(randomNumber === 6){
    rutaDado = "images/dice6.png";
}

if(randomNumber2 === 1){
    rutaDado2 = "images/dice1.png";
}else if(randomNumber2 === 2){
    rutaDado2 = "images/dice2.png";
}else if(randomNumber2 === 3){
    rutaDado2 = "images/dice3.png";
}else if(randomNumber2 === 4){
    rutaDado2 = "images/dice4.png";
}else if(randomNumber2 === 5){
    rutaDado2 = "images/dice5.png";
}else if(randomNumber2 === 6){
    rutaDado2 = "images/dice6.png";
}
document.querySelector("img").setAttribute("src", rutaDado);
document.querySelectorAll("img")[1].setAttribute("src", rutaDado2);

if(randomNumber > randomNumber2){
    document.querySelector("h1").textContent = "Player 1 Wins!";
}else if (randomNumber < randomNumber2){
    document.querySelector("h1").textContent = "Player 2 Wins!";
}else{
    document.querySelector("h1").textContent = "It's a Draw!";
}


