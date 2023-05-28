function generateAgentRecommendation(mood) {
  let recommendation = '';

  switch (mood) {
    case 'happy':
      recommendation = ';] Great to see you happy! Keep up the positive energy!';
      break;
    case 'neutral':
      recommendation = ':| Feeling neutral? Take some time for self-reflection and self-care.';
      break;
    case 'unhappy':
      recommendation = ';[ If you are feeling unhappy, remember to reach out for support. You are not alone.';
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

function openFeedbackModal() {
  const feedbackModal = document.getElementById('feedback-modal');
  feedbackModal.style.display = 'block';
}

function closeFeedbackModal() {
  const feedbackModal = document.getElementById('feedback-modal');
  feedbackModal.style.display = 'none';
}

function submitFeedback() {
  const feedbackText = document.getElementById('feedback-text').value;
  // You can handle the feedback submission here (e.g., send it to a server)
  console.log('Feedback:', feedbackText);
  closeFeedbackModal();
}

// Event Listeners
const moodSelect = document.getElementById('mood-select');
const colorPicker = document.getElementById('color-picker');
const feedbackBtn = document.getElementById('feedback-btn');
const closeBtn = document.getElementsByClassName('close')[0];
const submitFeedbackBtn = document.getElementById('submit-feedback-btn');

moodSelect.addEventListener('change', function () {
  const selectedMood = this.value;
  const agentRecommendation = generateAgentRecommendation(selectedMood);
  displayAgentRecommendation(agentRecommendation);
});

colorPicker.addEventListener('change', function () {
  const selectedColor = this.value;
  updateBackgroundColor(selectedColor);
});

feedbackBtn.addEventListener('click', function () {
  openFeedbackModal();
});

closeBtn.addEventListener('click', function () {
  closeFeedbackModal();
});

submitFeedbackBtn.addEventListener('click', function () {
  submitFeedback();
});
