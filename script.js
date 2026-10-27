/* ========================================
   BRYSON ♡ LEON
   MENSIVERSARY SCRAPBOOK
   Soft Grey & Silver Edition
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
const secretMessage = document.getElementById("secretMessage");
const replayBtn = document.getElementById("replayBtn");


/* =========================
   SETTINGS
========================= */

const SECRET_PIN = "0810";

const QUIZ_ANSWER_1 = "bryson";
const QUIZ_ANSWER_2 = "forever, just us";

// Relationship anniversary: 8 October 2026
const START_DATE = new Date("2026-10-08T00:00:00");

const TOTAL_STARS = stars.length;


/* =========================
   LOADER
========================= */

window.addEventListener("load", () => {

    setTimeout(() => {

        if (!loader) return;

        loader.style.opacity = "0";

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

        updateCounter();

    } else {

        pinError.textContent = "Wrong code, try again 🤍";

        pinInput.value = "";
        pinInput.focus();

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

pinInput.addEventListener("input", () => {

    pinInput.value = pinInput.value
        .replace(/\D/g, "")
        .slice(0, 4);

});


/* =========================
   OPEN OUR STORY + MUSIC
========================= */

openBookBtn.addEventListener("click", async () => {

    if (bgMusic) {

        try {
            await bgMusic.play();
        } catch (error) {
            console.log("Tap play to start the music.");
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

            openLetter.setAttribute("aria-expanded", "false");

        } else {

            letterPaper.style.display = "block";

            openLetter.setAttribute("aria-expanded", "true");

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
   QUIZ
========================= */

function normalizeAnswer(value) {

    return value
        .toLowerCase()
        .trim()
        .replace(/\s+/g, " ");

}

function checkAnswers() {
    const firstAnswer = normalizeAnswer(answer1.value);
    const secondAnswer = normalizeAnswer(answer2.value);

    if (!firstAnswer || !secondAnswer) {
        quizResult.textContent =
            "Fill in both little answers first. 🤍";
        quizResult.style.color = "#777780";
        return;
    }

    const correctFirst =
        firstAnswer === "forever, just us";

    const correctSecond = [
        "8 oktober 2026",
        "08 oktober 2026",
        "october 8, 2026",
        "october 8 2026",
        "8 october 2026",
        "08 october 2026",
        "8th october 2026",
        "october 8th, 2026"
    ].includes(secondAnswer);

    if (correctFirst && correctSecond) {
        quizResult.style.color = "#62626c";
        quizResult.textContent =
            "You remembered, my favorite person. ♡";

        setTimeout(() => {
            specialMemory.scrollIntoView({
                behavior: "smooth",
                block: "center"
            });
        }, 700);
    } else {
        quizResult.style.color = "#85858e";
        quizResult.textContent =
            "Almost there, take another little guess. 🤍";
    }
}

checkQuiz.addEventListener("click", checkAnswers);

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

    });

}


/* =========================
   RELATIONSHIP COUNTER
========================= */

function updateCounter() {

    const now = new Date();

    const difference = Math.max(
        0,
        now.getTime() - START_DATE.getTime()
    );

    const totalMinutes = Math.floor(
        difference / (1000 * 60)
    );

    const totalHours = Math.floor(
        difference / (1000 * 60 * 60)
    );

    const days = Math.floor(
        difference / (1000 * 60 * 60 * 24)
    );

    const hours = totalHours % 24;
    const minutes = totalMinutes % 60;

    daysElement.textContent = days;
    hoursElement.textContent = hours;
    minutesElement.textContent = minutes;

}

updateCounter();

setInterval(updateCounter, 1000);


/* =========================
   SECRET STARS
========================= */

let clickedStars = 0;

function updateStarProgress() {

    const starProgress = document.getElementById("starProgress");

    if (starProgress) {

        starProgress.textContent =
            `Find all the stars (${clickedStars}/${TOTAL_STARS})`;

    }

}

stars.forEach((star) => {

    star.setAttribute("role", "button");
    star.setAttribute("tabindex", "0");
    star.setAttribute("aria-pressed", "false");

    function collectStar() {

        if (star.classList.contains("collected")) {
            return;
        }

        star.classList.add("collected", "active");
        star.setAttribute("aria-pressed", "true");

        clickedStars++;

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

        updateStarProgress();

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

        if (event.key === "Enter" || event.key === " ") {

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
    }

    // Reset quiz.
    answer1.value = "";
    answer2.value = "";
    quizResult.textContent = "";

    // Reset secret stars.
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

    // Return to the beginning.
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
