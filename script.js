const form = document.getElementById("contactForm");
const statusEl = document.getElementById("status");

// CHANGE THIS AFTER BACKEND DEPLOY
const API_URL = "https://nulleinstech-api.onrender.com/contact";


form.addEventListener("submit", async (e) => {
  e.preventDefault();
  statusEl.textContent = "Sending...";

  const formData = new FormData(form);

  try {
    const res = await fetch(API_URL, {
      method: "POST",
      body: formData
    });

    if (!res.ok) throw new Error("Submission failed");

    statusEl.textContent =
      "Thank you! Your message has been received. The NullEinsTech team will contact you shortly.";
    form.reset();
  } catch (err) {
    statusEl.textContent =
      "Something went wrong. Please try again later.";
  }
});
