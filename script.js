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

function playCardIntro() {
  const cardIntro = document.querySelector('#card-intro');
  if (!cardIntro) return;

  // Removing and restoring the class also lets the full demo replay this later.
  cardIntro.classList.remove('is-playing');
  void cardIntro.offsetWidth;
  cardIntro.classList.add('is-playing');
}

playCardIntro();
