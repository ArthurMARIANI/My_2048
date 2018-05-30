$(document).keydown(function(e) {
    if (e.which == 39){move("right",1);}
    else if (e.which == 38){move("up",4);}
    else if (e.which == 37){move("left",1);}
    else if (e.which == 40){
    move("down",4);
    }
});

function start(){

   var i = Math.floor(Math.random() * 16+1);
   var j = Math.floor(Math.random() * 16+1);
   $('<div class=t'+ 2 +'>'+ 2 +'</div>').addClass("tile").appendTo("#"+i);
   while (i == j){
      var j = Math.floor(Math.random() * 16);
   }
   $('<div class=t'+ 2 +'>'+ 2 +'</div>').addClass("tile").appendTo("#"+j);
};

function add(e)  {
   if($('.tile').length < 16){
    var i = Math.floor(Math.random() * 16);
    while (($("td").eq(i)).text() != "")
    {
      i = Math.floor(Math.random() * 16);
    }
    $('<div class=t'+ 2 +'>'+ 2 +'</div>').addClass("tile").appendTo("#"+$("td").eq(i)[0].id);
   }
  else{
     alert("Loose");
  }
}

function createarray(arrow){
   var array = new Array;
   bufferarray = new Array;
   $("td").each(function() {
      array.push($(this));
   });
   if (arrow == "left" || arrow == "right" ){
    if(arrow == "left"){return array;}
    else{return array.reverse();}
   }
  else{
   for(i=0; i<4; i++){
    var add = 0;
    while(add<=12){
     bufferarray.push(array[(1*add)+i]);
     add += 4}
    }
   if (arrow == "up"){return bufferarray;}
   else if(arrow == "down"){
    return bufferarray.reverse();
   }
  }
}

function move(arrow,way){
   var previous = [];
   var value;
   var ismoved = false;
   array = createarray(arrow);
   array.forEach(function(element){
      if(element.children().length > 0){
         value = element.children().attr('class').split(' ')[0].replace('t', '');
       if(way==4){isvertical = 1}else{isvertical = 0}
       if(to_position(element[0].id)[isvertical]==previous[isvertical] && value==previousvalue){
          $("#"+ element[0].id).children().remove();
          $("#"+to_value(previous)).children().remove();
          $('<div class=t'+value*2+'>'+value*2+'</div>').addClass("tile").appendTo("#"+to_value(previous));
          score += value*2;
           $("#Score").html("Score: " + score);
          ismoved=true;
      }
      previous = to_position(element[0].id);
      previousvalue = value;
      }
   });
deplace(array,arrow,way,ismoved);
}


function deplace(array, arrow, way, ismoved){
var freeposition = 0;
var linecount = 0;
array.forEach(function(element){

 if(linecount ==4){
  linecount = 0
  freeposition = 0;
 }

 if(element.children().length == 0 && freeposition == 0){
  freeposition = element[0].id;
 }

 if(element.children().length > 0 && freeposition != 0){
  value = element.children().attr('class').split(' ')[0].replace('t', '');
  $("#"+ element[0].id).children().remove();
  $('<div class=t'+value+'>'+value+'</div>').addClass("tile").appendTo("#"+freeposition);
  if(arrow == "left" || arrow =="up"){
   freeposition = parseInt(freeposition)+parseInt(way);}
  else if(arrow == "right" || arrow =="down"){
   freeposition = freeposition-way;}
 ismoved=true;
 }
 linecount++;
});
if(ismoved == true){
 add()
}
}

function to_position(value){
   --value;
   var line = Math.floor(value/4);
   var col = value % 4;
   var coordinates = [line+1,col+1];
   return(coordinates);
}
function to_value(coordinates){
   value = ((coordinates[0]-1)*4+(coordinates[1]));
   return(value);
}

var score = 0;
start();
