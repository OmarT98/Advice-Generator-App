async function getAdvice() {
  try {
    const response = await fetch("https://api.adviceslip.com/advice");
    const data = await response.json();
    return data.slip;
  } catch (error) {
    console.error("Error fetching advice:", error);
  }
}

async function displayAdvice() {
  const advice = await getAdvice();
  document.getElementById("advice-number").textContent = `ADVICE #${advice.id}`;
  document.getElementById("advice-quote").textContent = `"${advice.advice}"`;
}

document.getElementById("dice").addEventListener("click", async function () {
  const diceIcon = this;
  const quoteElement = document.getElementById("advice-quote");

  diceIcon.classList.add("active");
  quoteElement.classList.add("fade-out");

  setTimeout(async () => {
    await displayAdvice();
    quoteElement.classList.replace("fade-out", "fade-in");
    setTimeout(() => diceIcon.classList.remove("active"), 500);
  }, 500);
});

displayAdvice();
