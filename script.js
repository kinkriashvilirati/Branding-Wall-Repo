const stage = document.querySelector('#stage');
const toggleButton = document.querySelector('#toggle-guides');
const coordinates = document.querySelector('#coordinates');

function toggleGuides() {
  const guidesAreVisible = stage.classList.toggle('show-guides');

  toggleButton.textContent = guidesAreVisible ? 'Hide guides (G)' : 'Show guides (G)';
  toggleButton.setAttribute('aria-pressed', String(guidesAreVisible));
}

toggleButton.addEventListener('click', toggleGuides);

document.addEventListener('keydown', (event) => {
  if (event.key.toLowerCase() === 'g') toggleGuides();
});

stage.addEventListener('pointermove', (event) => {
  const bounds = stage.getBoundingClientRect();

  // Convert screen position to the original SVG artboard (595.28 × 841.89).
  const x = ((event.clientX - bounds.left) / bounds.width) * 595.28;
  const y = ((event.clientY - bounds.top) / bounds.height) * 841.89;

  coordinates.value = `x: ${Math.round(x)}, y: ${Math.round(y)}`;
});

stage.addEventListener('pointerleave', () => {
  coordinates.value = 'x: —, y: —';
});

const cardIntro = document.querySelector('#card-intro');
const middleCard = cardIntro?.querySelector('.intro-card-center');
const middleCardInner = middleCard?.querySelector('.intro-card-inner');
const introHand = cardIntro?.querySelector('.intro-hand');
let autoReactionTimer;

function playCardIntro() {
  if (!cardIntro) return;

  // Removing and restoring the class also lets the full demo replay this later.
  clearTimeout(autoReactionTimer);
  cardIntro.classList.remove('is-playing', 'is-selectable', 'is-awaiting-choice', 'is-selected', 'is-reacted');
  middleCard.tabIndex = -1;
  void cardIntro.offsetWidth;
  cardIntro.classList.add('is-playing');
}

function reactToCard(source) {
  if (!cardIntro?.classList.contains('is-selectable') || cardIntro.classList.contains('is-reacted')) return;

  clearTimeout(autoReactionTimer);
  cardIntro.classList.remove('is-awaiting-choice', 'is-selectable');
  cardIntro.classList.add('is-reacted');
  if (source === 'user') cardIntro.classList.add('is-selected');
  middleCard.tabIndex = -1;
  middleCard.blur();
}

middleCardInner?.addEventListener('animationend', (event) => {
  if (event.animationName !== 'card-reveal') return;
  cardIntro.classList.add('is-selectable');
  middleCard.tabIndex = 0;
});

introHand?.addEventListener('animationend', (event) => {
  if (event.animationName !== 'hand-tap' || cardIntro.classList.contains('is-reacted')) return;
  cardIntro.classList.add('is-awaiting-choice');

  const waitSeconds = parseFloat(getComputedStyle(cardIntro).getPropertyValue('--auto-reaction-wait'));
  autoReactionTimer = setTimeout(() => reactToCard('auto'), waitSeconds * 1000);
});

middleCard?.addEventListener('click', () => {
  reactToCard('user');
});

playCardIntro();
