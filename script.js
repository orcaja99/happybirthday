const dateEl = document.getElementById("date");
dateEl.textContent = new Intl.DateTimeFormat("en-US", {
  month:"long", day:"numeric", year:"numeric"
}).format(new Date());

const candles = [...document.querySelectorAll(".candle")];
const wish = document.getElementById("wish");
candles.forEach(c => c.addEventListener("click", () => {
  c.classList.toggle("lit");
  const remaining = candles.filter(x => x.classList.contains("lit")).length;
  if (!remaining) {
    wish.textContent = "Wish made. ✦";
    wish.classList.add("pop");
  } else {
    wish.textContent = "Make a wish.";
  }
}));

const gifts = {
  1: ["A tiny reminder", "No matter how tired life gets, I hope you always remember how loved and appreciated you are."],
  2: ["A little promise", "More laughs, more adventures, more memories. There are still so many beautiful days ahead."],
  3: ["One more thing", "Today is yours. Make a wish and enjoy every second of it. ♡"]
};
const modal = document.getElementById("giftModal");
const modalTitle = document.getElementById("modalTitle");
const modalText = document.getElementById("modalText");

function openGift(n){
  modalTitle.textContent = gifts[n][0];
  modalText.textContent = gifts[n][1];
  modal.classList.add("open");
  modal.setAttribute("aria-hidden","false");
}
document.querySelectorAll(".gift").forEach(g => g.addEventListener("click", () => openGift(g.dataset.gift)));
document.getElementById("closeModal").onclick = () => {
  modal.classList.remove("open"); modal.setAttribute("aria-hidden","true");
};
modal.addEventListener("click", e => { if(e.target === modal) document.getElementById("closeModal").click(); });





const loveButton = document.getElementById("loveButton");
const loveStatus = document.getElementById("loveStatus");
loveButton.onclick = () => {
  loveButton.classList.add("sent");
  loveButton.innerHTML = "<span>Love Sent</span><span>✓</span>";
  loveStatus.textContent = "✦ sent with all my heart";
};

document.getElementById("specialButton").onclick = () => openGift(3);

const observer = new IntersectionObserver(entries => {
  entries.forEach(e => { if(e.isIntersecting) e.target.classList.add("visible"); });
},{threshold:.12});
document.querySelectorAll(".reveal").forEach((el,i) => {
  el.style.transitionDelay = `${Math.min(i*50,300)}ms`;
  observer.observe(el);
});

// =========================
// MUSIC
// =========================

const birthdayMusic = document.getElementById("birthdayMusic");
const musicToggle = document.getElementById("musicToggle");
const melodyButton = document.getElementById("melodyButton");
const equalizer = document.getElementById("equalizer");

let playing = false;

async function toggleMusic() {
  try {
    if (playing) {
      birthdayMusic.pause();

      playing = false;

      musicToggle.textContent = "♪";

      if (melodyButton) {
        melodyButton.innerHTML =
          'play the melody <span>♪</span>';
      }

      if (equalizer) {
        equalizer.classList.remove("active");
      }

    } else {
      await birthdayMusic.play();

      playing = true;

      musicToggle.textContent = "Ⅱ";

      if (melodyButton) {
        melodyButton.innerHTML =
          'pause the melody <span>Ⅱ</span>';
      }

      if (equalizer) {
        equalizer.classList.add("active");
      }
    }

  } catch (error) {
    console.error("Music gagal dimainkan:", error);
  }
}


// Tombol ♪ di header
musicToggle.addEventListener("click", toggleMusic);


// Tombol "play the melody"
if (melodyButton) {
  melodyButton.addEventListener("click", toggleMusic);
}


// Kalau lagu selesai
birthdayMusic.addEventListener("ended", () => {
  playing = false;

  musicToggle.textContent = "♪";

  if (melodyButton) {
    melodyButton.innerHTML =
      'play the melody <span>♪</span>';
  }

  if (equalizer) {
    equalizer.classList.remove("active");
  }
});



// =========================
// FIREFLIES / KUNANG-KUNANG
// =========================

const fireflies = document.getElementById("fireflies");

for (let i = 0; i < 60; i++) {
  const firefly = document.createElement("span");

  firefly.className = "firefly";

  firefly.style.left = `${Math.random() * 100}%`;
  firefly.style.top = `${Math.random() * 100}%`;

  firefly.style.setProperty(
    "--duration",
    `${8 + Math.random() * 12}s`
  );

  firefly.style.setProperty(
    "--opacity",
    `${0.35 + Math.random() * 0.65}`
  );

  firefly.style.setProperty(
    "--move-x-1",
    `${-50 + Math.random() * 100}px`
  );

  firefly.style.setProperty(
    "--move-y-1",
    `${-50 + Math.random() * 100}px`
  );

  firefly.style.setProperty(
    "--move-x-2",
    `${-100 + Math.random() * 200}px`
  );

  firefly.style.setProperty(
    "--move-y-2",
    `${-100 + Math.random() * 200}px`
  );

  firefly.style.setProperty(
    "--move-x-3",
    `${-70 + Math.random() * 140}px`
  );

  firefly.style.setProperty(
    "--move-y-3",
    `${-100 + Math.random() * 200}px`
  );

  firefly.style.setProperty(
    "--move-x-4",
    `${-120 + Math.random() * 240}px`
  );

  firefly.style.setProperty(
    "--move-y-4",
    `${-120 + Math.random() * 240}px`
  );

  firefly.style.animationDelay =
    `${Math.random() * -15}s`;

  firefly.style.width =
    `${2 + Math.random() * 4}px`;

  firefly.style.height =
    firefly.style.width;

  fireflies.appendChild(firefly);
}


let lastSparkleX = 0;
let lastSparkleY = 0;

document.addEventListener("mousemove", (event) => {

  const x = event.clientX;
  const y = event.clientY;

  // Jangan terlalu sering membuat sparkle
  const distance = Math.hypot(
    x - lastSparkleX,
    y - lastSparkleY
  );

  if (distance < 25) {
    return;
  }

  lastSparkleX = x;
  lastSparkleY = y;

  const sparkle = document.createElement("span");

  sparkle.className = "mouse-sparkle";

  sparkle.style.left = `${x}px`;
  sparkle.style.top = `${y}px`;

  // Ukuran random
  const size = 0.5 + Math.random() * 1;

  sparkle.style.transform =
    `translate(-50%, -50%) scale(${size})`;

  document.body.appendChild(sparkle);


  setTimeout(() => {
    sparkle.remove();
  }, 700);
});
