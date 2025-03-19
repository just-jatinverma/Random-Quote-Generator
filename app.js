async function generateQuote() {
  try {
    const api = await fetch(
      "https://api.freeapi.app/api/v1/public/quotes/quote/random"
    );
    const result = await api.json();

    if (result.success) {
      const quote = result.data.content;
      const author = result.data.author;

      document.querySelector("#quote").textContent = `${quote}`;
      document.querySelector("#author").textContent = `-${author}`;

      const randomImageUrl = `https://picsum.photos/800/450?random=${Math.random()}`;
      document.querySelector(
        ".custom-container"
      ).style.backgroundImage = `url("https://picsum.photos/800/450/?grayscale&blur=2")`;
    } else {
      document.querySelector("#quote").textContent = `Failed to Fetch}`;
      document.querySelector("#author").textContent = ``;
    }
  } catch (error) {
    document.querySelector("#quote").textContent = `Failed to Fetch`;
    document.querySelector("#author").textContent = ``;
  }
}

function copyToClipboard() {
  const quote = document.querySelector("#quote").textContent;
  const author = document.querySelector("#author").textContent;
  const txt = `${quote} -${author}`;

  navigator.clipboard
    .writeText(txt)
    .then(() => {
      alert("Copied to Clipboard");
    })
    .catch((err) => {
      console.error("Failed to copy text: ", err);
    });
}

function shareOnTwitter() {
  const quote = document.getElementById("quote").textContent;
  const author = document.getElementById("author").textContent;
  const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
    quote + " " + author
  )}`;
  window.open(tweetUrl, "_blank");
}

function exportToPng() {
  const container = document.querySelector(".custom-container");
  html2canvas(container).then((canvas) => {
    const link = document.createElement("a");
    link.href = canvas.toDataURL("image/png");
    link.download = "quote.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  });
}

window.onload = generateQuote;
