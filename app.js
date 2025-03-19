// Function to fetch a random motivational quote from the API
async function generateQuote() {
  try {
    const api = await fetch(
      "https://api.freeapi.app/api/v1/public/quotes/quote/random"
    );
    const result = await api.json();

    if (result.success) {
      // Extract the quote and author from the API response
      const quote = result.data.content;
      const author = result.data.author;

      // Update the HTML content with the new quote
      document.querySelector("#quote").textContent = `${quote}`;
      document.querySelector("#author").textContent = `-${author}`;
    } else {
      // Handle cases where fetching the quote fails
      document.querySelector("#quote").textContent = `Failed to Fetch`;
      document.querySelector("#author").textContent = ``;
    }
  } catch (error) {
    // Handle network errors or other exceptions
    document.querySelector("#quote").textContent = `Failed to Fetch`;
    document.querySelector("#author").textContent = ``;
  }
}

// Function to copy the quote to the clipboard
function copyToClipboard() {
  const quote = document.querySelector("#quote").textContent;
  const author = document.querySelector("#author").textContent;
  const txt = `${quote} -${author}`;

  navigator.clipboard
    .writeText(txt)
    .then(() => {
      alert("Copied to Clipboard"); // Notify the user
    })
    .catch((err) => {
      console.error("Failed to copy text: ", err);
    });
}

// Function to share the quote on Twitter
function shareOnTwitter() {
  const quote = document.getElementById("quote").textContent;
  const author = document.getElementById("author").textContent;

  // Construct a Twitter share URL with the quote
  const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
    quote + " " + author
  )}`;

  window.open(tweetUrl, "_blank"); // Open Twitter in a new tab
}

// Function to export the quote as a PNG image
function exportToPng() {
  const container = document.querySelector(".custom-container");

  html2canvas(container, {
    useCORS: true,
    backgroundColor: null, // Keeps transparency
    logging: true, // Enable logs for debugging
    windowWidth: container.scrollWidth, // Capture full width
    windowHeight: container.scrollHeight, // Capture full height
  }).then((canvas) => {
    const link = document.createElement("a");
    link.href = canvas.toDataURL("image/png"); // Convert canvas to PNG
    link.download = "quote.png"; // Set download filename
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  });
}

// Generate a quote when the page loads
window.onload = generateQuote;
