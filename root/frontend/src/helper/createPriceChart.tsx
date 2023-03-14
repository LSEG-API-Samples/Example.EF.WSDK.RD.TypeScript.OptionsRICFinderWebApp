
function getDatasetItems(res: any) {
    let dates: any[] = [];
    let bid: any[] = []
    let ask: any[] = []
    let trd: any[] = []
    let settle: any[] = []
    Object.values(res['prices']).forEach(element => { dates.push(element['DATE']) });
    Object.values(res['prices']).forEach(element => { bid.push(element['BID']) });
    Object.values(res['prices']).forEach(element => { ask.push(element['ASK']) });
    Object.values(res['prices']).forEach(element => { trd.push(element['TRDPRC_!']) });
    Object.values(res['prices']).forEach(element => { settle.push(element['SETTLE']) });
    return [dates, bid, ask, trd, settle]
}

function getLineDatasets(datasets: any) {
    const lineDatasets = [{
        type: 'line',
        label: 'BID',
        data: datasets[1],
        fill: false
    }, {
        type: 'line',
        label: 'ASK',
        data: datasets[2],
        fill: false
    },
    {
        type: 'line',
        label: 'TRD',
        data: datasets[3],
        fill: false
    },
    {
        type: 'line',
        label: 'SETTLE',
        data: datasets[4],
        fill: false
    },
    ];
    return lineDatasets
}

function createChartConfig(lineDatasets: any, labels: any) {
    return {
        type: 'line',
        data: {
            labels: labels,
            datasets: lineDatasets
        },
        options: {
            scales: {
                yAxes: [{
                    scaleLabel: {
                        display: true,
                        labelString: 'Price ($)'
                    }
                }]
            },

            tooltips: {
                callbacks: {
                    label: (tooltipItem: any, data: any) => tooltipItem.yLabel + ' £'
                }
            },
            elements: {
                point: {
                    radius: 0
                }
            }
        }
    }
}
export default function createPriceChart(res: any) {
    const datasets = getDatasetItems(res)
    const lineDatasets = getLineDatasets(datasets)
    const line = (document.getElementById('line') as any);
    line.config = createChartConfig(lineDatasets, datasets[0])
}
