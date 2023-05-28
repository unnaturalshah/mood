// Store data in local storage
function setLocalStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error('Error setting data in local storage:', error);
  }
}

// Retrieve data from local storage
function getLocalStorage(key) {
  try {
    const data = localStorage.getItem(key);
    return JSON.parse(data);
  } catch (error) {
    console.error('Error retrieving data from local storage:', error);
    return null;
  }
}
