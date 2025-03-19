const adviceText = document.getElementById("advice-text");
const adviceId = document.getElementById("advice-id");
const loading = document.getElementById("loading");
const advice = document.getElementById("advice");

const displayLoading = async () => {
  advice.classList.toggle("hidden");
  loading.classList.toggle("hidden");
};

const displayData = async (slip) => {
  adviceId.textContent = slip.id;
  adviceText.textContent = slip.advice;
  loading.classList.toggle("hidden");
  advice.classList.toggle("hidden");
};

const getData = async () => {
  const url = "https://api.adviceslip.com/advice";
  displayLoading();
  try {
    const response = await fetch(url, { cache: "no-store" });
    if (!response.ok) {
      throw new Error(
        `Sometimes the internet returns error code ${response.status}`
      );
    }
    const data = await response.json();
    displayData(data.slip);
  } catch (error) {
    const slip = { id: 0, advice: error.message };
    displayData(slip);
    console.error(error.message);
  }
};

getData();
