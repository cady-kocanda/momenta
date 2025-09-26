window.addEventListener('DOMContentLoaded', () => {
  console.log('Momenta app script loaded');

  const app = document.getElementById('app');
  if (!app) return;

  // Clear any existing content
  app.innerHTML = '';

  // Inject minimal style for centered home image
  const style = document.createElement('style');
  style.textContent = `
    body { display: flex; align-items: center; justify-content: center; padding: 24px; background: #fff; }
    #app { width: 100vw; height: 100vh; max-width: 420px; max-height: 90vh; display: flex; align-items: center; justify-content: center; background: #fff3f8; border-radius: 18px; position: relative; }
    .home-img { width: 100%; height: auto; display: block; border-radius: 16px; }
    .menu-btn {
      position: absolute;
      top: 18px;
      left: 18px;
      width: 44px;
      height: 44px;
      background: none;
      border: none;
      padding: 0;
      z-index: 10;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .menu-btn img {
      width: 100%;
      height: 100%;
      object-fit: contain;
      border-radius: 8px;
    }
  `;
  document.head.appendChild(style);

  // Add only the home.png image centered
  const homeImg = document.createElement('img');
  homeImg.src = '/images/Home.png';
  homeImg.alt = 'Home';
  homeImg.className = 'home-img';
  app.appendChild(homeImg);

  // Add hamburger menu button to top left (inline)
  const menuBtn = document.createElement('button');
  menuBtn.className = 'menu-btn';
  menuBtn.title = 'Goals';
  const menuImg = document.createElement('img');
  menuImg.src = '/images/ButtonMenu.png';
  menuImg.alt = 'Goals menu';
  menuBtn.appendChild(menuImg);
  menuBtn.addEventListener('click', () => {
    alert('Goals menu clicked!');
  });
  app.appendChild(menuBtn);
});

export {};