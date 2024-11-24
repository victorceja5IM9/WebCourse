var numberButtons = document.querySelectorAll(".drum");
for(var i=0; i<numberButtons.length; ++i){
    numberButtons[i].addEventListener("click", function () {
        /*var audio = new Audio("sounds/tom-1.mp3");
        audio.play();*/
        var buttonInnerHtml = this.innerHTML;
        makeSound(buttonInnerHtml);
        buttonAnimation(butttonInnerHtml);
    });

    numberButtons[i].addEventListener("keydown", function(event){
        makeSound(event.key);
        buttonAnimation(event.key);
    });
}


function makeSound(key){
    switch(key){
        case "w":
             var audio = new Audio("sounds/crash.mp3");
             audio.play();
            break;
        case "a":
            var audio = new Audio("sounds/kick-bass.mp3");
             audio.play();
            break;
        case "s":
            var audio = new Audio("sounds/snare.mp3");
             audio.play();
            break;
        case "d":
            var audio = new Audio("sounds/tom-1.mp3");
             audio.play();
            break;
        case "j":
            var audio = new Audio("sounds/tom-2.mp3");
             audio.play();
            break;
        case "k":
            var audio = new Audio("sounds/tom-3.mp3");
             audio.play();
            break;
        case "l":
            var audio = new Audio("sounds/tom-4.mp3");
             audio.play();
            break;
        default: 
            console.log("Please refresh this website");    
    }
}

function buttonAnimation(currentKey){
    var active_button =  document.querySelector("." + currentKey);
    active_button.classList.add("pressed");

    setTimeout(function (){
        active_button.classList.remove("pressed", 2000);
    });
}