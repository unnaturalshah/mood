function generateAgentRecommendation(mood) {
  let recommendation = '';

  switch (mood) {
    case 'happy':
      recommendation = 'Great to see you happy! Keep up the positive energy!';
      break;
    case 'neutral':
      recommendation = 'Feeling neutral? Take some time for self-reflection and self-care.';
      break;
    case 'unhappy':
      recommendation = 'If you are feeling unhappy, remember to reach out for support. You are not alone.';
      break;
    default:
      recommendation = 'No recommendation available for the selected mood.';
      break;
  }

  return recommendation;
}

function displayAgentRecommendation(recommendation) {
  const recommendationElement = document.getElementById('agent-recommendation');
  recommendationElement.textContent = recommendation;
}

function updateBackgroundColor(color) {
  document.body.style.backgroundColor = color;
}

function captureUserData(mood, color) {
  const userData = {
    mood: mood,
    color: color,
    timestamp: new Date().toISOString()
 
