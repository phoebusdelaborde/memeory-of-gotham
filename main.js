document.addEventListener("DOMContentLoaded", () => {
  const images = [
    "image.png",
    "image.png",
    "image1.jpg",
    "image1.jpg",
    "image2.jpg",
    "image2.jpg",
    "image3.jpg",
    "image3.jpg",
    "image4.jpg",
    "image4.jpg",
    "image5.jpg",
    "image5.jpg",
    "image6.jpg",
    "image6.jpg",
    "image7.jpg",
    "image7.jpg",
    "image8.jpg",
    "image8.jpg",
    "image9.jpg",
    "image9.jpg",
    // Ajoutez autant d'images que nécessaire, chaque image doit être répétée une fois
  ];

  // Mélanger les images
  images.sort(() => 0.5 - Math.random());

  const gameBoard = document.getElementById("gameBoard");
  const successText = document.getElementById("successText");
  const matchCountDiv = document.getElementById("matchCount");
  const nulDiv = document.getElementById("nul");

  let flippedCards = [];
  let matchedCards = [];
  let matchCount = 0;
  let nulCount = 0;

  function createCard(imagePath, index) {
    const card = document.createElement("div");
    card.classList.add("card");
    card.dataset.index = index;

    const img = document.createElement("img");
    img.src = imagePath;

    card.appendChild(img);
    card.addEventListener("click", () => flipCard(card));
    gameBoard.appendChild(card);
  }

  function flipCard(card) {
    if (!flippedCards.includes(card) && !matchedCards.includes(card)) {
      card.classList.add("flipped");
      card.classList.add("flipped2");
      flippedCards.push(card);

      if (flippedCards.length === 2) {
        setTimeout(checkMatch, 1000);
      }
    }
  }

  function checkMatch() {
    const [card1, card2] = flippedCards;
    const img1 = card1.querySelector("img").src;
    const img2 = card2.querySelector("img").src;

    if (img1 === img2) {
      matchedCards.push(card1, card2);
      card1.classList.add("success");
      card2.classList.add("success");
      matchCount++;
      matchCountDiv.textContent = `Matches: ${matchCount}`;
      successText.style.display = "block";
      setTimeout(() => {
        successText.style.display = "none";
      }, 2000);

      if (matchedCards.length === images.length) {
        alert("Tu as gagné !");
      }
    } else {
      card1.classList.remove("flipped");
      card2.classList.remove("flipped");
      card1.classList.remove("flipped2");
      card2.classList.remove("flipped2");
      nulCount++;
      nulDiv.textContent = `Essais ratés: ${nulCount}`;
    }
    flippedCards = [];
  }

  images.forEach(createCard);
});
