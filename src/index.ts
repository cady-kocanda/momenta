const app = document.getElementById('app')!;
const btn = document.getElementById('btn')! as HTMLButtonElement;

app.querySelector('h1')!.textContent = 'Hello from TypeScript!';

btn.addEventListener('click', () => {
  const p = document.createElement('p');
  p.textContent = `Clicked at ${new Date().toLocaleTimeString()}`;
  app.appendChild(p);
});
