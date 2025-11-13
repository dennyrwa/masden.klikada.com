// Menjalankan kode saat dokumen siap
document.addEventListener('DOMContentLoaded', () => {

  // --- 1. Logika Dark Mode (V22) ---
  const themeToggle = document.getElementById('theme-toggle');
  const moonIcon = 'fa-moon';
  const sunIcon = 'fa-sun';
  const currentTheme = localStorage.getItem('theme') ? localStorage.getItem('theme') : null;

  // Cek tema yang tersimpan saat memuat halaman
  if (currentTheme) {
    document.documentElement.setAttribute('data-theme', currentTheme);
    if (currentTheme === 'dark') {
      themeToggle.querySelector('i').classList.replace(moonIcon, sunIcon);
    }
  }

  // Event listener untuk tombol toggle
  themeToggle.addEventListener('click', () => {
    let i = themeToggle.querySelector('i');
    if (document.documentElement.getAttribute('data-theme') === 'dark') {
      // Ganti ke Light Mode
      document.documentElement.removeAttribute('data-theme');
      localStorage.removeItem('theme');
      i.classList.replace(sunIcon, moonIcon);
    } else {
      // Ganti ke Dark Mode
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
      i.classList.replace(moonIcon, sunIcon);
    }
  });


  // --- 2. Logika Salin ke Clipboard (V22) ---
  // Kita akan melampirkan event listener ini ke parent element nanti
  // Ini adalah fungsi 'delegated event'
  
  document.body.addEventListener('click', event => {
    // Cek apakah yang diklik adalah tombol copy
    if (event.target.matches('.btn-copy')) {
      const textToCopy = event.target.getAttribute('data-clipboard-text');
      
      navigator.clipboard.writeText(textToCopy).then(() => {
        // Beri feedback visual
        const originalText = event.target.innerHTML;
        event.target.innerHTML = '<i class="fas fa-check"></i> Tersalin!';
        
        // Kembalikan ke teks semula setelah 2 detik
        setTimeout(() => {
          event.target.innerHTML = originalText;
        }, 2000);
        
      }).catch(err => {
        console.error('Gagal menyalin: ', err);
      });
    }
  });
  
  // --- 3. Logika untuk Pencarian, Filter, dll akan ditambahkan di sini nanti ---

});

// --- 4. Logika Print-to-PDF (V22) ---
  const printButton = document.getElementById('print-cv-btn');
  
  // Cek apakah tombolnya ada di halaman ini
  if (printButton) {
    printButton.addEventListener('click', () => {
      window.print(); // Memicu dialog cetak browser
    });
  }


  // --- 5. Logika Halaman Karya (V22) ---
  const karyaPage = document.querySelector('.page-karya');
  
  // Hanya jalankan kode ini jika kita berada di halaman Karya
  if (karyaPage) {
    const tableBody = document.getElementById('karya-table-body');
    const categoryFilter = document.getElementById('karya-category-filter');
    const sortButton = document.getElementById('karya-sort-toggle');
    const printKaryaButton = document.getElementById('print-karya-btn');

    // --- A. Logika Expand/Collapse Row ---
    tableBody.addEventListener('click', (event) => {
      const detailButton = event.target.closest('.btn-detail');
      
      if (detailButton) {
        const icon = detailButton.querySelector('i');
        const currentRow = detailButton.closest('tr');
        const detailRow = currentRow.nextElementSibling;

        if (detailRow.style.display === 'none') {
          detailRow.style.display = 'table-row';
          icon.classList.replace('fa-plus', 'fa-minus');
        } else {
          detailRow.style.display = 'none';
          icon.classList.replace('fa-minus', 'fa-plus');
        }
      }
    });

    // --- B. Logika Filter Kategori ---
    categoryFilter.addEventListener('change', () => {
      const selectedCategory = categoryFilter.value;
      const rows = tableBody.querySelectorAll('tr.karya-item');

      rows.forEach(row => {
        // Sembunyikan juga baris detail yang terasosiasi
        const detailRow = row.nextElementSibling;
        
        if (selectedCategory === 'Semua' || row.dataset.category === selectedCategory) {
          row.style.display = 'table-row';
        } else {
          row.style.display = 'none';
          detailRow.style.display = 'none'; // Sembunyikan detail jika parent disembunyikan
        }
      });
    });

    // --- C. Logika Sortir Tahun ---
    sortButton.addEventListener('click', () => {
      const currentSort = sortButton.dataset.sort;
      const newSort = currentSort === 'desc' ? 'asc' : 'desc';
      const icon = sortButton.querySelector('i');
      
      sortButton.dataset.sort = newSort;
      sortButton.innerHTML = newSort === 'desc' ? 'Terbaru <i class="fas fa-chevron-down"></i>' : 'Terlama <i class="fas fa-chevron-up"></i>';
      
      const rows = Array.from(tableBody.querySelectorAll('tr.karya-item'));
      
      rows.sort((a, b) => {
        const yearA = parseInt(a.dataset.year, 10);
        const yearB = parseInt(b.dataset.year, 10);
        
        if (newSort === 'desc') {
          return yearB - yearA;
        } else {
          return yearA - yearB;
        }
      });

      // Hapus semua baris dan tambahkan kembali dalam urutan baru
      // (Kita harus memindahkan baris detail bersama dengan baris utamanya)
      rows.forEach(row => {
        const detailRow = row.nextElementSibling;
        tableBody.appendChild(row);
        tableBody.appendChild(detailRow);
      });
    });

    // --- D. Logika Print ---
    printKaryaButton.addEventListener('click', () => {
      window.print();
    });
  }

  // --- 6. Logika Tombol Share (V22) ---
  document.body.addEventListener('click', event => {
    const shareButton = event.target.closest('.share-btn');
    if (shareButton) {
      event.preventDefault();
      // Buka di popup kecil
      window.open(shareButton.href, 'share-popup', 'height=400,width=600');
    }
  });
  
  // --- 7. Logika Giscus Theme Switching (V22) ---
  const giscusFrame = document.querySelector('iframe.giscus-frame');
  
  // Fungsi untuk mengirim pesan tema ke iframe Giscus
  function setGiscusTheme(theme) {
    if (giscusFrame) {
      giscusFrame.contentWindow.postMessage(
        { giscus: { setTheme: theme } },
        'https://giscus.app'
      );
    }
  }
  
  // Atur tema Giscus saat halaman dimuat
  const initialTheme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
  // Kita perlu sedikit menunda ini agar iframe-nya siap
  setTimeout(() => setGiscusTheme(initialTheme), 2000); 

  // Atur tema Giscus saat tombol dark mode diklik
  const themeToggleForGiscus = document.getElementById('theme-toggle');
  themeToggleForGiscus.addEventListener('click', () => {
    const newTheme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
    // Tema akan berubah *setelah* klik, jadi kita balik logikanya
    if (newTheme === 'light') {
      setGiscusTheme('dark');
    } else {
      setGiscusTheme('light');
    }
  });

  // --- 8. Logika Navbar Hamburger Bulma (V24) ---
  const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);

  if ($navbarBurgers.length > 0) {
    $navbarBurgers.forEach( el => {
      el.addEventListener('click', () => {
        // Dapatkan target dari atribut 'data-target'
        const target = el.dataset.target;
        const $target = document.getElementById(target);

        // Toggle class 'is-active' di hamburger dan menu
        el.classList.toggle('is-active');
        $target.classList.toggle('is-active');
      });
    });
  }

  // --- 9. Logika Daftar Isi (TOC) Otomatis via JS (V24.1) ---
function generateTOC() {
  const tocContainer = document.querySelector('.table-of-contents');
  const postBody = document.querySelector('.post-body');

  // Hanya jalankan jika kedua elemen ada di halaman
  if (!tocContainer || !postBody) {
    return;
  }

  // Dapatkan semua H2 dan H3
  const headings = postBody.querySelectorAll('h2, h3');
  
  // Jangan buat TOC jika tidak ada subjudul
  if (headings.length === 0) {
    tocContainer.style.display = 'none';
    return;
  }
  
  let tocHtml = '<ul class="toc-list">';

  headings.forEach(heading => {
    // Buat ID unik (slug) dari teks subjudul
    const id = heading.textContent.toLowerCase()
                             .replace(/\s+/g, '-')
                             .replace(/[^\w-]+/g, '');
    
    // Set ID tersebut ke elemen H2/H3
    heading.id = id;
    
    // Cek level (H2 atau H3)
    const level = heading.tagName.toLowerCase();
    
    tocHtml += `<li class="toc-item-${level}">
                  <a href="#${id}" class="toc-link">${heading.textContent}</a>
                </li>`;
  });

  tocHtml += '</ul>';
  
  // Masukkan daftar 'ul' ke dalam div .table-of-contents
  tocContainer.innerHTML += tocHtml;
}

// Jalankan fungsi TOC saat halaman dimuat
generateTOC();

// --- 10. Logika Halaman Karya (Tabs, Filter, Sort, Expand) (V24) ---
  const karyaPage = document.querySelector('.page-karya');
  
  // Hanya jalankan kode ini jika kita berada di halaman Karya
  if (karyaPage) {
    const tabs = document.querySelectorAll('#karya-tabs li');
    const tabPanes = document.querySelectorAll('.karya-tab-content .tab-pane');
    
    // --- A. Logika TABS ---
    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const targetId = tab.dataset.tab;

        // Nonaktifkan semua tab & pane
        tabs.forEach(t => t.classList.remove('is-active'));
        tabPanes.forEach(p => {
          p.classList.remove('is-active');
          p.style.display = 'none';
        });

        // Aktifkan tab & pane yang diklik
        tab.classList.add('is-active');
        const targetPane = document.getElementById(targetId);
        targetPane.classList.add('is-active');
        targetPane.style.display = 'block';
      });
    });

    // --- B. Logika Print ---
    const printKaryaButton = document.getElementById('print-karya-btn');
    printKaryaButton.addEventListener('click', () => {
      window.print();
    });

    // --- C. Logika Tabel Publikasi (Filter, Sort, Expand) ---
    const tableBody = document.getElementById('karya-table-body');
    const categoryFilter = document.getElementById('karya-category-filter');
    const sortButton = document.getElementById('karya-sort-toggle');

    if (tableBody) {
      // --- Logika Expand/Collapse Row ---
      tableBody.addEventListener('click', (event) => {
        const detailButton = event.target.closest('.btn-detail');
        if (detailButton) {
          const icon = detailButton.querySelector('i');
          const currentRow = detailButton.closest('tr');
          const detailRow = currentRow.nextElementSibling;

          if (detailRow.style.display === 'none') {
            detailRow.style.display = 'table-row';
            icon.classList.replace('fa-plus', 'fa-minus');
          } else {
            detailRow.style.display = 'none';
            icon.classList.replace('fa-minus', 'fa-plus');
          }
        }
      });

      // --- Logika Filter Kategori ---
      categoryFilter.addEventListener('change', () => {
        const selectedCategory = categoryFilter.value;
        const rows = tableBody.querySelectorAll('tr.karya-item');

        rows.forEach(row => {
          const detailRow = row.nextElementSibling;
          if (selectedCategory === 'Semua' || row.dataset.category === selectedCategory) {
            row.style.display = 'table-row';
          } else {
            row.style.display = 'none';
            detailRow.style.display = 'none';
          }
        });
      });

      // --- Logika Sortir Tahun ---
      sortButton.addEventListener('click', () => {
        const currentSort = sortButton.dataset.sort;
        const newSort = currentSort === 'desc' ? 'asc' : 'desc';
        const icon = sortButton.querySelector('i');
        
        sortButton.dataset.sort = newSort;
        sortButton.querySelector('span').textContent = newSort === 'desc' ? 'Terbaru' : 'Terlama';
        icon.className = newSort === 'desc' ? 'fas fa-chevron-down' : 'fas fa-chevron-up';
        
        const rows = Array.from(tableBody.querySelectorAll('tr.karya-item'));
        
        rows.sort((a, b) => {
          const yearA = parseInt(a.dataset.year, 10);
          const yearB = parseInt(b.dataset.year, 10);
          return newSort === 'desc' ? yearB - yearA : yearA - yearB;
        });

        rows.forEach(row => {
          const detailRow = row.nextElementSibling;
          tableBody.appendChild(row);
          tableBody.appendChild(detailRow);
        });
      });
    }
  } // Akhir dari if(karyaPage)

  // --- 10. Logika Tombol Share (V24 - Re-add) ---
document.body.addEventListener('click', event => {
  const shareButton = event.target.closest('.share-btn');
  if (shareButton) {
    event.preventDefault();
    // Buka di popup kecil
    window.open(shareButton.href, 'share-popup', 'height=400,width=600');
  }
});

// --- 11. Logika Giscus Theme Switching (V24 - Re-add) ---
const giscusFrame = document.querySelector('iframe.giscus-frame');

// Fungsi untuk mengirim pesan tema ke iframe Giscus
function setGiscusTheme(theme) {
  if (giscusFrame) {
    giscusFrame.contentWindow.postMessage(
      { giscus: { setTheme: theme } },
      'https://giscus.app'
    );
  }
}

// Atur tema Giscus saat halaman dimuat
const initialTheme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
// Kita perlu sedikit menunda ini agar iframe-nya siap
setTimeout(() => setGiscusTheme(initialTheme), 2000); 

// Atur tema Giscus saat tombol dark mode diklik
const themeToggleForGiscus = document.getElementById('theme-toggle');
if (themeToggleForGiscus) {
  themeToggleForGiscus.addEventListener('click', () => {
    // Kita cek tema SETELAH atribut diubah oleh skrip dark-mode
    setTimeout(() => {
      const newTheme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
      setGiscusTheme(newTheme);
    }, 50); // Penundaan 50ms
  });
}