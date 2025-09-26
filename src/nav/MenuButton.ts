// src/nav/MenuButton.ts

export function createMenuButton(onClick?: () => void): HTMLButtonElement {
  const menuBtn = document.createElement('button');
  menuBtn.className = 'menu-btn';
  menuBtn.title = 'Goals';
  const menuImg = document.createElement('img');
  menuImg.src = '/images/ButtonMenu.png';
  menuImg.alt = 'Goals menu';
  menuBtn.appendChild(menuImg);
  menuBtn.addEventListener('click', () => {
    if (onClick) onClick();
    else alert('Goals menu clicked!');
  });
  return menuBtn;
}
