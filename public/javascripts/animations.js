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
