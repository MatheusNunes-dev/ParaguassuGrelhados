fetch("./cardapio/cardapio.html")
    .then(response => response.text())
    .then(data => {
      document.getElementById("cardapio").innerHTML = data;
    }); 


/* Mobile menu */
function toggleMenu() {
    document.getElementById('mobileMenu').classList.toggle('open');
}

/* Scroll reveal */
const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver(entries => {
    entries.forEach((e, i) => {
        if (e.isIntersecting) {
            setTimeout(() => e.target.classList.add('visible'), i * 60);
            observer.unobserve(e.target);
        }
    });
}, { threshold: 0.12 });
reveals.forEach(el => observer.observe(el));



/* Stagger feature cards */
document.querySelectorAll('.feature-card, .menu-card, .contato-card').forEach((el, i) => {
    el.style.transitionDelay = (i % 4) * 0.1 + 's';
});

/* Toast */
function showToast(msg) {
    const t = document.getElementById('toast');
    t.textContent = msg;
    t.classList.add('show');
    setTimeout(() => t.classList.remove('show'), 4000);
}

/* Nav scroll style */
window.addEventListener('scroll', () => {
    const nav = document.getElementById('navbar');
    nav.style.background = window.scrollY > 60 ? 'rgba(13,11,11,0.97)' : 'rgba(13,11,11,0.85)';
});