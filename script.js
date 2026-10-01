const player = document.querySelector(".player");
const playerStage = document.querySelector(".player-stage");
const screenShell = document.querySelector(".screen-shell");
const gameFrame = document.querySelector(".screen-shell iframe");
const orientationButton = document.querySelector(".orientation-button");
const closeButton = document.querySelector(".close-button");
const projectButtons = document.querySelectorAll(".project-button");

let currentOrientation = "portrait";

function resizeGame() {
  const landscapeMode = currentOrientation === "landscape";
  const gameWidth = landscapeMode ? 1920 : 1080;
  const gameHeight = landscapeMode ? 1080 : 1920;
  const stageBounds = playerStage.getBoundingClientRect();
  const horizontalPadding = window.innerWidth < 600 ? 44 : 100;
  const verticalPadding = window.innerWidth < 600 ? 44 : 80;
  const frameSize = 20;
  const widthScale = (stageBounds.width - horizontalPadding - frameSize)
    / gameWidth;
  const heightScale = (stageBounds.height - verticalPadding - frameSize)
    / gameHeight;
  const gameScale = Math.min(widthScale, heightScale, 1);

  screenShell.style.width = `${gameWidth * gameScale}px`;
  screenShell.style.height = `${gameHeight * gameScale}px`;
  gameFrame.style.width = `${gameWidth}px`;
  gameFrame.style.height = `${gameHeight}px`;
  gameFrame.style.transform = `scale(${gameScale})`;
}

function setOrientation(orientation) {
  currentOrientation = orientation;
  const portraitMode = currentOrientation === "portrait";

  orientationButton.classList.toggle("portrait-active", portraitMode);
  resizeGame();
}

function openPlayer(project) {
  gameFrame.src = project.dataset.game;
  player.showModal();
  setOrientation("portrait");
}

function closePlayer() {
  player.close();
  gameFrame.src = "about:blank";
}

projectButtons.forEach((projectButton) => {
  projectButton.addEventListener("click", () => {
    openPlayer(projectButton.closest(".project"));
  });
});

orientationButton.addEventListener("click", () => {
  const nextOrientation = currentOrientation === "landscape"
    ? "portrait"
    : "landscape";
  setOrientation(nextOrientation);
});

closeButton.addEventListener("click", closePlayer);
window.addEventListener("resize", resizeGame);

player.addEventListener("cancel", (event) => {
  event.preventDefault();
});
