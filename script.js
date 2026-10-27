/* ========================================
   BRYSON ♡ LEON
   MENSIVERSARY SCRAPBOOK
   Theme: Soft Grey & Silver
======================================== */


/* =========================
   ELEMENTS
========================= */

const loader = document.getElementById("loader");

const pinScreen = document.getElementById("pinScreen");
const website = document.getElementById("website");

const pinInput = document.getElementById("pinInput");
const unlockBtn = document.getElementById("unlockBtn");
const pinError = document.getElementById("pinError");

const bgMusic = document.getElementById("bgMusic");

const openBookBtn = document.getElementById("openBookBtn");

const openLetter = document.getElementById("openLetter");
const letterPaper = document.getElementById("letterPaper");

const checkQuiz = document.getElementById("checkQuiz");
const answer1 = document.getElementById("answer1");
const answer2 = document.getElementById("answer2");
const quizResult = document.getElementById("quizResult");

const specialMemory = document.getElementById("specialMemory");
const specialPhoto = document.getElementById("specialPhoto");
const revealBtn = document.getElementById("revealBtn");

const daysElement = document.getElementById("days");
const hoursElement = document.getElementById("hours");
const minutesElement = document.getElementById("minutes");

const stars = document.querySelectorAll(".secret-star");
const starProgress = document.getElementById("starProgress");
const secretMessage = document.getElementById("secretMessage");

const replayBtn = document.getElementById("replayBtn");


/* =========================
   SETTINGS
========================= */

// Private access code
const SECRET_PIN = "0810";

// Quiz answers
const QUIZ_ANSWER_1 = "bryson";
const QUIZ_ANSWER_2 = "leon";

// Relationship starting date
const START_DATE = new Date("2026-03-03T00:00:00");

// Total secret stars
const TOTAL_STARS = stars.length;


/* =========================
   LOADER
========================= */

window.addEventListener("load", () => {

    setTimeout(() => {

        if (!loader) return;

        loader.style.opacity = "0";
        loader.style.visibility = "hidden";

        setTimeout(() => {
            loader.style.display = "none";
        }, 800);

    }, 1000);

});


/* =========================
   PIN SYSTEM
========================= */

function unlockWebsite() {

    const enteredPin = pinInput.value.trim();

    if (enteredPin === SECRET_PIN) {

        pinError.textContent = "";
        pinScreen.style.display = "none";
        website.style.display = "block";

        // Prevent the PIN screen from being submitted again.
        pinInput.blur();

        // Start the counter after access is granted.
        updateCounter();

    } else {

        pinError.textContent = "Wrong code, try again 🤍";

        pinInput.value = "";
        pinInput.focus();

        // Small shake animation for incorrect PIN.
        pinInput.animate(
            [
                { transform: "translateX(0)" },
                { transform: "translateX(-6px)" },
                { transform: "translateX(6px)" },
                { transform: "translateX(-4px)" },
                { transform: "translateX(0)" }
            ],
            {
                duration: 300,
                easing: "ease-in-out"
            }
        );

    }

}

unlockBtn.addEventListener("click", unlockWebsite);

pinInput.addEventListener("keydown", (event) => {

    if (event.key === "Enter") {
        unlockWebsite();
    }

});

// Only allow four numeric digits.
pinInput.addEventListener("input", () => {

    pinInput.value = pinInput.value
        .replace(/\D/g, "")
        .slice(0, 4);

});


/* =========================
   OPEN OUR STORY
========================= */

openBookBtn.addEventListener("click", async () => {

    // Play the selected music after a user interaction.
    if (bgMusic) {

        try {

            await bgMusic.play();

        } catch (error) {

            console.log(
                "Music playback is unavailable. Tap play again to listen."
            );

        }

    }

    document.getElementById("scrapbook").scrollIntoView({
        behavior: "smooth",
        block: "start"
    });

});


/* =========================
   LETTER OPEN / CLOSE
========================= */

if (openLetter && letterPaper) {

    openLetter.addEventListener("click", () => {

        const isOpen =
            window.getComputedStyle(letterPaper).display !== "none";

        if (isOpen) {

            letterPaper.style.display = "none";

            openLetter.setAttribute(
                "aria-expanded",
                "false"
            );

        } else {

            letterPaper.style.display = "block";

            openLetter.setAttribute(
                "aria-expanded",
                "true"
            );

            setTimeout(() => {

                letterPaper.scrollIntoView({
                    behavior: "smooth",
                    block: "center"
                });

            }, 100);

        }

    });

}


/* =========================
   QUIZ SYSTEM
========================= */

// Accepts uppercase/lowercase and extra spaces.
function normalizeAnswer(value) {

    return value
        .toLowerCase()
        .trim()
        .replace(/\s+/g, " ");

}

function checkAnswers() {

    const firstAnswer = normalizeAnswer(answer1.value);
    const secondAnswer = normalizeAnswer(answer2.value);

    // Make sure both questions are answered.
    if (!firstAnswer || !secondAnswer) {

        quizResult.style.color = "#777780";
        quizResult.textContent =
            "Answer both questions first, okay? 🩶";

        return;

    }

    if (
        firstAnswer === QUIZ_ANSWER_1 &&
        secondAnswer === QUIZ_ANSWER_2
    ) {

        quizResult.style.color = "#62626c";

        quizResult.textContent =
            "Perfect! You know your story well. Memory unlocked! 🤍";

        // Scroll to the hidden photo.
        setTimeout(() => {

            specialMemory.scrollIntoView({
                behavior: "smooth",
                block: "center"
            });

        }, 700);

    } else {

        quizResult.style.color = "#85858e";

        quizResult.textContent =
            "Not quite yet. Give it another try, Leon! 🥹";

    }

}

checkQuiz.addEventListener("click", checkAnswers);

// Allow the quiz to be submitted using Enter.
[answer1, answer2].forEach((input) => {

    input.addEventListener("keydown", (event) => {

        if (event.key === "Enter") {
            checkAnswers();
        }

    });

});


/* =========================
   REVEAL SPECIAL MEMORY
========================= */

if (revealBtn && specialPhoto) {

    revealBtn.addEventListener("click", () => {

        specialPhoto.classList.add("show");

        revealBtn.textContent = "Memory Revealed 🤍";

        revealBtn.disabled = true;

        revealBtn.style.opacity = "0.8";
        revealBtn.style.cursor = "default";

    });

}


/* =========================
   RELATIONSHIP COUNTER
========================= */

function updateCounter() {

    const now = new Date();

    let difference = now.getTime() - START_DATE.getTime();

    // Avoid negative values if the date is changed.
    difference = Math.max(0, difference);

    const millisecondsPerSecond = 1000;
    const secondsPerMinute = 60;
    const minutesPerHour = 60;
    const hoursPerDay = 24;

    const totalSeconds = Math.floor(
        difference / millisecondsPerSecond
    );

    const totalMinutes = Math.floor(
        totalSeconds / secondsPerMinute
    );

    const totalHours = Math.floor(
        totalMinutes / minutesPerHour
    );

    const days = Math.floor(
        totalHours / hoursPerDay
    );

    const hours = totalHours % hoursPerDay;

    const minutes = totalMinutes % minutesPerHour;

    daysElement.textContent = days;
    hoursElement.textContent = hours;
    minutesElement.textContent = minutes;

}

// Update the counter immediately.
updateCounter();

// Refresh the counter every second.
setInterval(updateCounter, 1000);


/* =========================
   SECRET STARS
========================= */

let clickedStars = 0;

function updateStarProgress() {

    if (starProgress) {

        starProgress.textContent =
            `Find all the stars (${clickedStars}/${TOTAL_STARS})`;

    }

}

stars.forEach((star) => {

    // Make stars keyboard accessible.
    star.setAttribute("role", "button");
    star.setAttribute("tabindex", "0");
    star.setAttribute("aria-label", "Collect a secret star");

    function collectStar() {

        // Do not count the same star twice.
        if (star.classList.contains("collected")) {
            return;
        }

        star.classList.add("collected");
        star.classList.add("active");

        star.setAttribute("aria-pressed", "true");

        clickedStars++;

        updateStarProgress();

        // Small collection animation.
        star.animate(
            [
                { transform: "scale(1)" },
                { transform: "scale(1.4)" },
                { transform: "scale(1.08)" }
            ],
            {
                duration: 350,
                easing: "ease-out"
            }
        );

        // Reveal the message after collecting all stars.
        if (clickedStars === TOTAL_STARS) {

            secretMessage.style.display = "block";

            setTimeout(() => {

                secretMessage.scrollIntoView({
                    behavior: "smooth",
                    block: "center"
                });

            }, 400);

        }

    }

    star.addEventListener("click", collectStar);

    star.addEventListener("keydown", (event) => {

        if (
            event.key === "Enter" ||
            event.key === " "
        ) {

            event.preventDefault();
            collectStar();

        }

    });

});

updateStarProgress();


/* =========================
   REPLAY MEMORIES
========================= */

replayBtn.addEventListener("click", () => {

    // Close the letter.
    if (letterPaper) {
        letterPaper.style.display = "none";
    }

    if (openLetter) {
        openLetter.setAttribute("aria-expanded", "false");
    }

    // Hide the special photo again.
    if (specialPhoto) {
        specialPhoto.classList.remove("show");
    }

    if (revealBtn) {

        revealBtn.textContent = "Reveal Memory ✨";
        revealBtn.disabled = false;

        revealBtn.style.opacity = "1";
        revealBtn.style.cursor = "pointer";

    }

    // Reset the quiz.
    answer1.value = "";
    answer2.value = "";

    quizResult.textContent = "";

    // Reset the secret stars.
    clickedStars = 0;

    stars.forEach((star) => {

        star.classList.remove("collected", "active");

        star.setAttribute("aria-pressed", "false");

        star.style.opacity = "";
        star.style.transform = "";

    });

    updateStarProgress();

    // Hide the secret message.
    if (secretMessage) {
        secretMessage.style.display = "none";
    }

    // Return to the beginning of the scrapbook.
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

});


/* =========================
   CONSOLE SIGNATURE
========================= */

console.log(
    "%cBryson ♡ Leon",
    "color: #777780; font-size: 22px; font-weight: bold;"
);

console.log(
    "%cA little scrapbook, made with love. 🩶",
    "color: #9999a3; font-size: 12px;"
);
