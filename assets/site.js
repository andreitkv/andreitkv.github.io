document.documentElement.classList.add('js');

const revealItems = document.querySelectorAll('.reveal');

if ('IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.12 });

  revealItems.forEach((item) => revealObserver.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add('is-visible'));
}

document.querySelectorAll('.feature-video').forEach((wrapper) => {
  const video = wrapper.querySelector('video');
  const button = wrapper.querySelector('.video-toggle');

  if (!video || !button) return;

  const updateButton = () => {
    button.textContent = video.paused ? 'Play' : 'Pause';
    button.setAttribute('aria-label', `${video.paused ? 'Play' : 'Pause'} ${video.getAttribute('aria-label') || 'feature'} video`);
  };

  button.addEventListener('click', () => {
    if (video.paused) {
      video.play().catch(() => {});
    } else {
      video.pause();
    }
    updateButton();
  });

  video.addEventListener('play', updateButton);
  video.addEventListener('pause', updateButton);
});

document.querySelectorAll('[data-preview-card]').forEach((card) => {
  const video = card.querySelector('.catalog-preview');

  if (!video) return;

  const playPreview = () => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    video.play()
      .then(() => card.classList.add('is-previewing'))
      .catch(() => card.classList.remove('is-previewing'));
  };

  const stopPreview = () => {
    card.classList.remove('is-previewing');
    video.pause();
    video.currentTime = 0;
  };

  card.addEventListener('pointerenter', playPreview);
  card.addEventListener('pointerleave', stopPreview);
  card.addEventListener('focusin', playPreview);
  card.addEventListener('focusout', stopPreview);
});
