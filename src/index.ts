const app = document.getElementById('app')!;
const btn = document.getElementById('btn')! as HTMLButtonElement;
const imageGrid = document.querySelector('.image-grid')!;

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
  'UI.png',
];

// Create and append images to the image grid for mobile layout
imageFilenames.forEach(filename => {
  const img = document.createElement('img');
  img.src = `/images/${filename}`;
  img.alt = filename;
  imageGrid.appendChild(img);
});