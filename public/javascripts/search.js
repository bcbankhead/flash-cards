// (function() {
//   var cx = '011127767182915430135:pcg-i_rg49w';
//   var gcse = document.createElement('script');
//   gcse.type = 'text/javascript';
//   gcse.async = true;
//   gcse.src = (document.location.protocol == 'https:' ? 'https:' : 'http:') +
//       '//cse.google.com/cse.js?cx=' + cx;
//   var s = document.getElementsByTagName('script')[0];
//   s.parentNode.insertBefore(gcse, s);
// })();

var hint = document.getElementById('hint')
var hintOverlay = document.getElementById('hintOverlay')
var hintShown = false;

if(!hintShown){
  hint.addEventListener('click', function () {
    hintOverlay.style.display = 'inline-block'
    hintShown = true
  })
}

  // hintOverlay.addEventListener('click', function () {
  //   hintOverlay.style.display = 'none'
  //   hintShown = false
  //   console.log("wtf");
  // })
