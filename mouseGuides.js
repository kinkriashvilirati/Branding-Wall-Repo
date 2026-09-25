const mouseGuideStage = document.querySelector('#stage');

if (mouseGuideStage) {
  const horizontalGuide = document.createElement('div');
  const verticalGuide = document.createElement('div');

  horizontalGuide.className = 'mouse-guide mouse-guide-horizontal';
  verticalGuide.className = 'mouse-guide mouse-guide-vertical';
  horizontalGuide.setAttribute('aria-hidden', 'true');
  verticalGuide.setAttribute('aria-hidden', 'true');

  mouseGuideStage.append(horizontalGuide, verticalGuide);

  mouseGuideStage.addEventListener('pointermove', (event) => {
    const bounds = mouseGuideStage.getBoundingClientRect();
    const xPercent = ((event.clientX - bounds.left) / bounds.width) * 100;
    const yPercent = ((event.clientY - bounds.top) / bounds.height) * 100;

    mouseGuideStage.style.setProperty('--mouse-x', `${xPercent}%`);
    mouseGuideStage.style.setProperty('--mouse-y', `${yPercent}%`);
    mouseGuideStage.classList.add('pointer-active');
  });

  mouseGuideStage.addEventListener('pointerleave', () => {
    mouseGuideStage.classList.remove('pointer-active');
  });
}
