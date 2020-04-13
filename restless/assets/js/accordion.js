var acc = document.getElementsByClassName("accordion");
var i;

var ignoreScroll = false;

for (i = 0; i < acc.length; i++) {
  if (i == 0) {
    // Make first panel active by default
    acc[i].classList.toggle("active");
    var panel = acc[i].nextElementSibling;
    if (panel.style.maxHeight) {
      panel.style.maxHeight = null;
    } else {
      panel.style.maxHeight = panel.scrollHeight + "px";
    }
  }
  acc[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var panel = this.nextElementSibling;
    if (panel.style.maxHeight) {
      panel.style.maxHeight = null;
    } else {
      panel.style.maxHeight = panel.scrollHeight + "px";
    }
  });
}


// Scroll for accordion
$('.scrollable').on('mouseover', function(event) {
    event.preventDefault();
    ignoreScroll = true;
    event.stopPropagation();
});

$('.scrollable').on('mouseleave', function(event) {
    ignoreScroll = false;
});

$('.scrollable').scroll(function() {
    console.log($('.scrollable').prop('scrollHeight'));
    console.log($('.scrollable').scrollTop());
    console.log(Math.ceil($('.scrollable').height()));
    var threshold = 10;
	if ($('.scrollable').scrollTop() <= Math.ceil($('.scrollable').height() - threshold)) {
		ignoreScroll = false;
    } else {
		ignoreScroll = true;
    }
});

