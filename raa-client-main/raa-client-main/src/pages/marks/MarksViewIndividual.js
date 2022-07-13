import React from 'react'
import '../../css/marks/MarksViewIndividual.css'
import Axios from "axios";
import LineGraph from "./LineGraph";
import StudentSemData from "./StudentSemData";
import Html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

const DATA_NOT_FOUND = 'Data Not Found';

class MarksViewIndividual extends React.Component {
    constructor( props ) {
        super( props )
        this.state = {
            registrationNumber: '',
            studentData: null,
            resultStatus: 'init',
            graphData: null
        }
        this.handleRegNumChange = this.handleRegNumChange.bind( this )
        this.handleSearchClick = this.handleSearchClick.bind( this )
        this.handleEnterPress = this.handleEnterPress.bind( this )
    }

    handleRegNumChange() {
        this.setState( {
            registrationNumber: document.getElementById( 'RegNumber' ).value
        } )
    }

    handleEnterPress( event ) {
        event.preventDefault()
        if ( event.code === 'Enter' ) {
            this.handleSearchClick()
        }
    }

    async componentDidMount() {
        const queryParams = new URLSearchParams( window.location.search )
        const regNo = queryParams.get( 'regNo' )
        if ( regNo !== '' && regNo != null ) {
            await this.setState( {
                registrationNumber: regNo
            } )
            this.handleSearchClick()
        }
    }

    handleSearchClick() {
        const regEx = /([1-9])([0-9]{11})/
        if ( regEx.test( this.state.registrationNumber ) ) {
            Axios.get( 'http://localhost:5000/marks/?RegNum=' + this.state.registrationNumber )
                .then( res => {
                    console.log( res.data )
                    if ( res.data.status === 200 && res.data.success ) {
                        console.log( "Data received" )
                        this.setState( {
                            studentData: res.data.marksData,
                            resultStatus: 'loaded'
                        } )
                        this.findGraphData()
                    } else if ( res.data.status === 500 && res.data.description === DATA_NOT_FOUND ) {
                        console.log( 'datanotfound' )
                        this.setState( {
                            resultStatus: 'dataNotFound'
                        } )
                    }
                } )
        } else {
            this.setState( {
                resultStatus: 'enterValidData'
            } )
        }
    }

    format( num ) {
        return parseInt( num * 1000 ) / 1000
    }

    findGraphData() {
        let data = this.state.studentData.data
        let labels = []
        let graphData = []
        data.map( sem => {
            let credits = sem.result.Credit
            labels.push( 'Semester ' + sem.semester )
            graphData.push( this.format( credits / sem.totalCredits ) )
            if ( sem.arrear1 != null ) {
                sem.arrear1.map( sub => {
                    credits += sub.Credit
                    return null
                } )
                graphData[ sem.semester - 1 ] = this.format( credits / sem.totalCredits )
            }

            if ( sem.arrear2 != null ) {
                sem.arrear2.map( sub => {
                    credits += sub.Credit
                    return null
                } )
                graphData[ sem.semester - 1 ] = this.format( credits / sem.totalCredits )
            }

            if ( sem.arrear3 != null ) {
                sem.arrear3.map( sub => {
                    credits += sub.Credit
                    return null
                } )
                graphData[ sem.semester - 1 ] = this.format( credits / sem.totalCredits )
            }
            return null
        } )
        console.log( this.state.studentData )
        this.setState( {
            graphData: {
                labels: labels,
                datasets: [
                    {
                        label: 'GPA',
                        data: graphData,
                        fill: false,
                        backgroundColor: 'rgba(75, 192, 192,0.5)',
                        borderColor: 'rgb(75, 192, 192)',
                        borderWidth: 2
                    }
                ]
            }
        } )
    }

    render() {
        return (
            <div className={ 'MarksViewIndividual' }>
                <div className={ 'title' }>View Mark of a Individual Student</div>
                <div className={ 'header' }>
                    <div className={ 'input-section' }>
                        <input type={ 'text' } placeholder={ 'Enter the Registration Number' } id={ 'RegNumber' }
                               value={ this.state.registrationNumber } onChange={ this.handleRegNumChange }
                               onKeyUp={ this.handleEnterPress }/>
                        <button onClick={ this.handleSearchClick }>Search</button>
                    </div>
                    <div className={ 'sub-script' }>
                        Or select from the <a href={ '/marks?action=view&type=class' }>CLASS LIST</a>
                    </div>
                </div>
                <MarksViewIndividualResult studentData={ this.state.studentData } status={ this.state.resultStatus }
                                           graphData={ this.state.graphData }/>
            </div>
        );
    }
}

class MarksViewIndividualResult extends React.Component {

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
                <div className={ 'result enterValidData' }>Enter a valid Registration Number</div>
            )
        } else if ( this.props.status === 'loaded' ) {
            return (
                <div className={ 'result loaded' } id={ 'result' }>

                    <div className={ 'student-details' }>
                        <div className={ 'student-name' }>
                            Student Name: { this.props.studentData.name }
                        </div>
                        <div className={ 'student-regno' }>
                            Registration Number: { this.props.studentData.regNum }
                        </div>
                        <div className={ 'student-dept' }>
                            Department: { this.props.studentData.dept }
                        </div>
                        <div className={ 'student-batch' }>
                            Batch: { this.props.studentData.batch.split( '_' )[ 0 ] } - { this.props.studentData.batch.split( '_' )[ 1 ] }
                        </div>
                        <div className={ 'print-data' }>
                            <button onClick={ this.handlePrintClick }>Print Data</button>
                        </div>
                    </div>

                    <LineGraph graphData={ this.props.graphData }/>

                    { this.props.studentData.data.map( sem => {
                        return <StudentSemData key={ sem.semester } data={ sem }/>
                    } ) }

                </div>
            )
        } else if ( this.props.status === 'dataNotFound' ) {
            return (
                <div className={ 'result dataNotFound' }>The Data of the Registration Number entered is Not Found</div>
            )
        }
    }
}


export default MarksViewIndividual