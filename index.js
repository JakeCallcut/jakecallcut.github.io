document.addEventListener('DOMContentLoaded', function() {

  var dots = document.getElementsByClassName('dot');
  for (var i = 0; i < dots.length; i++) {
    dots[i].style.display = 'none';
  }

  const ghCard = document.getElementById('githubCard');
  const liCard = document.getElementById('linkedinCard');
  const emCard = document.getElementById('emailCard');

  const ghImage = document.getElementById('githubImage');
  const liImage = document.getElementById('linkedinImage');
  const emImage = document.getElementById('emailImage');

  const ghText = document.getElementById('githubText');
  const liText = document.getElementById('linkedinText');
  const emText = document.getElementById('emailText');

  ghCard.addEventListener('mouseover', function(){
    ghText.style.color = "#6CA1D2";
    ghText.style.textShadow = "2px 2px 4px rgba(0, 0, 0, 0.5)";
  });
  liCard.addEventListener('mouseover', function(){
    liText.style.color = "#6CA1D2";
    liText.style.textShadow = "2px 2px 4px rgba(0, 0, 0, 0.5)";
  });
  emCard.addEventListener('mouseover', function(){
    emText.style.color = "#6CA1D2";
    emText.style.textShadow = "2px 2px 4px rgba(0, 0, 0, 0.5)";
  });

  ghCard.addEventListener('mouseout', function(){
    ghText.style.color = "darkGray";
    ghText.style.textShadow = "";
  });
  liCard.addEventListener('mouseout', function(){
    liText.style.color = "darkGray";
    liText.style.textShadow = "";
  });
  emCard.addEventListener('mouseout', function(){
    emText.style.color = "darkGray";
    emText.style.textShadow = "";
  });

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
