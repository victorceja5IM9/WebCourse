var button_colours = ["red", "blue", "green", "yellow"];
var game_pattern = [];
var user_clicked_pattern = [];
var level = 0;
$(document).ready(function(){
    $(document).on("keydown", function(){
        nextSequence();
        level = 1;
        $("h1").text("Level " + level);
    });
});

$("#red").click(function(){
    animatePress(this.id);
    playSound(this.id);
    var user_chosen_colour = this.id;
    user_clicked_pattern.push(user_chosen_colour);
    checkAnswer(user_clicked_pattern.length-1);
});

$("#green").click(function(){
    animatePress(this.id);
    playSound(this.id);
    var user_chosen_colour = this.id;
    user_clicked_pattern.push(user_chosen_colour);
    checkAnswer(user_clicked_pattern.length-1);
});

$("#blue").click(function(){
    animatePress(this.id);
    playSound(this.id);
    var user_chosen_colour = this.id;
    user_clicked_pattern.push(user_chosen_colour);
    checkAnswer(user_clicked_pattern.length-1);
});

$("#yellow").click(function(){
    animatePress(this.id);
    playSound(this.id);
    var user_chosen_colour = this.id;
    user_clicked_pattern.push(user_chosen_colour);
    checkAnswer(user_clicked_pattern.length-1);
});

function nextSequence(){
    var rand_number = Math.round(Math.random()*3);
    var random_chosen_colour = button_colours[rand_number];
    game_pattern.push(random_chosen_colour);
    flashButton(random_chosen_colour);
    ++level;
    $("h1").text("Level " + level);
}

function playSound(name){
    var audio = new Audio("sounds/"+name+".mp3");
    audio.play();
}

function flashButton(name){
    $("#"+name).fadeOut();
    $("#"+name).fadeIn();
}

function animatePress(currentColour){
    $("#"+currentColour).addClass("pressed");
    setTimeout(() => {
        $("#"+currentColour).removeClass("pressed");
    }, 100);
}

function checkAnswer(currentLevel){
    if(game_pattern[currentLevel] === user_clicked_pattern[currentLevel]){
        if(user_clicked_pattern.length === game_pattern.length){
            setTimeout(() =>{
                nextSequence();
            }, 1000);
            user_clicked_pattern = [];
        }
    }else{
        gameOver();
        startOver();
    }
}

function gameOver(){
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(() => {
        $("body").removeClass("game-over");
    },200);
    $("h1").text("Game Over!, Press Any key to Restart");
}

function startOver(){
    game_pattern = [];
    user_clicked_pattern = [];
    level = 0;
}