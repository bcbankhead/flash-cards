 //$("#submitAnswer").click(function() {
$(".overlaySegment").flip({
  trigger: 'manual'
});
//});

$("#loginCard").flip({
  trigger: 'manual'
});

setInterval(function () {
   $("#loginCard").flip('toggle');
 },2000);
// $(".loginCard").flip({
//   axis: 'x',
//   trigger: 'hover',
//   reverse: true
// });


window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

function expand(){
 var categoryElement = '.categoryElement';
 var i = 1;

 $(categoryElement).each(function(index,value){

   setTimeout(function(){

     $(value).addClass('loaded');
     $(value).append('<div class="num">'+percent+'%</div>');
   }, i * 100);

   i++;
 });
}

$(window).load(function(){

 requestAnimationFrame(expand);

});
