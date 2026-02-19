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

// Geração de PDF — página única, sem cortes
async function gerarPDF() {
    var btn = document.getElementById('btn-pdf');
    var svgIcon = '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>';
    var originalHTML = btn.innerHTML;

    btn.innerHTML = '<span>⏳ Gerando PDF...</span>';
    btn.disabled = true;
    btn.style.opacity = '0.75';

    try {
        var element = document.getElementById('ebook-content');

        // Captura todo o conteúdo como imagem de alta resolução
        var canvas = await html2canvas(element, {
            scale: 2,
            useCORS: true,
            allowTaint: false,
            logging: false,
            scrollX: 0,
            scrollY: 0,
            windowWidth: element.scrollWidth,
            windowHeight: element.scrollHeight
        });

        var imgData = canvas.toDataURL('image/jpeg', 0.95);

        // Define o PDF com largura A4 e altura proporcional ao conteúdo (página única)
        var pdfWidthMm = 210;
        var pdfHeightMm = Math.ceil((canvas.height / canvas.width) * pdfWidthMm);

        var { jsPDF } = window.jspdf;
        var pdf = new jsPDF({
            orientation: pdfHeightMm > pdfWidthMm ? 'portrait' : 'landscape',
            unit: 'mm',
            format: [pdfWidthMm, pdfHeightMm]
        });

        pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidthMm, pdfHeightMm);

        // Nome do arquivo baseado no título da página
        var filename = document.title
            .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
            .replace(/[^a-zA-Z0-9\s]/g, '')
            .trim().replace(/\s+/g, '_')
            .toLowerCase() + '.pdf';

        pdf.save(filename);

    } catch (err) {
        console.error('Erro ao gerar PDF:', err);
        alert('Não foi possível gerar o PDF. Verifique o console para detalhes.');
    }

    btn.innerHTML = originalHTML;
    btn.disabled = false;
    btn.style.opacity = '';
}
