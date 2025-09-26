const app = document.getElementById('app')!;

// Clear any existing content
app.innerHTML = '';

// Inject styles to position and layer the pieces to match UI.png
const style = document.createElement('style');
style.textContent = `
  :root{--canvas-w:375px;--canvas-h:812px}
  body{display:flex;align-items:center;justify-content:center;padding:24px;background:#fff}
  #app{width:100%;max-width:420px}
  .screen{width:var(--canvas-w);height:var(--canvas-h);background:#e9e9e9;border-radius:8px;position:relative;overflow:hidden;margin:0 auto;box-shadow:0 8px 30px rgba(0,0,0,0.08)}
  .layer{position:absolute;will-change:transform,opacity}
  /* Main open notebook */
  .diary{left:50%;top:28%;width:66%;transform:translate(-50%,-10%)}
  /* Disco ball top-left */
  .disco{left:16%;top:16%;width:18%;transform:translate(-50%,-50%)}
  /* Speech heart */
  .heart{right:18%;top:22%;width:20%}
  /* Film strip on notebook */
  .film{left:34%;top:41%;width:16%;transform:rotate(-18deg)}
  /* Button menu top-left with callout text */
  .menu{left:9%;top:6%;width:13%}
  .click-text{position:absolute;left:26%;top:8%;font-family: 'Brush Script MT', cursive, sans-serif;color:#000;font-size:28px}
  /* Stars and stamps */
  .star-left{left:10%;top:36%;width:6%}
  .star-right{right:12%;top:10%;width:10%}
  .stamp{left:72%;top:56%;width:8%}
  /* Coffee cup lower center */
  .coffee{left:50%;top:68%;width:12%;transform:translateX(-50%)}
  /* Small embellishments */
  .scrap-left{left:20%;top:46%;width:12%}
  .scrap-right{left:58%;top:46%;width:10%}
  /* Make images crisp and non-draggable */
  img.ui-img{width:100%;height:auto;display:block;user-drag:none;user-select:none;-webkit-user-drag:none}
  @media(max-width:420px){
    .screen{transform:scale(calc((100vw - 48px) / var(--canvas-w)));transform-origin:top center}
  }
`;
document.head.appendChild(style);

// Helper to create an image layer
function addLayer(src: string, className: string, alt = ''){
  const el = document.createElement('div');
  el.className = `layer ${className}`;
  const img = document.createElement('img');
  img.className = 'ui-img';
  img.src = `/images/${src}`;
  img.alt = alt || src;
  el.appendChild(img);
  screen.appendChild(el);
  return el;
}

// Build the screen
const screen = document.createElement('div');
screen.className = 'screen';
app.appendChild(screen);

// Add layers roughly positioned to recreate the supplied UI composition
addLayer('diary.png', 'diary', 'open notebook');
addLayer('disco.png', 'disco', 'disco ball');
addLayer('photostrip.png', 'film', 'film strip');
addLayer('ButtonMenu.png', 'menu', 'menu button');
addLayer('stamp2.png', 'heart', 'heart speech');
addLayer('star.png', 'star-left', 'star left');
addLayer('star2.png', 'star-right', 'star right');
addLayer('stamp.png', 'stamp', 'small stamp');
addLayer('coffee.png', 'coffee', 'coffee cup');
addLayer('scrapbookitem.png', 'scrap-left', 'scrap left');
addLayer('scrapbookitem2.png', 'scrap-right', 'scrap right');

// Decorative click text near the menu button
const clickText = document.createElement('div');
clickText.className = 'click-text';
clickText.textContent = 'Click me!';
screen.appendChild(clickText);

// Small interactive touch: animate menu when clicked
const menuEl = screen.querySelector('.menu') as HTMLDivElement | null;
if(menuEl){
  menuEl.style.cursor = 'pointer';
  menuEl.addEventListener('click', () => {
    menuEl.animate([{ transform: 'scale(1)' }, { transform: 'scale(1.08)' }, { transform: 'scale(1)' }], { duration: 350 });
  });
}

// Make images non-blocking for layout; if an image fails, log but keep layout
document.querySelectorAll('.ui-img').forEach(img => {
  img.addEventListener('error', (e) => console.warn('Image failed to load:', (e.target as HTMLImageElement).src));
});

export {};