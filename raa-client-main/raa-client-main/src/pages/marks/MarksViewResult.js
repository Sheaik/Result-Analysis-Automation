import React from "react";
import Html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import BarGraph from "./BarGraph";
import PirGraph from "./PirGraph";

class MarksViewResult extends React.Component {
    handlePrintClick() {
        let canvas = document.getElementById( "result" );
        Html2canvas( canvas ).then( canvasImg => {
            let imgData = canvasImg.toDataURL( "image/png", 2.0 );
            let pdf = new jsPDF( {
                orientation: "portrait",
                unit: "in",
                format: [ 8, 6 ]
            } )
            pdf.addImage( imgData, 'PNG', 0, 0, 6, 8, '', 'SLOW' );
            pdf.save( "download.pdf" );
        } )
    }

    render() {
        if ( this.props.status === 'init' ) {
            return (
                <div className={ 'result init' }>

                </div>
            )
        } else if ( this.props.status === 'enterValidData' ) {
            return (
                <div className={ 'result enterValidData' }>{ this.props.error }</div>
            )
        } else if ( this.props.status === 'dataNotFound' ) {
            return (
                <div className={ 'result dataNotFound' }>The Expected Data is Not Available</div>
            )
        } else if ( this.props.status === 'loaded' ) {
            return (
                <div className={ 'result loaded' } id={ 'result' }>
                    <div className={ 'class-details' }>
                        <div className={ 'class-batch' }>
                            Batch: { this.props.classData.batch.split( '_' )[ 0 ] + ' - ' + this.props.classData.batch.split( '_' )[ 1 ] }
                        </div>
                        <div
                            className={ 'class-department' }>Department: { ( this.props.classData.department ).toUpperCase() }</div>
                        <div className={ 'class-semester' }>Semester: { this.props.classData.semester }</div>
                        <div className={ 'class-pass-percent' }>
                            Pass Percentage: { this.props.classData.passPercent }%
                        </div>
                        <div className={ 'class-fail-percent' }>
                            Fail Percentage: { 100 - parseInt( this.props.classData.passPercent ) }%
                        </div>
                        <div className={ 'print-data' }>
                            <button onClick={ this.handlePrintClick }>Print Data</button>
                        </div>
                    </div>
                    <div className={ 'result-data' }>
                        <Table1 tableData={ this.props.classData.result } subjects={ this.props.classData.subjects }/>
                        <div className={ 'graph-data' }>
                            <BarGraph graphData={ this.props.classData.subjectPassPercent }
                                      subjects={ this.props.classData.subjects }/>
                            <PirGraph graphData={ parseInt( this.props.classData.passPercent1 ) }/>
                        </div>
                    </div>
                    <RenderArrearData arrear={ '1' }
                                      tableData={ this.props.classData.arrear1 }
                                      subjects={ this.props.classData.subjects }
                                      result={ this.props.classData.result }
                                      barGraphData={ this.props.classData.subjectPassPercent1 }
                                      pieGraphData={ parseInt( this.props.classData.passPercent2 ) }/>
                    <RenderArrearData arrear={ '2' }
                                      tableData={ this.props.classData.arrear2 }
                                      subjects={ this.props.classData.subjects }
                                      result={ this.props.classData.result }
                                      barGraphData={ this.props.classData.subjectPassPercent2 }
                                      pieGraphData={ parseInt( this.props.classData.passPercent3 ) }/>
                    <RenderArrearData arrear={ '3' }
                                      tableData={ this.props.classData.arrear3 }
                                      subjects={ this.props.classData.subjects }
                                      result={ this.props.classData.result }
                                      barGraphData={ this.props.classData.subjectPassPercent3 }
                                      pieGraphData={ parseInt( this.props.classData.passPercent4 ) }/>
                </div>
            )
        }
    }
}

class RenderArrearData extends React.Component {
    render() {
        if ( Object.keys( this.props.tableData ).length > 0 ) {
            return (
                <div className={ 'arrear-' + this.props.arrear }>
                    <div className={ 'title' }>Arrear { this.props.arrear } Data</div>
                    <Table tableData={ this.props.tableData }
                           subjects={ this.props.subjects }
                           result={ this.props.result }/>
                    <div className={ 'graph-data' }><BarGraph
                        graphData={ this.props.barGraphData }
                        subjects={ this.props.subjects }/>
                        <PirGraph graphData={ parseInt( this.props.pieGraphData ) }/>
                    </div>
                </div>
            )
        } else {
            return ( <div className={ 'arrear-' + this.props.arrear }></div> )
        }
    }
}


class Table1 extends React.Component {
    render() {
        return (
            <div className={ 'table-data' }>
                <table className={ 'table' }>
                    <thead>
                    <tr>
                        <td>Registration Number</td>
                        <td>Name</td>
                        { this.props.subjects.map( subject => {
                            return <td>{ subject }</td>
                        } ) }
                        <td>GPA</td>
                    </tr>
                    </thead>
                    {
                        Object.keys( this.props.tableData ).map( regNo => {
                            return (
                                <tr>
                                    <td><a
                                        href={ 'http://localhost:3000/marks?action=view&type=individual&regNo=' + regNo }
                                        rel={ "noreferrer" }
                                        target={ '_blank' }>{ regNo }</a>
                                    </td>
                                    <td>{ this.props.tableData[ regNo ].Student_Name }</td>
                                    { this.props.subjects.map( subject => {
                                        if ( this.props.tableData[ regNo ][ subject ] === 'U' ) {
                                            return <td
                                                className={ 'fail' }>{ this.props.tableData[ regNo ][ subject ] }</td>
                                        }
                                        return <td>{ this.props.tableData[ regNo ][ subject ] }</td>
                                    } ) }
                                    <td>{ this.props.tableData[ regNo ].GPA }</td>
                                </tr>
                            )
                        } )
                    }
                </table>
            </div>
        );
    }
}

class Table extends React.Component {
    render() {
        return (
            <div className={ 'table-data' }>
                <table className={ 'table' }>
                    <thead>
                    <tr>
                        <td>Registration Number</td>
                        <td>Name</td>
                        { this.props.subjects.map( subject => {
                            return <td>{ subject }</td>
                        } ) }
                        <td>GPA</td>
                    </tr>
                    </thead>
                    {
                        Object.keys( this.props.tableData ).map( regNo => {
                            let data = []
                            this.props.subjects.forEach( sub => {
                                data.push( '' )
                            } )
                            this.props.tableData[ regNo ].forEach( sub => {
                                data[ this.props.subjects.indexOf( sub[ 'Subject_Code' ] ) ] = sub[ 'Grade' ]
                            } )
                            return (
                                <tr>
                                    <td><a
                                        href={ 'http://localhost:3000/marks?action=view&type=individual&regNo=' + regNo }>{ regNo }</a>
                                    </td>
                                    <td>{ this.props.result[ regNo ].Student_Name }</td>
                                    { data.map( subject => {
                                        if ( subject === 'U' ) {
                                            return <td
                                                className={ 'fail' }>{ subject }</td>
                                        }
                                        return <td>{ subject }</td>
                                    } ) }
                                    <td>{ this.props.tableData[ regNo ][ 0 ].GPA }</td>
                                </tr>
                            )
                        } )
                    }
                </table>
            </div>
        );
    }
}

export default MarksViewResult