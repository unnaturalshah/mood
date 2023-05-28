// Function to generate agent's recommendation based on user's mood
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

// Function to display the agent's recommendation
function displayAgentRecommendation(recommendation) {
  const recommendationElement = document.getElementById('agent-recommendation');
  recommendationElement.textContent = recommendation;
}

// Event listener for mood selection change
const moodSelect = document.getElementById('mood-select');
moodSelect.addEventListener('change', function () {
  const selectedMood = this.value;
  const agentRecommendation = generateAgentRecommendation(selectedMood);
  displayAgentRecommendation(agentRecommendation);
});
