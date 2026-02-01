const puppeteer = require('puppeteer');

(async () => {
    console.log('Iniciando geração do PDF...');
    
    const browser = await puppeteer.launch({
        headless: 'new'
    });
    const page = await browser.newPage();
    
    // Define viewport grande para capturar tudo
    await page.setViewport({ width: 1200, height: 800 });
    
    // Abre o arquivo HTML local
    await page.goto('http://127.0.0.1:3000', { 
        waitUntil: 'networkidle0',
        timeout: 120000 
    });
    
    // Espera a página carregar completamente
    await page.waitForSelector('.container');
    
    // Scroll até o final para garantir que tudo carregue
    await page.evaluate(async () => {
        await new Promise((resolve) => {
            let totalHeight = 0;
            const distance = 500;
            const timer = setInterval(() => {
                const scrollHeight = document.body.scrollHeight;
                window.scrollBy(0, distance);
                totalHeight += distance;
                if (totalHeight >= scrollHeight) {
                    clearInterval(timer);
                    window.scrollTo(0, 0);
                    resolve();
                }
            }, 100);
        });
    });
    
    // Espera um pouco mais
    await new Promise(r => setTimeout(r, 2000));
    
    // Esconde o botão de download
    await page.evaluate(() => {
        const btn = document.getElementById('download-pdf');
        if (btn) btn.style.display = 'none';
    });
    
    // Gera o PDF
    await page.pdf({
        path: 'Guia-Atendimento-Magnetico.pdf',
        format: 'A4',
        printBackground: true,
        preferCSSPageSize: false,
        margin: {
            top: '15mm',
            bottom: '15mm',
            left: '15mm',
            right: '15mm'
        }
    });
    
    await browser.close();
    
    console.log('PDF gerado com sucesso: Guia-Atendimento-Magnetico.pdf');
})();
