$(".gamecont").hide();
$(".maincont").hide();
setTimeout(function(){
    $(".maincont").slideDown();
}, 1000);
$(".gobtn").on("click", function(){
    $(".maincont").slideUp();
    setTimeout(function(){
        $(".headingmain").text("Rules");
        $(".rulesdiv").removeClass("visually-hidden");
        $(".gobtn").hide();
        $(".gobtn2").removeClass("visually-hidden");
        $(".maincont").slideDown();
    }, 500);
})
var count=3;
var level=1;
var started=true;
$(".gobtn2").on("click", function(){
    $(".maincont").slideUp();
    setTimeout(function(){
        $(".gamecont").slideDown();
        $(".gamecont").css("opacity", "0.2");
    }, 500);
    createGame();
})
var keys;
function createGame(){
    current=0;
    level=1;
    keys=[];
    started=true;
    $(".gamecont").removeClass("wrong");
    $(".greet").addClass("visually-hidden");
    $(".continue").addClass("visually-hidden");
    level=1;
    var x=setInterval(function(){
        $(".countdown").removeClass("visually-hidden");
        $(".countdown").text(""+count--);
        if(count<0){
            $(".countdown").addClass("visually-hidden");
            $(".gamecont").css("opacity", "1");
            clearInterval(x);
            generateKey();
        }
    }, 1000);
    count=3;
    $(".countdown").addClass("visually-hidden");
    
}
$(".colorimg").on("mouseover", fadeIn);
$(".colorimg").on("mouseleave", fadeOut);

$(".colorimg").click(function(){
    pressBtn(this.classList[1]);
    checkAnswer(intToColor.indexOf(this.classList[1]));
});

function fadeIn(event){
    event.target.classList.add("fade");
}
function fadeOut(event){
    event.target.classList.remove("fade");
}

var intToColor=new Array("r", "y", "g", "b");
var current=0;
function generateKey(){
    var rand=Math.floor(Math.random()*4);
    keys.push(rand);
    pressBtn(intToColor[rand]);
}
function checkAnswer(k){
    if(keys[current]==k){
        if(++current==keys.length){
            $(".headinggame").text("The simon Game Level - "+level++);
            current=0;
            setTimeout(function(){
                generateKey();
            }, 800)
        }
    }
    else{
        gameover();
    }
}
var aud;

function pressBtn(i){
    $("."+i).addClass("pressed");
    aud=new Audio("sounds/"+i+".mp3");
    aud.play();
    setTimeout(function(){
            $("."+i).removeClass("pressed");
        }, 200)
}

function gameover(){
    current=0;
    keys=[];
    aud=new Audio("sounds/wrong.mp3");
    aud.play();
    $(".gamecont").css("opacity", "0.2");
    $(".gamecont").addClass("wrong");
    $(".continue").removeClass("visually-hidden");
    $(".countdown").removeClass("visually-hidden");
    $(".countdown").text("GameOver!");
    $(".greet").removeClass("visually-hidden");
    started=false;
}
$(".countdown").click(
    function(){
        if(!started){
            createGame();
        }
    }
)
$(document).keypress(
    function(){
        if(!started){
            createGame();
        }
    }
);
