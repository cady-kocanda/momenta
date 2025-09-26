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
    menuBtn.animate([
      { transform: 'rotate(0deg)' },
      { transform: 'rotate(360deg)' }
    ], {
      duration: 400,
      easing: 'cubic-bezier(0.4, 0.2, 0.2, 1)'
    });

    // Show or toggle a transparent vertical nav bar below the button
    let navBar = document.getElementById('nav-bar');
    if (!navBar) {
      navBar = document.createElement('nav');
      navBar.id = 'nav-bar';
      navBar.style.position = 'absolute';
      navBar.style.top = '70px';
      navBar.style.left = '18px';
      navBar.style.display = 'flex';
      navBar.style.flexDirection = 'column';
      navBar.style.padding = '8px 20px';
      navBar.style.fontFamily = "'Caveat', 'Comic Sans MS', 'Brush Script MT', cursive, arial, sans-serif";
      navBar.style.fontWeight = '600';
      navBar.style.fontSize = '1.0em';
      navBar.style.color = '#333';
      navBar.style.cursor = 'pointer';
      navBar.style.transition = 'opacity 0.2s';
      navBar.innerHTML = `<div style="padding:10px 0;text-align:left;">Goals</div>`;
      app.appendChild(navBar);
    } else {
      navBar.style.display = navBar.style.display === 'none' ? 'flex' : 'none';
      // Animate the nav bar rotation
      navBar.animate([
        { transform: 'rotate(0deg)' },
        { transform: 'rotate(360deg)' }
      ], {
        duration: 400,
        easing: 'cubic-bezier(0.4, 0.2, 0.2, 1)'
      });
    }
  });
  app.appendChild(menuBtn);

  // Add Google Fonts Caveat for scrapbook/handwritten look
  const fontLink = document.createElement('link');
  fontLink.rel = 'stylesheet';
  fontLink.href = 'https://fonts.googleapis.com/css2?family=Caveat:wght@600&display=swap';
  document.head.appendChild(fontLink);
});

export {};