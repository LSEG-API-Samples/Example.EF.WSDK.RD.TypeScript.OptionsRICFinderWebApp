import ReactDOM from 'react-dom';
import { wsdkHelper } from './workspace-sdk-services';
import deleteSelected from './handleDelete'
const $ = require('jquery');

function createColumns(res: any) {
    let columns: any[] = []
    const features = Object.keys(res[0])
    features.forEach(function (element) { if (element !== "prices" && element !== "__v") { columns.push({ data: element, title: element }) } })
    columns.push({ data: null, title: "To Workspace" })
    return columns
}

function handleIcons(setData: any, table: any) {
    $('#showRICs tbody').on('click', 'ef-icon', function (this: any) {
        let action = this.id
        let data = table.row($(this).parents('tr')).data();
        if (action === "delete") {
            deleteSelected(setData, data._id)
            table.row($(this).parents('tr')).remove().draw();
        }
        else {
            window.location.href = `${action}/${data._id}`
        }
    });
}

export default function createDatatable(setData: any, res: any) {
    const columns: any = createColumns(res)
    $(document).ready(() => {
        const tableRICs = $("#showRICs").DataTable({

            data: Object.values(res),
            columns: columns,
            retrieve: true,
            dom: 'Bfrtip',
            processing: true,
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
                        let today: Date = new Date();
                        let maturityDate: Date = new Date(rowData['maturity'])
                        if (maturityDate > today) {

                            ReactDOM.render(
                                <div id="icons">
                                    <span title="See instrument price chart in Workspace">
                                        <ef-icon icon="chart-line-bar" id="chartWorkspace"></ef-icon>
                                    </span>
                                    <span title="See instrument price">
                                        <ef-icon icon="display-all-fields" id="pricesChart"></ef-icon>
                                    </span>
                                    <span title="See instrument quotes in Workspace">
                                        <ef-icon icon="open-quote" id="quotesWorkspace"></ef-icon>
                                    </span>
                                    <span title="Delete the record">
                                        <ef-icon icon="dsc-delete-chart" id="delete"></ef-icon>
                                    </span>
                                </div >, td)
                        }
                    },
                    defaultContent:
                        "<span title=\"See instrument price chart in Workspace\"><ef-icon icon = \"chart-line-bar\" id=\"chartWorkspace\"></ef-icon></span>\
                        <span title=\"See instrument price chart\"><ef-icon icon = \"display-all-fields\" id=\"pricesChart\"></ef-icon></span>\
                        <span title=\"Delete the record\"><ef-icon icon = \"dsc-delete-chart\" id=\"delete\"></ef-icon></span>",
                    className: 'dt-body-center'
                },
                {
                    target: 0,
                    visible: false,
                    searchable: false,
                },
                {
                    target: 1,
                    createdCell: (td: any, cellData: any, rowData: any, row: any, col: any) => {
                        ReactDOM.render(<a href="#/" id="ric-wsdk" onClick={() => wsdkHelper.openAppOrBroadcast('OV', cellData)}><u>{cellData}</u></a>, td);
                    }

                },
                {
                    target: 4,
                    createdCell: (td: any, cellData: any, rowData: any, row: any, col: any) => {
                        ReactDOM.render(<a href="#/" id="ric-wsdk" onClick={() => wsdkHelper.openAppOrBroadcast('OV', cellData)}><u>{cellData}</u></a>, td);
                    }
                }
            ]
        });
        handleIcons(setData, tableRICs)
    })
}
