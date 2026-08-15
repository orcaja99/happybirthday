// const dateEl = document.getElementById("date");
// dateEl.textContent = new Intl.DateTimeFormat("en-US", {
//   month:"long", day:"numeric", year:"numeric"
// }).format(new Date());

const candles = [...document.querySelectorAll(".candle")];
const wish = document.getElementById("wish");

candles.forEach(c => c.addEventListener("click", () => {

  c.classList.toggle("lit");

  const remaining = candles.filter(
    x => x.classList.contains("lit")
  ).length;

  if (!remaining) {

    wish.textContent = "Wish made. ✦";
    wish.classList.add("pop");

    createConfetti();

  } else {

    wish.textContent = "Make a wish.";
    wish.classList.remove("pop");

  }

}));

function createConfetti(target = wish) {

  const colors = [
    "#fff4a8",
    "#ffe4b5",
    "#d8c3a5",
    "#f4f0e7",
    "#c9a98a",
    "#ffffff"
  ];

  const rect = target.getBoundingClientRect();

  for (let i = 0; i < 45; i++) {

    const confetti = document.createElement("span");

    confetti.className = "confetti";

    confetti.style.left =
      `${rect.left + rect.width / 2}px`;

    confetti.style.top =
      `${rect.top + rect.height / 2}px`;

    confetti.style.setProperty(
      "--x",
      `${-120 + Math.random() * 240}px`
    );

    confetti.style.setProperty(
      "--y",
      `${-100 + Math.random() * 200}px`
    );

    confetti.style.setProperty(
      "--rotate",
      `${Math.random() * 720 - 360}deg`
    );

    confetti.style.background =
      colors[
        Math.floor(Math.random() * colors.length)
      ];

    confetti.style.animationDelay =
      `${Math.random() * 0.15}s`;

    document.body.appendChild(confetti);

    setTimeout(() => {
      confetti.remove();
    }, 1600);
  }
}

const gifts = {
  1: ["A tiny reminder", "No matter how tired life gets, I hope you always remember how loved and appreciated you are."],
  2: ["A little promise", "I once promised to make you happy and make things right. So I'm going to keep that promise and do my very best."],
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

  loveButton.innerHTML =
    "<span>Love Sent</span><span>✓</span>";

  loveStatus.textContent =
    "✦ sent with all my heart";

  createConfetti(loveButton);

};



const videoModal = document.getElementById("videoModal");
const closeVideoModal = document.getElementById("closeVideoModal");
const giftVideo = document.getElementById("giftVideo");

document.getElementById("specialButton").onclick = () => {

  videoModal.classList.add("open");
  videoModal.setAttribute("aria-hidden", "false");

  giftVideo.currentTime = 0;

  giftVideo.play().catch(() => {
    console.log("Video membutuhkan interaksi user.");
  });
};

closeVideoModal.onclick = () => {

  videoModal.classList.remove("open");
  videoModal.setAttribute("aria-hidden", "true");

  giftVideo.pause();
  giftVideo.currentTime = 0;
};

videoModal.addEventListener("click", e => {

  if (e.target === videoModal) {
    closeVideoModal.click();
  }

}); 

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

// =========================
// MUSIC
// =========================

const birthdayMusic =
  document.getElementById("birthdayMusic");

const melodyButton =
  document.getElementById("melodyButton");

const equalizer =
  document.getElementById("equalizer");

let playing = false;

async function setMusicState(isPlaying) {
  playing = isPlaying;

  if (melodyButton) {
    melodyButton.innerHTML = isPlaying
      ? 'pause the melody <span>Ⅱ</span>'
      : 'play the melody <span>♪</span>';
  }

  if (equalizer) {
    equalizer.classList.toggle("active", isPlaying);
  }
}

async function startMusic() {
  if (!birthdayMusic || playing) {
    return;
  }

  try {
    await birthdayMusic.play();
    setMusicState(true);
  } catch (error) {
    console.log(
      "Music blocked until the next user gesture on mobile.",
      error
    );
  }
}

async function stopMusic() {
  if (!birthdayMusic) {
    return;
  }

  birthdayMusic.pause();
  setMusicState(false);
}

async function toggleMusic() {
  if (playing) {
    await stopMusic();
    return;
  }

  await startMusic();
}

if (melodyButton) {
  melodyButton.addEventListener("click", async (event) => {
    event.preventDefault();
    await toggleMusic();
  });

  document.addEventListener(
    "pointerdown",
    () => {
      if (!playing) {
        startMusic();
      }
    },
    { once: true }
  );
}


// =========================
// KALAU LAGU SELESAI
// =========================

birthdayMusic.addEventListener(
  "ended",
  () => {
    setMusicState(false);
  }
);


// =========================
// AUTOPLAY DARI START PAGE
// =========================

window.addEventListener(
  "DOMContentLoaded",
  async () => {
    const shouldStart =
      sessionStorage.getItem("birthdayMusicStarted") === "true";

    if (!shouldStart) {
      return;
    }

    sessionStorage.removeItem("birthdayMusicStarted");

    try {
      await startMusic();
    } catch (error) {
      console.log(
        "Autoplay ditahan browser; tunggu klik user:",
        error
      );
    }
  }
);


// =========================
// FIREFLIES / KUNANG-KUNANG
// =========================

const fireflies = document.getElementById("fireflies");

for (let i = 0; i < 35; i++) {
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


// =========================
// FLOATING BALLOONS (terbang ke atas, random)
// =========================

const floatingBalloons = document.getElementById("floatingBalloons");

if (floatingBalloons) {
  const BALLOON_COUNT = 5;

  for (let i = 0; i < BALLOON_COUNT; i++) {
    const balloon = document.createElement("span");

    balloon.className = "floating-balloon";

    /* Posisi horizontal awal, random di seluruh lebar layar */
    balloon.style.setProperty(
      "--left",
      `${Math.random() * 100}%`
    );

    /* Ukuran balon random */
    const size = 34 + Math.random() * 30;

    balloon.style.setProperty(
      "--size",
      `${size}px`
    );

    /* Durasi terbang, tiap balon beda kecepatan */
    balloon.style.setProperty(
      "--duration",
      `${12 + Math.random() * 10}s`
    );

    /* Delay awal supaya tidak muncul bersamaan */
    balloon.style.setProperty(
      "--delay",
      `${Math.random() * -20}s`
    );

    /* Opacity max saat melayang */
    balloon.style.setProperty(
      "--opacity",
      `${0.55 + Math.random() * 0.4}`
    );

    /* Goyangan kiri-kanan selagi naik */
    balloon.style.setProperty(
      "--drift-1",
      `${-30 + Math.random() * 60}px`
    );

    balloon.style.setProperty(
      "--drift-2",
      `${-40 + Math.random() * 80}px`
    );

    balloon.style.setProperty(
      "--drift-3",
      `${-30 + Math.random() * 60}px`
    );

    balloon.style.setProperty(
      "--drift-4",
      `${-45 + Math.random() * 90}px`
    );

    floatingBalloons.appendChild(balloon);
  }
}


let lastSparkleX = 0;
let lastSparkleY = 0;
let sparkleFrame = false;

const sparkleLayer = document.createElement("div");
sparkleLayer.setAttribute("aria-hidden", "true");
sparkleLayer.style.position = "fixed";
sparkleLayer.style.inset = "0";
sparkleLayer.style.pointerEvents = "none";
sparkleLayer.style.zIndex = "9999";
document.body.appendChild(sparkleLayer);

document.addEventListener("pointermove", (event) => {
  const x = event.clientX;
  const y = event.clientY;

  const distance = Math.hypot(
    x - lastSparkleX,
    y - lastSparkleY
  );

  if (distance < 25) {
    return;
  }

  lastSparkleX = x;
  lastSparkleY = y;

  if (sparkleFrame) {
    return;
  }

  sparkleFrame = true;

  requestAnimationFrame(() => {
    sparkleFrame = false;

    const sparkle = document.createElement("span");
    sparkle.className = "mouse-sparkle";
    sparkle.style.left = `${x}px`;
    sparkle.style.top = `${y}px`;

    const size = 0.5 + Math.random() * 1;
    sparkle.style.transform = `translate(-50%, -50%) scale(${size})`;

    sparkleLayer.appendChild(sparkle);

    if (sparkleLayer.children.length > 18) {
      sparkleLayer.firstElementChild?.remove();
    }

    setTimeout(() => sparkle.remove(), 700);
  });
});

