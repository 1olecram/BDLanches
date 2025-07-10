
import { fetchData } from "../fetch/fetchData.js";

$(async function() {

  const dadosVenda = await fetchData('relatorioVenda')
  const dadosFuncionarios = await fetchData('relatorioFuncionarios')
  const dadosReceita = await fetchData('relatorioReceita')

    // graficos gex/sr
console.log(dadosFuncionarios.resultado.map(item => item.total_funcionarios_ativos),)
    // grafico pgd
    
    var options2 = {
      
        series: dadosFuncionarios.resultado.map(item => item.total_funcionarios_ativos),
        chart: {
            foreColor: "#9ba7b2",
            height: 380,
            type: 'pie',
        },
        labels: dadosFuncionarios.resultado.map(item => item.id_franquia),
        legend: {
      position: "bottom",
      show: !0
    },
        responsive: [{
            breakpoint: 480,
            options: {
                chart: {
                    width: 200
                },
                legend: {
                    position: 'bottom'
                }
            }
        }]
    };
    
    var chart1 = new ApexCharts(document.querySelector("#Teste1"), options2);
    chart1.render();


    var options2 = {
      
        series: dadosVenda.resultado.map(item => item.numero_vendas),
        chart: {
            foreColor: "#9ba7b2",
            height: 380,
            type: 'pie',
        },
        labels: dadosFuncionarios.resultado.map(item => item.id_franquia),
        legend: {
      position: "bottom",
      show: !0
    },
        responsive: [{
            breakpoint: 480,
            options: {
                chart: {
                    width: 200
                },
                legend: {
                    position: 'bottom'
                }
            }
        }]
    };

  
    
    var chart1 = new ApexCharts(document.querySelector("#Teste2"), options2);
    chart1.render();


        var options2 = {
      
        series: dadosReceita.resultado.map(item => Number(item.receita_total)),
        chart: {
            foreColor: "#9ba7b2",
            height: 380,
            type: 'pie',
        },
        labels: dadosFuncionarios.resultado.map(item => item.id_franquia),
        legend: {
      position: "bottom",
      show: !0
    },
        responsive: [{
            breakpoint: 480,
            options: {
                chart: {
                    width: 200
                },
                legend: {
                    position: 'bottom'
                }
            }
        }]
    };

  
    
    var chart1 = new ApexCharts(document.querySelector("#Teste3"), options2);
    chart1.render();
    // grafico servidores gex

    var options2 = {
      
        series: [3, 4],
        chart: {
            foreColor: "#9ba7b2",
            height: 380,
            type: 'pie',
        },
        labels: ['SGREC', 'SAREC'],
        legend: {
      position: "bottom",
      show: !0
    },
        responsive: [{
            breakpoint: 480,
            options: {
                chart: {
                    width: 200
                },
                legend: {
                    position: 'bottom'
                }
            }
        }]
    };
    
    var chart2 = new ApexCharts(document.querySelector("Teste2"), options2);
    chart2.render();
    



});
