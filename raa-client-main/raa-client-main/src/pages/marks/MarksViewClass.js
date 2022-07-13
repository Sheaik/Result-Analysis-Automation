import React from 'react'
import '../../css/marks/MarksViewClass.css'
import Axios from "axios";
import MarksViewResult from "./MarksViewResult";

class MarksViewClass extends React.Component {
    constructor( props ) {
        super( props );
        this.state = {
            batch: '',
            department: '',
            section: '',
            semester: '',
            resultStatus: 'init',
            errorStatus: '',
            classData: null
        }
        this.handleBatchChange = this.handleBatchChange.bind( this )
        this.handleDepartmentChange = this.handleDepartmentChange.bind( this )
        this.handleSectionChange = this.handleSectionChange.bind( this )
        this.handleSemesterChange = this.handleSemesterChange.bind( this )
        this.handleSearchClick = this.handleSearchClick.bind( this )
    }

    handleBatchChange() {
        this.setState( {
            batch: document.getElementById( 'Batch' ).value
        } )
    }

    handleDepartmentChange() {
        this.setState( {
            department: document.getElementById( 'Department' ).value
        } )
    }

    handleSectionChange() {
        this.setState( {
            section: document.getElementById( 'Section' ).value
        } )
    }

    handleSemesterChange() {
        this.setState( {
            semester: document.getElementById( 'Semester' ).value
        } )
    }

    handleSearchClick() {
        let dataPresent = true, error = '', checkAll = true
        let regEx1 = /([2][0-9]{3}-[2][0-9]{3})/
        let regex2 = /[a-z]/
        let regEx3 = /[1-8]/
        if ( this.state.batch === '' || this.state.batch == null || !regEx1.test( this.state.batch ) ) {
            dataPresent = false
            checkAll = false
            error = 'Enter a Valid Batch'
            console.log( error )
        }
        if ( ( this.state.department === '' || this.state.department == null ) && checkAll ) {
            dataPresent = false
            error = 'Select a Valid Department'
            console.log( error )
        }
        if ( ( this.state.section === '' || this.state.section == null || !regex2.test( this.state.section ) ) && checkAll ) {
            dataPresent = false
            error = 'Enter a valid Section'
            console.log( error )
        }
        if ( ( this.state.semester === '' || this.state.semester == null || !regEx3.test( this.state.semester ) ) && checkAll ) {
            dataPresent = false
            error = 'Enter a valid Semester'
            console.log( error )
        }
        if ( dataPresent ) {
            Axios.get( 'http://localhost:5000/marks/class?Batch=' + this.state.batch.split( '-' )[ 0 ] + '_' + this.state.batch.split( '-' )[ 1 ] + '&Department=' + this.state.department + '&Section=' + this.state.section + '&Semester=' + this.state.semester )
                .then( res => {
                    console.log( res.data.status )
                    if ( res.data.status === 200 && res.data.success ) {
                        console.log( res.data.marksData )
                        this.setState( {
                            classData: res.data.marksData,
                            resultStatus: 'loaded'
                        } )
                    } else if ( res.data.status === 500 ) {
                        this.setState( {
                            resultStatus: 'dataNotFound'
                        } )
                    }
                } )
        } else {
            this.setState( {
                resultStatus: 'enterValidData',
                errorStatus: error
            } )
        }
    }

    render() {
        return (
            <div className={ 'MarksViewClass' }>
                <div className={ 'title' }>View Mark of a Class</div>
                <div className={ 'header' }>
                    <div className={ 'input-section' }>
                        <div className={ 'Batch' }>
                            <input type={ 'text' } placeholder={ 'Enter the Batch(Ex: 2018-2022)' } id={ 'Batch' }
                                   value={ this.state.batch } onChange={ this.handleBatchChange }/>
                        </div>
                        <div className={ 'Department' }>
                            <select id={ 'Department' } onChange={ this.handleDepartmentChange }>
                                <option value={ '' } selected={ this.state.department === '' ? true : false }>Select
                                    Department
                                </option>
                                <option value={ 'cse' }
                                        selected={ this.state.department === 'cse' ? true : false }>Computer Science
                                    Engineering
                                </option>
                                <option value={ 'it' }
                                        selected={ this.state.department === 'it' ? true : false }>Information
                                    Technology
                                </option>
                                <option value={ 'auto' }
                                        selected={ this.state.department === 'auto' ? true : false }>Automobile
                                    Engineering
                                </option>
                                <option value={ 'mech' }
                                        selected={ this.state.department === 'mech' ? true : false }>Mechanical
                                    Engineering
                                </option>
                                <option value={ 'eee' }
                                        selected={ this.state.department === 'eee' ? true : false }>Electrical And
                                    Electronics Engineering
                                </option>
                                <option value={ 'ece' }
                                        selected={ this.state.department === 'ece' ? true : false }>Electronics and
                                    Communication Engineering
                                </option>
                                <option value={ 'eie' }
                                        selected={ this.state.department === 'eie' ? true : false }>Electronics and
                                    Instrumentation Engineering
                                </option>
                                <option value={ 'civil' }
                                        selected={ this.state.department === 'civil' ? true : false }>Civil Engineering
                                    Engineering
                                </option>
                            </select></div>
                        <div className={ 'Section' }>
                            <input type={ 'text' } placeholder={ 'Enter the Section' } id={ 'Section' }
                                   value={ this.state.section } onChange={ this.handleSectionChange }/></div>
                        <div className={ 'Semester' }>
                            <input type={ 'text' } placeholder={ 'Enter the Semester' } id={ 'Semester' }
                                   value={ this.state.semester } onChange={ this.handleSemesterChange }/></div>
                        <div className={ 'Search' }>
                            <button onClick={ this.handleSearchClick }>Search</button>
                        </div>
                    </div>
                </div>
                <MarksViewResult classData={ this.state.classData } status={ this.state.resultStatus }
                                 error={ this.state.errorStatus }/>
            </div>
        )
    }
}

//
// class MarksViewClassResult extends React.Component {
//     handlePrintClick() {
//         let canvas = document.getElementById( "result" );
//         Html2canvas( canvas ).then( canvasImg => {
//             let imgData = canvasImg.toDataURL( "image/png", 2.0 );
//             let pdf = new jsPDF( {
//                 orientation: "portrait",
//                 unit: "in",
//                 format: [ 8, 6 ]
//             } )
//             pdf.addImage( imgData, 'PNG', 0, 0, 6, 8, '', 'SLOW' );
//             pdf.save( "download.pdf" );
//         } )
//     }
//
//     render() {
//         if ( this.props.status === 'init' ) {
//             return (
//                 <div className={ 'result init' }>
//
//                 </div>
//             )
//         } else if ( this.props.status === 'enterValidData' ) {
//             return (
//                 <div className={ 'result enterValidData' }>{ this.props.error }</div>
//             )
//         } else if ( this.props.status === 'dataNotFound' ) {
//             return (
//                 <div className={ 'result dataNotFound' }>The Data of the Registration Number entered is Not Found</div>
//             )
//         } else if ( this.props.status === 'loaded' ) {
//             return (
//                 <div className={ 'result loaded' } id={ 'result' }>
//                     <div className={ 'class-details' }>
//                         <div className={ 'class-batch' }>
//                             Batch: { this.props.classData.batch.split( '_' )[ 0 ] + ' - ' + this.props.classData.batch.split( '_' )[ 1 ] }
//                         </div>
//                         <div
//                             className={ 'class-department' }>Department: { ( this.props.classData.department ).toUpperCase() }</div>
//                         <div
//                             className={ 'class-section' }>Section: { ( this.props.classData.section ).toUpperCase() }</div>
//                         <div className={ 'class-semester' }>Semester: { this.props.classData.semester }</div>
//                         <div className={ 'class-pass-percent' }>
//                             Pass Percentage: { this.props.classData.passPercent }%
//                         </div>
//                         <div className={ 'class-fail-percent' }>
//                             Fail Percentage: { 100 - parseInt( this.props.classData.passPercent ) }%
//                         </div>
//                         <div className={ 'print-data' }>
//                             <button onClick={ this.handlePrintClick }>Print Data</button>
//                         </div>
//                     </div>
//                     <div className={ 'result-data' }>
//                         <Table1 tableData={ this.props.classData.result } subjects={ this.props.classData.subjects }/>
//                         <div className={ 'graph-data' }>
//                             <BarGraph graphData={ this.props.classData.subjectPassPercent }
//                                       subjects={ this.props.classData.subjects }/>
//                             <PirGraph graphData={ parseInt( this.props.classData.passPercent1 ) }/>
//                         </div>
//                     </div>
//                     <RenderArrearData arrear={ '1' }
//                                       tableData={ this.props.classData.arrear1 }
//                                       subjects={ this.props.classData.subjects }
//                                       result={ this.props.classData.result }
//                                       barGraphData={ this.props.classData.subjectPassPercent1 }
//                                       pieGraphData={ parseInt( this.props.classData.passPercent2 ) }/>
//                     <RenderArrearData arrear={ '2' }
//                                       tableData={ this.props.classData.arrear2 }
//                                       subjects={ this.props.classData.subjects }
//                                       result={ this.props.classData.result }
//                                       barGraphData={ this.props.classData.subjectPassPercent2 }
//                                       pieGraphData={ parseInt( this.props.classData.passPercent3 ) }/>
//                     <RenderArrearData arrear={ '3' }
//                                       tableData={ this.props.classData.arrear3 }
//                                       subjects={ this.props.classData.subjects }
//                                       result={ this.props.classData.result }
//                                       barGraphData={ this.props.classData.subjectPassPercent3 }
//                                       pieGraphData={ parseInt( this.props.classData.passPercent4 ) }/>
//                 </div>
//             )
//         }
//     }
// }

// class RenderArrearData extends React.Component {
//     render() {
//         if ( Object.keys( this.props.tableData ).length > 0 ) {
//             return (
//                 <div className={ 'arrear-' + this.props.arrear }>
//                     <div className={ 'title' }>Arrear { this.props.arrear } Data</div>
//                     <Table tableData={ this.props.tableData }
//                            subjects={ this.props.subjects }
//                            result={ this.props.result }/>
//                     <div className={ 'graph-data' }><BarGraph
//                         graphData={ this.props.barGraphData }
//                         subjects={ this.props.subjects }/>
//                         <PirGraph graphData={ parseInt( this.props.pieGraphData ) }/>
//                     </div>
//                 </div>
//             )
//         } else {
//             return ( <div className={ 'arrear-' + this.props.arrear }></div> )
//         }
//     }
// }
//
// class Table1 extends React.Component {
//     render() {
//         return (
//             <div className={ 'table-data' }>
//                 <table className={ 'table' }>
//                     <thead>
//                     <tr>
//                         <td>Registration Number</td>
//                         <td>Name</td>
//                         { this.props.subjects.map( subject => {
//                             return <td>{ subject }</td>
//                         } ) }
//                         <td>GPA</td>
//                     </tr>
//                     </thead>
//                     {
//                         Object.keys( this.props.tableData ).map( regNo => {
//                             return (
//                                 <tr>
//                                     <td><a
//                                         href={ 'http://localhost:3000/marks?action=view&type=individual&regNo=' + regNo }
//                                         rel={ "noreferrer" }
//                                         target={ '_blank' }>{ regNo }</a>
//                                     </td>
//                                     <td>{ this.props.tableData[ regNo ].Student_Name }</td>
//                                     { this.props.subjects.map( subject => {
//                                         if ( this.props.tableData[ regNo ][ subject ] === 'U' ) {
//                                             return <td
//                                                 className={ 'fail' }>{ this.props.tableData[ regNo ][ subject ] }</td>
//                                         }
//                                         return <td>{ this.props.tableData[ regNo ][ subject ] }</td>
//                                     } ) }
//                                     <td>{ this.props.tableData[ regNo ].GPA }</td>
//                                 </tr>
//                             )
//                         } )
//                     }
//                 </table>
//             </div>
//         );
//     }
// }
//
// class Table extends React.Component {
//     render() {
//         return (
//             <div className={ 'table-data' }>
//                 <table className={ 'table' }>
//                     <thead>
//                     <tr>
//                         <td>Registration Number</td>
//                         <td>Name</td>
//                         { this.props.subjects.map( subject => {
//                             return <td>{ subject }</td>
//                         } ) }
//                         <td>GPA</td>
//                     </tr>
//                     </thead>
//                     {
//                         Object.keys( this.props.tableData ).map( regNo => {
//                             let data = []
//                             this.props.subjects.forEach( sub => {
//                                 data.push( '' )
//                             } )
//                             this.props.tableData[ regNo ].forEach( sub => {
//                                 data[ this.props.subjects.indexOf( sub[ 'Subject_Code' ] ) ] = sub[ 'Grade' ]
//                             } )
//                             return (
//                                 <tr>
//                                     <td><a
//                                         href={ 'http://localhost:3000/marks?action=view&type=individual&regNo=' + regNo }>{ regNo }</a>
//                                     </td>
//                                     <td>{ this.props.result[ regNo ].Student_Name }</td>
//                                     { data.map( subject => {
//                                         if ( subject === 'U' ) {
//                                             return <td
//                                                 className={ 'fail' }>{ subject }</td>
//                                         }
//                                         return <td>{ subject }</td>
//                                     } ) }
//                                     <td>{ this.props.tableData[ regNo ][ 0 ].GPA }</td>
//                                 </tr>
//                             )
//                         } )
//                     }
//                 </table>
//             </div>
//         );
//     }
// }

export default MarksViewClass