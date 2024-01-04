document.addEventListener('DOMContentLoaded', function() {

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

  ghCard.addEventListener('click', function(){
    ghText.style.color = 'darkGray';
    window.location = 'https://github.com/JakeCallcut';
  });
  liCard.addEventListener('click', function(){
    liText.style.color = 'darkGray';
    window.location = 'https://www.linkedin.com/in/j-callcut';
  });
  emCard.addEventListener('click', function(){
    emText.style.color = 'darkGray';
    window.location = 'mailto:jake@callcut.dev';
  });

});
