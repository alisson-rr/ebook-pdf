// ============================================
// EXPORTAR PDF (via print nativo do navegador)
// ============================================
function exportPDF() {
    window.print();
}

// ============================================
// NAVEGAÇÃO SUAVE DO ÍNDICE INLINE
// ============================================
document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.toc-card a[href^="#"]').forEach(function (link) {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            var target = document.getElementById(this.getAttribute('href').substring(1));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // Animação de entrada
    var pages = document.querySelectorAll('.page');
    if ('IntersectionObserver' in window) {
        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) { entry.target.classList.add('visible'); }
            });
        }, { threshold: 0.08 });
        pages.forEach(function (p) { p.classList.add('fade-in'); observer.observe(p); });
    }
});

// CSS dinâmico
(function () {
    var s = document.createElement('style');
    s.textContent =
        '.fade-in{opacity:0;transform:translateY(30px);transition:opacity .6s ease,transform .6s ease}' +
        '.fade-in.visible{opacity:1;transform:translateY(0)}' +
        '#btn-pdf:disabled{opacity:.7;cursor:wait}';
    document.head.appendChild(s);
})();
