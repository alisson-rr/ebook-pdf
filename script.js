// Navegação do índice inline
document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.toc-card a[href^="#"]').forEach(function (link) {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            var target = document.getElementById(this.getAttribute('href').substring(1));
            if (target) { target.scrollIntoView({ block: 'start' }); }
        });
    });
});
