import React, { Component } from 'react';
import axios from 'axios';
import { CircleLoader } from "react-spinners";


type PivotTableState = {
    loading: boolean,
    tableDataRaw: Array<any>,
    tableData: DataStorage,
    tableRows: Array<string>,
    tableCols: Array<string>,
    controlValues: {
        column: string,
        row: string,
    }
}

type PivotTableProps = {
    apiPath: string
}

class DataStorage {
    constructor(private data: Map<string, Map<string, number>>) { }

    public get(rowName: string, colName: string): number | null {
        return this.data.get(rowName).get(colName);
    }
}

class PivotTable extends Component<PivotTableProps, PivotTableState> {
    state: PivotTableState = {
        loading: true,
        tableDataRaw: [],
        tableData: new DataStorage(null),
        tableRows: new Array<string>(),
        tableCols: new Array<string>(),
        controlValues: {
            row: "type",
            column: "section",
        }
    };

    constructor(props: PivotTableProps) {
        super(props);
        this.onRowSelectChange = this.onRowSelectChange.bind(this);
        this.onColumnSelectChange = this.onColumnSelectChange.bind(this);
    }

    refreshTableData() {
        this.setState({ loading: true }, () => {
            axios.get(this.props.apiPath, {
                params: {
                    col: this.state.controlValues.column,
                    row: this.state.controlValues.row
                }
            }).then(response => {
                console.log('get response', response);
                let table: Map<string, Map<string, number>> = new Map<string, Map<string, number>>();
                let tableCols = new Array<string>();
                let tableRows = new Array<string>();
                response.data.forEach((element: any) => {
                    let row = element[this.state.controlValues.row];
                    let col = element[this.state.controlValues.column];
                    if (!table.has(row)) {
                        table.set(row, new Map<string, number>());
                    }
                    table.get(row).set(col, element.value);

                    if (!tableRows.find(e => e === row)) {
                        tableRows.push(row);
                    }

                    if (!tableCols.find(e => e === col)) {
                        tableCols.push(col);
                    }
                });

                this.setState({ loading: false, tableDataRaw: response.data, tableData: new DataStorage(table), tableCols: tableCols, tableRows: tableRows });
            }).catch(() => {
                let table: Map<string, Map<string, number>> = new Map<string, Map<string, number>>();
                this.setState({ loading: false, tableDataRaw: [], tableData: new DataStorage(table), tableCols: [], tableRows: [] });
            });
        })
    }

    onColumnSelectChange(event: any) {
        let value = event.target.value;
        this.setState(prevState => {
            prevState.controlValues.column = value;
            return prevState;
        }, () => { this.refreshTableData(); });
    }

    onRowSelectChange(event) {
        let value = event.target.value;
        this.setState(prevState => {
            prevState.controlValues.row = value;
            return prevState;
        }, () => { this.refreshTableData(); });
    }

    renderControls() {
        return (
            <div className="form-group row col-6">
                <label htmlFor="row-select">Row</label>
                <select className="form-control" id="row-select" value={this.state.controlValues.row} onChange={this.onRowSelectChange} >
                    <option value="section">группа налога</option>
                    <option value="type">подгруппа налога</option>
                    <option value="province">округ РФ</option>
                    <option value="region">регион РФ</option>
                    <option value="year">год</option>
                </select>
                <label htmlFor="column-select">Column</label>
                <select className="form-control" id="column-select" value={this.state.controlValues.column} onChange={this.onColumnSelectChange} >
                    <option value="section">группа налога</option>
                    <option value="type">подгруппа налога</option>
                    <option value="province">округ РФ</option>
                    <option value="region">регион РФ</option>
                    <option value="year">год</option>
                </select>

            </div>
        );
    }

    renderTableData() {
        const rowKeys = this.state.tableRows;
        const colKeys = this.state.tableCols;
        const data = this.state.tableData;

        return (
            <table className="table">
                <thead>
                    <th></th>
                    {colKeys.map(function(colKey, i) {
                        return (
                            <th
                                key={`colKey${i}`}>
                                {colKey}
                            </th>
                        );
                    })}
                </thead>
                <tbody>
                    {rowKeys.map(function(rowKey, i) {
                        return (
                            <tr key={`rowKeyRow${i}`}>
                                <th>{rowKey}</th>
                                {colKeys.map(function(colKey, j) {
                                    return (
                                        <td
                                            key={`pvtVal${i}-${j}`}
                                        >
                                            {data.get(rowKey, colKey)}
                                        </td>
                                    );
                                })}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        );
    }

    componentDidMount() {
        this.refreshTableData();
    }

    render() {
        if (this.state.loading) {
            return (
                <CircleLoader
                    css="  display: block;
                    margin: 0 auto;
                    border-color: red;"
                    size={150}
                    color={"#123abc"}
                />);
        }

        return (
            <div className="pivot-table-container container">
                <div className="row">
                    {this.renderControls()}
                </div>
                <div className="row">
                    {this.renderTableData()}
                </div>

            </div>
        );
    }
}

export default PivotTable;
