var words = ["Alura","Oracle","Chau"];

var btnAdd = document.querySelector("#btn-add");
var inputWord = document.querySelector("#word");
var span = document.querySelector("#error-add");

btnAdd.addEventListener("click", function(){
    var inputVal = inputWord.value;
    verif = true;
    for(var i = 0; i < words.length; i++)
    {
        var expresion = new RegExp(words[i], "i" );
        if(expresion.test(inputVal) || inputVal == ""){
            verif = false;
        }

    }
    if(verif)
    {
        words.push(inputVal)
        span.classList.add("invisible");
    }
    else{

        span.classList.remove("invisible");
        
    }
    inputWord.value = "";
});