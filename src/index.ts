const app = document.getElementById('app')!;
const btn = document.getElementById('btn')! as HTMLButtonElement;

// List your actual image filenames from the /images directory
const imageFilenames = [
  'ButtonMenu.png',
  'coffee.png',
  'diary.png',
  'scrapbookitem.png',
  'scrapbookitem2.png',
  'stamp.png',
  'stamp2.png',
  'star.png',
  'star2.png',
];

// Create and append images to the app
imageFilenames.forEach(filename => {
  const img = document.createElement('img');
  img.src = `/images/${filename}`;
  img.alt = filename;
  img.style.maxWidth = '200px'; // Optional styling
  img.style.margin = '10px';
  app.appendChild(img);
});