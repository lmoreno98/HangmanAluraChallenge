canvas = document.querySelector("canvas");
pencil = canvas.getContext("2d");
new_game = document.querySelector(".btn-newGame");

words = ["Alura","Oracle"];
pencil.fillStyle ="Black";



startNewGame()
new_game.onclick = () => {
    startNewGame();
}

function startNewGame(){
    letters = [];
    wrongLett = [];
    accLett = 0;
    lives = 6;
    word = AleatoryWord()
    pencil.clearRect(0,0,1000,590);
    createHangman();
    startGame(word);
    letterScript();
    livesDisplays(lives);
}

function letterScript(){

    window.addEventListener("keypress", function (event) {
        if((lives > 0) && (accLett < word.length)){
            
            letter = event.key.toUpperCase();
            lives = verifLetterNew(letter,lives);
            wrongLetters();

        }   
        if(accLett == word.length){
            win();
        }
      });
}

function createHangman()
{
    pencil.lineWidth = 4;
    pencil.strokeStyle = "#0A3871"
    pencil.beginPath();

    pencil.lineTo(350,275); //525
    pencil.lineTo(550,275); //525
    pencil.moveTo(400,275); //500
    pencil.lineTo(400,50); //150
    pencil.lineTo(525,50); //150
    pencil.lineTo(525,75); //170
	pencil.stroke();
}

function createLineWord(x){

    pencil.lineWidth = 4;
    pencil.strokeStyle = "#0A3871";
    pencil.beginPath();
    pencil.moveTo(x,375);
    pencil.lineTo(x+50,375);
    pencil.stroke();

}

function printletter(x,y,letra, font){

    pencil.beginPath();
    pencil.lineWidth = 1;
    pencil.fillStyle ="#0A3871"
    pencil.font= font;
    pencil.fillText(letra,x+7,y);
}

function AleatoryWord(){
    var i = Math.floor(Math.random()*words.length);
    return(words[i].toUpperCase());
}

function livesDisplays(lives)
{
    pencil.fillStyle = "#0A3871"
    pencil.clearRect(700,0,1000,101);
    pencil.font="bold 40px arial";
    pencil.fillText(lives, 750,50)
}

function startGame(word){
    x = 300;
    for(var i = 0 ;  i < word.length; i++){
        createLineWord(x);
        x = x+65;
    }
}

function fullHangman(lives){
    pencil.strokeStyle = "#0A3871"
    pencil.lineWidth = 4
    if(lives == 5){
        pencil.strokeStyle = "#0A3871"
        pencil.beginPath()
        pencil.arc(525,100,25,0,3.14*2) //255,200,30,0,3.14*2
        pencil.stroke();

    }
    else if(lives == 4){
        ArmsLegs(525,225,525,125) //255,230,255,380
    }
    else if(lives == 3){
        ArmsLegs(525,225,495,260) //255,380,200,430
    }
    else if(lives == 2){
        ArmsLegs(525,225,555,260) //255,380,310,430        
    }
    else if(lives == 1){
        ArmsLegs(525,125,555,175) //255,280,310,240
    }
    else if(lives == 0){
        ArmsLegs(525,125,495,175) //255,280,200,240
        ArmsLegs(485,125,565,125) //200,230,310,230
        dead()

    }
}

function ArmsLegs(x0,y0,x1,y1){
    pencil.beginPath();
    pencil.moveTo(x0,y0);
    pencil.lineTo(x1,y1);
    pencil.stroke();
}

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
        x = 305;
        for(var i = 0; i < word.length; i++){

            if(letter == word[i]){
                accLett = accLett + 1
                printletter((x+65*i),360, letter,"bold 30px arial");
            }
        }
    }
    return lives
  }

  // Lost Message
  function dead(){

    pencil.font="bold 20px arial";
    pencil.fillStyle ="#0A3871"
    pencil.fillText("You are dead", 600,125)
  }

  // Win Message
  function win(){
    pencil.font="bold 20px arial";
    pencil.fillStyle ="#0A3871"
    pencil.fillText("Congratulation", 600,150)
    pencil.fillText("You win", 630,200)
  }

  // Wrong letter outputs
  function wrongLetters(){
    x = 350;
    //pencil.clearRect(500,300,1000,100);
        for(var i = 0; i < wrongLett.length; i++){
            
            printletter(x+(40*i),420,wrongLett[i],"20px arial")
    
        }
  }