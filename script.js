document.addEventListener('DOMContentLoaded', function() {
    // Elemen-elemen umum
    const navLinks = document.querySelectorAll('.nav-link');
    const contentSections = document.querySelectorAll('.content-section');
    
    // Elemen-elemen khusus halaman
    const loginForm = document.getElementById('loginForm');
    const profilLink = document.getElementById('profilLink');
    const logoutButton = document.getElementById('logoutButton');
    const userProfile = document.getElementById('userProfile');
    const contactForm = document.getElementById('contactForm');
    const kontakLink = document.getElementById('kontakLink');
    

    // Fungsi untuk menampilkan section
    function showSection(targetId) {
        contentSections.forEach(section => {
            section.classList.remove('active');
        });
        const targetSection = document.getElementById(targetId);
        if (targetSection) {
            targetSection.classList.add('active');
        }
    }

    // Event listener untuk navigasi
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('data-target');
            if (targetId && targetId !== 'kontak.html' && targetId !== 'profil.html') {
                e.preventDefault();
                showSection(targetId);
            }
        });
    });

    // Fungsi login
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;

            if (username === 'admin' && password === 'admin') {
                localStorage.setItem('isLoggedIn', 'true');
                localStorage.setItem('username', username);
                alert('Login berhasil!');
                window.location.href = 'profil.html';
            } else {
                alert('Username atau password salah.');
            }
        });
    }

    // Fungsi untuk memeriksa status login
    function checkLoginStatus() {
        const isLoggedIn = localStorage.getItem('isLoggedIn');
        if (profilLink) {
            if (!isLoggedIn) {
                profilLink.style.pointerEvents = 'none';
                profilLink.style.opacity = '0.5';
            } else {
                profilLink.style.pointerEvents = 'auto';
                profilLink.style.opacity = '1';
            }
        }
        if (kontakLink) {
            if (!isLoggedIn) {
                kontakLink.style.pointerEvents = 'none';
                kontakLink.style.opacity = '0.5';
            } else {
                kontakLink.style.pointerEvents = 'auto';
                kontakLink.style.opacity = '1';
            }
        }
        if (window.location.pathname.includes('profil.html') && !isLoggedIn) {
            window.location.href = 'index.html';
        }
        if (window.location.pathname.includes('kontak.html') && !isLoggedIn) {
            window.location.href = 'index.html';
        }
    }

    // Event listener untuk logout
    if (logoutButton) {
        logoutButton.addEventListener('click', function(e) {
            e.preventDefault();
            localStorage.removeItem('isLoggedIn');
            localStorage.removeItem('username');
            window.location.href = 'index.html';
        });
    }

    
    // Event listener untuk form kontak
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // Di sini Anda bisa menambahkan logika untuk mengirim data formulir
            alert('Terima kasih! Pesan Anda telah terkirim.');
            contactForm.reset();
        });
    }

    // Jalankan fungsi-fungsi ini saat halaman dimuat
    checkLoginStatus();
    displayUserProfile();
});