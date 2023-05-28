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
  };

  const userHistory = getLocalStorage('userHistory') || [];
  userHistory.push(userData);
  setLocalStorage('userHistory', userHistory);
}

const moodSelect = document.getElementById('mood-select');
const colorPicker = document.getElementById('color-picker');

moodSelect.addEventListener('change', function () {
  const selectedMood = this.value;
  const agentRecommendation = generateAgentRecommendation(selectedMood);
  displayAgentRecommendation(agentRecommendation);
  captureUserData(selectedMood, colorPicker.value);
});

colorPicker.addEventListener('input', function () {
  const selectedColor = this.value;
  updateBackgroundColor(selectedColor);
  captureUserData(moodSelect.value, selectedColor);
});
