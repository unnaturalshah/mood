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

function retrieveUserHistory() {
  const userHistory = getLocalStorage('userHistory') || [];

  const userHistoryList = document.getElementById('user-history-list');
  userHistoryList.innerHTML = '';

  if (userHistory.length === 0) {
    const emptyHistoryItem = document.createElement('li');
    emptyHistoryItem.textContent = 'No user history available.';
    userHistoryList.appendChild(emptyHistoryItem);
  } else {
    userHistory.forEach(function (userData) {
      const historyItem = document.createElement('li');
      historyItem.textContent = `Mood: ${userData.mood}, Color: ${userData.color}, Timestamp: ${userData.timestamp}`;
      userHistoryList.appendChild(historyItem);
    });
  }
}

function forecastMood() {
  const userHistory = getLocalStorage('userHistory') || [];
  const forecastElement = document.getElementById('forecast');

  if (userHistory.length >= 5) {
    const latestMoods = userHistory.slice(userHistory.length - 5).map(function (userData) {
      return userData.mood;
    });

    const uniqueMoods = [...new Set(latestMoods)];
    const moodCount = uniqueMoods.length;

    if (moodCount === 1) {
      forecastElement.textContent = 'Your mood is stable.';
    } else if (moodCount >= 3) {
      forecastElement.textContent = 'Your mood is fluctuating.';
    } else {
      forecastElement.textContent = 'Unable to forecast mood with certainty.';
    }
  } else {
    forecastElement.textContent = 'Insufficient user history to forecast mood.';
  }
}

// Event listeners
document.getElementById('color-picker').addEventListener('change', function (event) {
  const color = event.target.value;
  updateBackgroundColor(color);
});

document.getElementById('mood-select').addEventListener('change', function (event) {
  const selectedMood = event.target.value;
  const recommendation = generateAgentRecommendation(selectedMood);
  displayAgentRecommendation(recommendation);
  captureUserData(selectedMood, document.getElementById('color-picker').value);
  retrieveUserHistory();
  forecastMood();
});

document.getElementById('feedback-btn').addEventListener('click', function () {
  document.getElementById('feedback-modal').style.display = 'block';
});

document.querySelector('.close').addEventListener('click', function () {
  document.getElementById('feedback-modal').style.display = 'none';
});

document.getElementById('submit-feedback-btn').addEventListener('click', function () {
  const feedbackText = document.getElementById('feedback-text').value;
  // Process the feedback here
  document.getElementById('feedback-modal').style.display = 'none';
});

// Retrieve user history and forecast mood on page load
window.addEventListener('DOMContentLoaded', function () {
  retrieveUserHistory();
  forecastMood();
});
