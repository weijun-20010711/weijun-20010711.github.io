'use strict';

document.querySelectorAll('.mobile-nav a').forEach(link => {
  link.addEventListener('click', () => { link.closest('details').open = false; });
});

// One selection handler for the existing operating, process and image controls.
function bindSelection(selector, update) {
  const buttons = [...document.querySelectorAll(selector)];
  buttons.forEach(button => button.addEventListener('click', () => {
    buttons.forEach(other => {
      const selected = other === button;
      other.classList.toggle('active', selected);
      other.setAttribute('aria-pressed', String(selected));
    });
    update(button.dataset);
  }));
}

function setText(id, value) {
  document.getElementById(id).textContent = value;
}

bindSelection('.process-step', data => {
  setText('process-title', data.title);
  setText('process-copy', data.copy);
});
bindSelection('.flow-step', data => {
  setText('flow-stage', data.stage);
  setText('flow-title', data.title);
  setText('flow-copy', data.copy);
  ['1', '2', '3'].forEach(number => setText(`proof-${number}`, data[`proof${number}`]));
});
bindSelection('.stage-btn', data => {
  const image = document.getElementById('garden-image');
  image.src = data.img;
  image.alt = data.alt;
  if (image.parentElement.matches('a')) image.parentElement.href = data.img;
});

// Images retain working file links when JavaScript is unavailable.
const imageLinks = [...document.querySelectorAll('a[href]')].filter(link =>
  link.querySelector('img') && /\.(?:png|jpe?g|webp)$/i.test(link.pathname)
);
if (imageLinks.length && typeof HTMLDialogElement !== 'undefined') {
  const viewer = document.createElement('dialog');
  viewer.className = 'image-viewer';
  viewer.setAttribute('aria-labelledby', 'viewer-caption');
  viewer.innerHTML = `
    <div class="viewer-bar">
      <p id="viewer-caption" aria-live="polite"></p>
      <div>
        <button type="button" data-action="previous">Previous</button>
        <button type="button" data-action="next">Next</button>
        <button type="button" data-action="close" autofocus>Close</button>
      </div>
    </div>
    <img alt="">
    <p class="image-status" role="status"></p>
    <a target="_blank" rel="noopener">Open original image</a>`;
  document.body.append(viewer);
  const image = viewer.querySelector('img');
  const status = viewer.querySelector('.image-status');
  let current = 0;
  let returnFocus;

  function show(index) {
    current = (index + imageLinks.length) % imageLinks.length;
    const link = imageLinks[current];
    const alt = link.querySelector('img').alt;
    setText('viewer-caption', `${alt} (${current + 1} of ${imageLinks.length})`);
    image.alt = alt;
    status.textContent = 'Loading full-size image…';
    image.src = link.href;
    viewer.querySelector('a').href = link.href;
  }

  image.addEventListener('load', () => { status.textContent = ''; });
  image.addEventListener('error', () => {
    status.textContent = 'The preview could not load. Open the original image below or choose another image.';
  });
  imageLinks.forEach((link, index) => link.addEventListener('click', event => {
    if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    returnFocus = link;
    show(index);
    viewer.showModal();
  }));
  viewer.addEventListener('click', event => {
    const action = event.target.closest('button')?.dataset.action;
    if (action === 'close') viewer.close();
    if (action === 'previous') show(current - 1);
    if (action === 'next') show(current + 1);
  });
  viewer.addEventListener('keydown', event => {
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault();
      show(current + (event.key === 'ArrowRight' ? 1 : -1));
    }
  });
  viewer.addEventListener('close', () => returnFocus?.focus());
}

// Section navigation uses visibility rather than a per-frame scroll listener.
const sectionLinks = [...document.querySelectorAll('.links a[href^="#"]')];
if (sectionLinks.length && 'IntersectionObserver' in window) {
  const clearNavigation = () => sectionLinks.forEach(link => link.removeAttribute('aria-current'));
  document.querySelectorAll('a[href="#top"]').forEach(link => link.addEventListener('click', clearNavigation));
  const observer = new IntersectionObserver(entries => {
    const top = document.getElementById('top');
    if (top && top.getBoundingClientRect().bottom > 0 && top.getBoundingClientRect().top < innerHeight * .45) {
      clearNavigation();
      return;
    }
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      sectionLinks.forEach(link => {
        if (link.hash === `#${entry.target.id}`) link.setAttribute('aria-current', 'location');
        else link.removeAttribute('aria-current');
      });
    }
  }, { rootMargin: '-15% 0px -55% 0px' });
  sectionLinks.forEach(link => {
    const section = document.getElementById(link.hash.slice(1));
    if (section) observer.observe(section);
  });
  const hero = document.getElementById('top');
  if (hero) observer.observe(hero);
}

const emailCopy = document.querySelector('.email-copy');
if (emailCopy) {
  emailCopy.hidden = false;
  emailCopy.addEventListener('click', async () => {
    const status = document.querySelector('.hero-feedback');
    try {
      await navigator.clipboard.writeText('weijunhoong@gmail.com');
      status.textContent = 'Email copied: weijunhoong@gmail.com';
    } catch {
      status.textContent = 'Copy was unavailable. Use the email link above.';
    }
  });
}
