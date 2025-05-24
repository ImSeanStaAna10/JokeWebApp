// Wait until the entire HTML document has loaded before running the script
window.addEventListener("DOMContentLoaded", () => {

  // Get the elements from the HTML: the button and the joke display area
  const jokeDisplay = document.getElementById("jokeDisplay");
  const jokeBtn = document.getElementById("jokeBtn");

  // function
  function getJoke() {
    // show message while fetching data
    jokeDisplay.innerText = "Loading a funny joke... 😂";

    // Use the fetch API to get a random joke from the joke API
    fetch("https://official-joke-api.appspot.com/jokes/random")
      .then((response) => response.json()) // convert the raw response into a usable JSON
      .then((jokeData) => {
        // Create a paragraph element to hold the "setup" part of the joke
        const setupEl = document.createElement("p");
        setupEl.innerHTML = `<strong>Setup:</strong> ${jokeData.setup}`;

        // Create a paragraph element for the "punchline" (but hide it at first)
        const punchlineEl = document.createElement("p");
        punchlineEl.innerHTML = `<strong>Punchline:</strong> ${jokeData.punchline}`;
        punchlineEl.style.display = "none"; // hide until user clicks answer

        // Create a button the user can click to reveal the punchline
        const revealBtn = document.createElement("button");
        revealBtn.textContent = "Answer.. 😆";
        revealBtn.classList.add("revealBtn");

        // When the user clicks this button...
        revealBtn.addEventListener("click", () => {
          punchlineEl.style.display = "block"; // show the punchline
          revealBtn.style.display = "none"; // hide the answer button
        });

        // Clear out any old joke before showing the new one
        jokeDisplay.innerHTML = "";

        // Add the new setup, reveal button, and hidden punchline to the page
        jokeDisplay.appendChild(setupEl); // show setup
        jokeDisplay.appendChild(revealBtn); // show "Show Punchline" button
        jokeDisplay.appendChild(punchlineEl); // hidden punchline (until clicked)
      })
      .catch((error) => {
        // If there's a problem getting the joke (like no internet), show a message
        jokeDisplay.innerText = "Sorry, I can't joke right now...";
        console.error("Error fetching joke:", error); // log the error in the browser console
      });
  }

  // When the main "Get Joke" button is clicked, call the getJoke function
  jokeBtn.addEventListener("click", getJoke);
});
