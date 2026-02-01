/* ===========================================
   GRÁFICOS - Guia do Atendimento Magnético
   Utilizando ECharts
   =========================================== */

// Inicializar gráfico de No-Show quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', function() {
    initNoShowChart();
});

function initNoShowChart() {
    var chartDom = document.getElementById('noShowChart');
    if (!chartDom) return;
    
    var myChart = echarts.init(chartDom);
    var option;
    
    option = {
        title: {
            text: 'Impacto dos Lembretes na Taxa de Faltas (No-Show)',
            subtext: 'Fonte: The American Journal of Medicine',
            left: 'center'
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: { type: 'shadow' },
            formatter: '{b}: {c}%'
        },
        xAxis: {
            type: 'category',
            data: ['Sem Lembrete', 'Lembrete Automático', 'Lembrete humanizado']
        },
        yAxis: {
            type: 'value',
            name: 'Taxa de Faltas (%)',
            axisLabel: { formatter: '{value}%' }
        },
        series: [{
            data: [
                { value: 23.1, itemStyle: { color: '#f44336' } },
                { value: 17.3, itemStyle: { color: '#FFC107' } },
                { value: 13.6, itemStyle: { color: '#4CAF50' } }
            ],
            type: 'bar',
            barWidth: '60%',
            label: {
                show: true,
                position: 'top',
                formatter: '{c}%'
            }
        }]
    };
    
    option && myChart.setOption(option);
    
    // Responsividade
    window.addEventListener('resize', function() {
        myChart.resize();
    });
}
