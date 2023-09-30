let playing=false;
let score;
let trialLeft;
let step;
let action;
let fruits=["apple","grapes","mango","mixture","mixture2","papaya","pineapple","redFruit","redFruit2","redFruit3"];
$(()=>
{
   
    $("#startreset").click(()=>
    {
        
        if(playing)
        {
            //reload page 
            location.reload();
            playing=false;
        }
        else
        {
          
            $("#gameover").hide();
          
            $("#startreset").html("Reset Game");
           
            playing=true;
 
            score=0;
            $("#scorevalue").html(score);
           
            $("#trialleft").show();
          
            trialLeft=3;
        
            addHearts(); 
           
            startAction();
        }
    });
    function addHearts()
    {
      
        $("#trialleft").empty();
     
        for(let i=0;i<trialLeft;i++)
        {
            $("#trialleft").append('<img src="images/heart.jpg" class="heart">');
        }
    }
   
    function startAction()
    {
        
        $("#fruit").show();

        chooseFruit();
      
        $("#fruit").css({"left":Math.round(650 * Math.random()),"top":-50});
  
        step=1 + Math.round( 5 * Math.random());
   
        action=setInterval(()=>{
            $("#fruit").css("top",$("#fruit").position().top + step);
           
            if($("#fruit").position().top > $("#fruitContainer").height())
            {
             
                if(trialLeft > 1)
                {
                    $("#fruit").show();
                    chooseFruit();
                    $("#fruit").css({"left":Math.round(650 * Math.random()),"top":-50});
                    step=1 + Math.round( 5 * Math.random());
                   
                    trialLeft--;
                   
                    addHearts();
                }
                else 
                {
                    playing=false;
                  
                    $("#startreset").html("Start Game");
                    $("#gameover").show();
                    $("#gameover").html("<p>Game Over !</p><p>Your Score is " + score + "</p>");
                    
                    $("#trialleft").hide();
                    stopAction();
                }
            }
        },10)
    }
        function chooseFruit()
    {
        let rand=fruits[Math.round(9*Math.random())];
      
        $("#fruit").attr('src','images/' + rand + '.png');
    }
    function stopAction()
    {
        clearInterval(action);
    
        $("#fruit").hide();
    }
    
    $("#fruit").mouseover(()=>
    { 
     
        score++;
        
        $("#scorevalue").html(score);
       
        $("#slicesound")[0].play();
        clearInterval(action);
        
        $("#fruit").hide("explode",200);
       
        setTimeout(startAction,400);
    });
})