// JavaScript code for the website
const colorInput = document.getElementById('color-input');
const slider = document.getElementById('color-slider');
const sentimentResult = document.getElementById('sentiment-result');
const Sentiment = require('sentiment');

// Instantiate the sentiment analyzer
const sentiment = new Sentiment();

// Perform sentiment analysis on a color value
function analyzeSentiment(color) {
  // Perform sentiment analysis using the Sentiment library
  const colorSentiment = sentiment.analyze(color);
  return colorSentiment.score;
}

// Update color preview based on slider value
function updateColorPreview() {
  const hue = slider.value;
  const color = `hsl(${hue}, 100%, 50%)`;
  document.getElementById('last-color').textContent = color;
  colorInput.value = color;
  analyzeColorSentiment(color);
}

// Perform sentiment analysis on the color value
function analyzeColorSentiment(color) {
  const sentimentScore = analyzeSentiment(color);
  const sentimentLabel = getSentimentLabel(sentimentScore);
  sentimentResult.textContent = sentimentLabel;
}

// Get the donate form element
const donateForm = document.getElementById('donate-form');
// Get the donate button element
const donateButton = document.getElementById('donate-btn');

// Listen for color change event
colorInput.addEventListener('input', updateColorPreview);
slider.addEventListener('input', updateColorPreview);

// Listen for donate form submission event
donateForm.addEventListener('submit', handleDonation);

// Store recommendations and their frequencies
let recommendations = {};

const form = document.getElementById('recommendation-form');
const input = document.getElementById('recommendation-input');
const list = document.getElementById('recommendation-list');
const existingRecommendations = {}; // Replace with your existing recommendation data

// Copy existing recommendations to the 'recommendations' object
Object.assign(recommendations, existingRecommendations);
form.addEventListener('submit', handleFormSubmit);

function handleFormSubmit(event) {
  event.preventDefault();

  const recommendation = input.value.trim();

  if (recommendation !== '') {
    addRecommendation(recommendation);
    input.value = '';
  }
}

function addRecommendation(recommendation) {
  const trimmedRecommendation = recommendation.trim();

  if (trimmedRecommendation !== '') {
    if (recommendations[trimmedRecommendation]) {
      recommendations[trimmedRecommendation]++;
    } else {
      recommendations[trimmedRecommendation] = 1;
    }

    const sortedRecommendations = Object.entries(recommendations).sort((a, b) => b[1] - a[1]);

    list.innerHTML = '';

    for (const [rec, freq] of sortedRecommendations) {
      const listItem = document.createElement('li');
      listItem.textContent = `Recommendation: ${rec}, Frequency: ${freq}`;
      list.appendChild(listItem);
    }
  }
}

// Function to handle user recommendations
function handleUserRecommendation(recommendation) {
  // Retrieve existing recommendations from storage
  let recommendations = JSON.parse(localStorage.getItem('recommendations')) || {};

  // Update the recommendation count
  recommendations[recommendation] = (recommendations[recommendation] || 0) + 1;

  // Store the updated recommendations
  localStorage.setItem('recommendations', JSON.stringify(recommendations));

  // Sort recommendations based on frequency
  const sortedRecommendations = Object.entries(recommendations).sort((a, b) => b[1] - a[1]);

  // Clear the recommendation list
  list.innerHTML = '';

  // Render the sorted recommendations
  for (const [rec, freq] of sortedRecommendations) {
    const listItem = document.createElement('li');
    listItem.textContent = `Recommendation: ${rec}, Frequency: ${freq}`;
    list.appendChild(listItem);
  }
}


// Function to handle donation
function handleDonation(event) {
  event.preventDefault();

  // Validate color selection
  const color = colorInput.value;
  if (!color) {
    document.getElementById('donation-status').textContent = 'Please select a color.';
    return;
  }

  // Disable the donate button and show loading state
  donateButton.disabled = true;
  donateButton.textContent = 'Donating...';

  // Perform the donation process
  sendDonation()
    .then(donationStatus => {
      // Update donation status
      document.getElementById('donation-status').textContent = donationStatus;
    })
    .catch(error => {
      // Handle donation error
      document.getElementById('donation-status').textContent = 'Failed to donate. Please try again later.';
    })
    .finally(() => {
      // Enable the donate button and restore its original text
      donateButton.disabled = false;
      donateButton.textContent = 'Donate Now';
    });
}

// Function to send donation to the reinforcement agent
function sendDonation() {
  // Implementation for sending donation goes here
  // Return a promise that resolves with the donation status
}

// Function to generate and display sentimental-based emoji
function displaySentimentEmoji(sentiment) {
  const emojiContainer = document.getElementById('emoji');

  let emoji;
  if (sentiment === 'positive') {
    emoji = '😄';
  } else if (sentiment === 'neutral') {
    emoji = '😐';
  } else if (sentiment === 'negative') {
    emoji = '😔';
  } else {
    emoji = '❓';
  }

  emojiContainer.textContent = emoji;
}

// Function to get the sentiment label based on sentiment score
function getSentimentLabel(sentimentScore) {
  return sentimentScore > 20 ? 'Positive' : sentimentScore < -20 ? 'Negative' : 'Neutral';
}

// Example usage
const color = colorInput.value;
analyzeColorSentiment(color);
displaySentimentEmoji(sentimentResult.textContent);
