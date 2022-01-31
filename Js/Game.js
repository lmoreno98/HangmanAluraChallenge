var start = document.querySelector("#btn-game")
var windows = document.querySelector("canvas");
var pencil = windows.getContext("2d");
var btMainMenu = document.querySelector("#btn-mainmenu");

scrollTo(0,0)

// Star Game
start.addEventListener("click",function(){
    
    letters = [];
    wrongLett = [];
    accLett = 0;
    lives = 6;
    word = AleatoryWord()
    pencil.clearRect(0,0,1000,590);
    scrollTo(0,1000)
    createHangman();
    startGame(word);
    letterScript();
    livesDisplays(lives);
});

// Caption of pressing a letter
function letterScript(){

    window.addEventListener("keypress", function (event) {
        if((lives > 0) && (accLett < word.length)){
            letter = event.key.toUpperCase();
            lives = verifLetterNew(letter,lives);
            wrongLetters();
            console.log(accLett)
            console.log(word.length)
        }
        else if(accLett == word.length){
            win()
        }   
      });
}

// Main menu 
btMainMenu.addEventListener("click",function(){
    scrollTo(0,0);
});


// Draw the first part of the hangman
function createHangman()
{
    pencil.lineWidth = 4;
    pencil.strokeStyle = "#155504"
    pencil.beginPath();
	pencil.moveTo(100,525);
	pencil.lineTo(150,500);
    pencil.lineTo(200,525);
    pencil.lineTo(100,525);
    pencil.moveTo(150,500);
    pencil.lineTo(150,150);
    pencil.lineTo(255,150);
    pencil.lineTo(255,170);
	pencil.stroke();
}

// Lines of the letters
function createLineWord(x){

    pencil.lineWidth = 4;
    pencil.strokeStyle = "black";
    pencil.beginPath();
    pencil.moveTo(x,525);
    pencil.lineTo(x+30,525);
    pencil.stroke();

}

// Write letter
function printletter(x,y,letra){

    pencil.beginPath();
    pencil.lineWidth = 1;
    pencil.font="bold 20px arial";
    pencil.fillText(letra,x+7,y);
}

// Creation of all the line per latter
function startGame(word){
    x = 400;
    for(var i = 0 ;  i < word.length; i++){
        createLineWord(x);
        x = x+40;
    }
}


// Get random word
function AleatoryWord(){
    var i = Math.floor(Math.random()*words.length);
    console.log(words[i]);
    return(words[i].toUpperCase());
}

// Show the lives left
function livesDisplays(lives)
{
    pencil.fillStyle = "black"
    pencil.clearRect(0,0,1000,101);
    pencil.font="bold 20px arial";
    pencil.fillText(lives, 900,100)
}

// Strokes of the hangman when lost a live
function fullHangman(lives){
    pencil.strokeStyle = "#155504"
    pencil.lineWidth = 4
    if(lives == 5){
        pencil.strokeStyle = "#155504"
        pencil.beginPath()
        pencil.arc(255,200,30,0,3.14*2)
        pencil.stroke();

    }
    else if(lives == 4){
        ArmsLegs(255,230,255,380)
    }
    else if(lives == 3){
        ArmsLegs(255,380,200,430)
    }
    else if(lives == 2){
        ArmsLegs(255,380,310,430)        
    }
    else if(lives == 1){
        ArmsLegs(255,280,310,240)
    }
    else if(lives == 0){
        ArmsLegs(255,280,200,240)
        ArmsLegs(200,230,310,230)
        dead()

    }
}

// Arms and legs strokes
function ArmsLegs(x0,y0,x1,y1){
    pencil.beginPath();
    pencil.moveTo(x0,y0);
    pencil.lineTo(x1,y1);
    pencil.stroke();
}

// Knowing when letter is'n in the word
function lostLive(letter,lives){
    verif = true
    for(var i = 0; i<word.length;i++){
        if(word[i] == letter){
            verif =  true
            break;
        }
        else{
            verif = false;
        }
    }
    if(!verif){
        lives = lives - 1;
        fullHangman(lives);
        livesDisplays(lives)
        wrongLett.push(letter)
    }
    return lives;
}

// Knowing if letter is repeat
function verifLetterNew(letter, lives){
    verif = true;

    for(var i = 0; i< letters.length; i ++){
        if(letters[i] == letter){
            verif = false;
        }
    }
    if (verif){
        letters.push(letter);
        lives = lostLive(letter, lives)
        x = 400;
        for(var i = 0; i < word.length; i++){

            if(letter == word[i]){
                accLett = accLett + 1
                printletter((x+40*i),515, letter);
            }
        }
    }
    console.log(letters)
    return lives
  }

  // Lost Message
  function dead(){

    pencil.font="bold 20px arial";
    pencil.fillStyle ="red"
    pencil.fillText("You are dead", 500,300)
  }

  // Win Message
  function win(){
    pencil.font="bold 20px arial";
    pencil.fillStyle ="yellow"
    pencil.fillText("Congratulation", 500,250)
    pencil.fillText("You win", 530,300)
  }

  // Wrong letter outputs
  function wrongLetters(){
    x = 500;
    pencil.clearRect(500,300,1000,100);
        for(var i = 0; i < wrongLett.length; i++){
            
            printletter(x+(20*i),350,wrongLett[i])
    
        }
  }