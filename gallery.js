const images = [
  { url: "https://i.imgur.com/CqMABLn.png", width: 1920, height: 991 },
  { url: "https://i.imgur.com/qsjDkgn.png", width: 600, height: 1000 },
  { url: "https://i.imgur.com/HBVd0ak.png", width: 1920, height: 991 },
  { url: "https://i.imgur.com/pbt5IQl.png", width: 1000, height: 1000 },
  { url: "https://i.imgur.com/WNzZGG3.png", width: 600, height: 1000 },
  { url: "https://i.imgur.com/GR8nIJB.png", width: 800, height: 800 },
  { url: "https://i.imgur.com/WcTlX8e.png", width: 600, height: 1000 },
  { url: "https://i.imgur.com/wbplyR6.png", width: 1200, height: 800 },
  { url: "https://i.imgur.com/bQd8anX.png", width: 700, height: 1100 },
  { url: "https://i.imgur.com/rhMAR3p.png", width: 850, height: 1200 },
  { url: "https://i.imgur.com/aUwwdRt.png", width: 900, height: 900 },
  { url: "https://i.imgur.com/jzT8Sn8.png", width: 600, height: 800 },
  { url: "https://i.imgur.com/p7gZPwo.png", width: 1000, height: 1400 },
  { url: "https://i.imgur.com/9wfo2Sh.png", width: 750, height: 1000 },
  { url: "https://i.imgur.com/wnP95ib.png", width: 1200, height: 800 },
  { url: "https://i.imgur.com/Mp0U4rj.png", width: 700, height: 1100 },
  { url: "https://i.imgur.com/c26E1T2.png", width: 850, height: 1200 },
  { url: "https://i.imgur.com/AaHHB0a.png", width: 900, height: 900 },
  { url: "https://i.imgur.com/pcqlnAj.png", width: 1100, height: 600 },
  { url: "https://i.imgur.com/96xT3pt.png", width: 1920, height: 991 },
  { url: "https://i.imgur.com/bAnuYHE.png", width: 1000, height: 1000 },
  { url: "https://i.imgur.com/8ld9q8S.png", width: 600, height: 1000 },
  { url: "https://i.imgur.com/ssj48zk.png", width: 1200, height: 800 },
  { url: "https://i.imgur.com/esJIfpe.png", width: 700, height: 1100 },
  { url: "https://i.imgur.com/CvdRSO6.png", width: 850, height: 1200 },
  { url: "https://i.imgur.com/my5Kgja.png", width: 900, height: 900 },
];

const clipClasses = [
  'clip-diagonal-1', 'clip-diagonal-2', 'clip-diagonal-3',
  'clip-diagonal-4', 'clip-diagonal-5', 'clip-diagonal-6',
];

const gallery = document.getElementById('gallery');
const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightbox-image');
const lightboxClose = document.getElementById('lightbox-close');
const lightboxPrev = document.getElementById('lightbox-prev');
const lightboxNext = document.getElementById('lightbox-next');
const lightboxCounter = document.getElementById('lightbox-counter');

let currentIndex = 0;
let isOpen = false;
let sortOrder = 'recent';
let currentPage = 1;
const itemsPerPage = 20;
let sortedImages = [];

function updateSort() {
  sortedImages = [...images];
  if (sortOrder === 'recent') {
    sortedImages.reverse();
  }
}

updateSort();

function getGridSpan(width, height) {
  const aspectRatio = height / width;
  const minSpan = 3;
  const maxSpan = 8;
  const span = Math.round(minSpan + (aspectRatio - 0.5) * 4);
  return Math.min(Math.max(span, minSpan), maxSpan);
}

function renderGallery() {
  gallery.innerHTML = '';
  const start = (currentPage - 1) * itemsPerPage;
  const pageImages = sortedImages.slice(start, start + itemsPerPage);

  pageImages.forEach((image, i) => {
    const globalIndex = start + i;
    const item = document.createElement('div');
    item.className = `gallery-item ${clipClasses[globalIndex % clipClasses.length]}`;

    const span = getGridSpan(image.width, image.height);
    item.style.gridRow = `span ${span}`;

    const img = document.createElement('img');
    img.src = image.url;
    img.alt = `Imagen ${globalIndex + 1}`;

    item.appendChild(img);
    gallery.appendChild(item);

    item.addEventListener('click', () => openLightbox(globalIndex, item, img, image.url));
  });

  renderPagination();
}

function renderPagination() {
  const totalPages = Math.ceil(images.length / itemsPerPage);
  let pagination = document.getElementById('pagination');
  if (!pagination) {
    pagination = document.createElement('nav');
    pagination.id = 'pagination';
    pagination.className = 'pagination';
    gallery.after(pagination);
  }
  pagination.innerHTML = '';

  if (totalPages <= 1) return;

  const prevBtn = document.createElement('button');
  prevBtn.className = 'page-btn';
  prevBtn.textContent = '‹';
  prevBtn.disabled = currentPage === 1;
  prevBtn.addEventListener('click', () => changePage(currentPage - 1));
  pagination.appendChild(prevBtn);

  for (let i = 1; i <= totalPages; i++) {
    const btn = document.createElement('button');
    btn.className = `page-btn${i === currentPage ? ' active' : ''}`;
    btn.textContent = i;
    btn.addEventListener('click', () => changePage(i));
    pagination.appendChild(btn);
  }

  const nextBtn = document.createElement('button');
  nextBtn.className = 'page-btn';
  nextBtn.textContent = '›';
  nextBtn.disabled = currentPage === totalPages;
  nextBtn.addEventListener('click', () => changePage(currentPage + 1));
  pagination.appendChild(nextBtn);
}

function changePage(page) {
  currentPage = page;
  renderGallery();
  gallery.scrollIntoView({ behavior: 'smooth' });
}

function changeSort(order) {
  if (order === sortOrder) return;
  sortOrder = order;
  currentPage = 1;
  updateSort();
  renderGallery();
  document.querySelectorAll('.sort-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.sort === sortOrder);
  });
}

function updateCounter() {
  lightboxCounter.textContent = `${currentIndex + 1} / ${sortedImages.length}`;
}

function openLightbox(index, item, thumbnail, src) {
  currentIndex = index;
  isOpen = true;

  const rect = thumbnail.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;

  lightboxImage.style.transformOrigin = `${centerX}px ${centerY}px`;
  lightboxImage.src = src;

  updateCounter();
  lightbox.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  isOpen = false;
  lightbox.classList.remove('active');
  document.body.style.overflow = '';

  setTimeout(() => {
    lightboxImage.src = '';
  }, 400);
}

function navigate(direction) {
  if (!isOpen) return;

  currentIndex = (currentIndex + direction + sortedImages.length) % sortedImages.length;

  lightboxImage.classList.add('transitioning');
  lightboxImage.style.opacity = '0';
  lightboxImage.style.transform = `scale(0.9) translateX(${direction * 30}px)`;

  setTimeout(() => {
    lightboxImage.src = sortedImages[currentIndex].url;
    updateCounter();

    requestAnimationFrame(() => {
      lightboxImage.style.opacity = '1';
      lightboxImage.style.transform = 'scale(1) translateX(0)';
    });
  }, 150);

  setTimeout(() => {
    lightboxImage.classList.remove('transitioning');
    lightboxImage.style.opacity = '';
    lightboxImage.style.transform = '';
  }, 450);
}

lightboxClose.addEventListener('click', (e) => {
  e.stopPropagation();
  closeLightbox();
});

lightboxPrev.addEventListener('click', (e) => {
  e.stopPropagation();
  navigate(-1);
});

lightboxNext.addEventListener('click', (e) => {
  e.stopPropagation();
  navigate(1);
});

lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) {
    closeLightbox();
  }
});

document.addEventListener('keydown', (e) => {
  if (!isOpen) return;

  if (e.key === 'Escape') {
    closeLightbox();
  } else if (e.key === 'ArrowLeft') {
    navigate(-1);
  } else if (e.key === 'ArrowRight') {
    navigate(1);
  }
});

document.querySelectorAll('.sort-btn').forEach(btn => {
  btn.addEventListener('click', () => changeSort(btn.dataset.sort));
});

renderGallery();
