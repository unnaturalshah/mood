// JavaScript code for the website

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

// Example usage
displaySentimentEmoji('');
