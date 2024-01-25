document.addEventListener('DOMContentLoaded', function() {

  var dots = document.getElementsByClassName('dot');
  for (var i = 0; i < dots.length; i++) {
    dots[i].style.display = 'none';
  }


  window.onpageshow = function(event) {
  if (event.persisted) {
    dots[0].style.display = 'none';
    dots[1].style.display = 'none';
    dots[2].style.display = 'none';
  } else {
    dots[0].style.display = 'none';
    dots[1].style.display = 'none';
    dots[2].style.display = 'none';
  }
};

    dots[0].style.display = 'none';
    dots[1].style.display = 'none';
    dots[2].style.display = 'none';

  const about = document.getElementById('about');
  const contact = document.getElementById('contact');
  const work = document.getElementById('work');

  about.addEventListener('mouseover', function(){
      dots[0].style.display = 'inline';
  });
  work.addEventListener('mouseover', function(){
      dots[1].style.display = 'inline';
  });
  contact.addEventListener('mouseover', function(){
      dots[2].style.display = 'inline';
  });

  about.addEventListener('mouseout', function(){
      dots[0].style.display = 'none';
  });
  work.addEventListener('mouseout', function(){
      dots[1].style.display = 'none';
  });
  contact.addEventListener('mouseout', function(){
      dots[2].style.display = 'none';
  });

});
