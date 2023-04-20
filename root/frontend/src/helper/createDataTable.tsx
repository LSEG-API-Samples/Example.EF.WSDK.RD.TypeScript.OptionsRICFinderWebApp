import ReactDOM from 'react-dom';
import { wsdkHelper } from './workspace-sdk-services';
import handleDelete from './handleDelete'
import handleClick from './handleClick';
const $ = require('jquery');

function createColumns(res: any) {
    let columns: any[] = []
    const features = Object.keys(res[0])
    features.forEach(function (element) { if (element !== "prices" && element !== "__v") { columns.push({ data: element, title: element }) } })
    columns.push({ data: null, title: "To Workspace" })
    return columns
}

function deleteRow(setData: any, table: any) {
    $('#showRICs tbody').on('click', 'ef-icon', function (this: any) {
        let action = this.id
        let data = table.row($(this).parents('tr')).data();
        if (action === "delete") {
            handleDelete(setData, data._id)
            table.row($(this).parents('tr')).remove().draw();
        }
    });
}

function getOptionStatus(row: any, bid: number) {
    let today: Date = new Date();
    let maturityDate: Date = new Date(row['maturity'])
    if (maturityDate < today) {
        return 'Expired'
    }
    if (row['bid'] === null) {
        return ''
    }
    else {
        return (row.strike < bid && row.optionType === 'Call') ||
            (row.strike > bid && row.optionType === 'Put') ? 'In the money' : 'Out of the money'
    }
}

export default function createDatatable(setData: any, res: any) {
    wsdkHelper.initialize_wsdk()
    Object.values(res).map(element => element['bid'] = null)
    Object.values(res).map(element => element['status'] = getOptionStatus(element, element['bid']))
    $(document).ready(async () => {
        (async () => {
            let rics = Object.values(res).map(element => element['asset']);
            let pricingStream = await wsdkHelper.getStremingSession(rics)
            pricingStream
                .onUpdate((update, instrument) => {
                    updateTable(instrument, update.BID)
                })
                .onStatus((status, instrument) => console.log('logs', 'Status for ' + instrument, status))
                .onError(err => console.log('logs', 'PricingStream error:', err));
            await pricingStream.open();
        })()

        async function updateTable(instrument: string, bid: any) {
            let rowIndexes: any = [];
            await tableRICs.rows(function (idx: any, data: any) {
                return data.asset === instrument ? rowIndexes.push(idx) : false;
            });
            rowIndexes.map((ind: any) => tableRICs.cell({ row: ind, column: 8 }).data(bid).draw(false))
            rowIndexes.map((ind: any) => tableRICs.cell({ row: ind, column: 9 }).data(getOptionStatus(tableRICs.row(ind).data(), bid)).draw(false))

        }

        const columns: any = createColumns(res)
        const tableRICs = $("#showRICs").DataTable({

            data: Object.values(res),
            columns: columns,
            retrieve: true,
            dom: 'Bfrtip',
            processing: true,
            pageLength: 10,
            select: {
                style: "single",
            },
            order: [[6, 'desc']],
            buttons: [
                {
                    extend: "copy",
                },
                {
                    extend: "csv",
                },
                {
                    extend: "print",
                    customize: function (win: any) {
                        $(win.document.body).css("font-size", "10pt");
                        $(win.document.body)
                            .find("table")
                            .addClass("compact")
                            .css("font-size", "inherit");
                    },
                },
            ],
            columnDefs: [
                {
                    targets: -1,
                    createdCell: (td: any, cellData: any, rowData: any, row: any, col: any) => {
                        // let today: Date = new Date();
                        // let maturityDate: Date = new Date(rowData['maturity'])
                        // if (maturityDate > today) {
                        ReactDOM.render(
                            <div id="icons">
                                <span title="See instrument price chart in Workspace">
                                    <ef-icon icon="chart-line-bar" id="chartWorkspace" onClick={() => wsdkHelper.openApp('CHT', rowData.ric, 'popup')}></ef-icon>
                                </span>
                                <span title="See instrument price">
                                    <ef-icon icon="display-all-fields" id="pricesChart" data-url={`pricesChart/${rowData._id}`} onClick={handleClick} ></ef-icon>
                                </span>
                                <span title="See instrument quotes in Workspace">
                                    <ef-icon icon="open-quote" id="quotesWorkspace" onClick={() => wsdkHelper.openApp('Q', rowData.ric, 'popup')}></ef-icon>
                                </span>
                                <span title="Delete the record">
                                    <ef-icon icon="dsc-delete-chart" id="delete"></ef-icon>
                                </span>
                            </div >, td)
                        // }
                    },
                    // defaultContent:
                    //     "<span title=\"See instrument price chart in Workspace\"><ef-icon icon = \"chart-line-bar\" id=\"chartWorkspace\"></ef-icon></span>" +
                    //     "<span title=\"See instrument price chart\"><ef-icon icon = \"display-all-fields\" id=\"pricesChart\"></ef-icon></span>" +
                    //     "<span title=\"Delete the record\"><ef-icon icon = \"dsc-delete-chart\" id=\"delete\"></ef-icon></span>",
                    className: 'dt-body-center'
                },
                {
                    target: 0,
                    visible: false,
                    searchable: false,
                },
                {
                    target: 2,
                    createdCell: (td: any, cellData: any, rowData: any, row: any, col: any) => {
                        ReactDOM.render(<a href="#/" id="ric-wsdk" onClick={() => wsdkHelper.openAppOrBroadcast('OV', cellData, 'tab')}><u>{cellData}</u></a>, td);
                    }

                },
                {
                    target: 5,
                    createdCell: (td: any, cellData: any, rowData: any, row: any, col: any) => {
                        if (!cellData.includes("^")) {
                            ReactDOM.render(<a href="#/" id="ric-wsdk" onClick={() => wsdkHelper.openAppOrBroadcast('OPR', cellData, 'tab')}><u>{cellData}</u></a>, td);
                        }
                    }
                },

            ],
            rowCallback: function (row: any, data: any, index: any) {
                if (data.status === 'Expired') {
                    $(row).find('td:eq(8)').css('color', 'grey');
                }
                else if (data.status === 'Out of the money') {
                    $(row).find('td:eq(8)').css('color', 'red');
                }
                else if (data.status === 'In the money') {
                    $(row).find('td:eq(8)').css('color', 'green');
                }
            }
        });
        deleteRow(setData, tableRICs)
    })
}
