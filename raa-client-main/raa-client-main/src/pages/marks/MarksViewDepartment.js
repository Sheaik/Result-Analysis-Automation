import React from 'react'
import Axios from "axios";
import MarksViewResult from "./MarksViewResult";
import '../../css/marks/MarksViewDepartment.css'

class MarksViewDepartment extends React.Component {
    constructor( props ) {
        super( props );
        this.state = {
            batch: '',
            department: '',
            semester: '',
            resultStatus: 'init',
            errorStatus: '',
            classData: null
        }
        this.handleBatchChange = this.handleBatchChange.bind( this )
        this.handleDepartmentChange = this.handleDepartmentChange.bind( this )
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

    handleSemesterChange() {
        this.setState( {
            semester: document.getElementById( 'Semester' ).value
        } )
    }

    handleSearchClick() {
        let dataPresent = true, error = '', checkAll = true
        let regEx1 = /([2][0-9]{3}-[2][0-9]{3})/
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
        if ( ( this.state.semester === '' || this.state.semester == null || !regEx3.test( this.state.semester ) ) && checkAll ) {
            dataPresent = false
            error = 'Enter a valid Semester'
            console.log( error )
        }
        if ( dataPresent ) {
            Axios.get( 'http://localhost:5000/marks/department?Batch=' + this.state.batch.split( '-' )[ 0 ] + '_' + this.state.batch.split( '-' )[ 1 ] + '&Department=' + this.state.department + '&Semester=' + this.state.semester )
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
            <div className={ 'MarksViewDepartment' }>
                <div className={ 'title' }>View Mark of a Department</div>
                <div className={ 'header' }>
                    <div className={ 'input-section' }>
                        <div className={ 'Batch' }>
                            <input type={ 'text' } placeholder={ 'Enter the Batch(Ex: 2018-2022)' } id={ 'Batch' }
                                   value={ this.state.batch } onChange={ this.handleBatchChange }/>
                        </div>
                        <div className={ 'Department' }>
                            <select id={ 'Department' } onChange={ this.handleDepartmentChange }>
                                <option value={ '' }>
                                    Select Department
                                </option>
                                <option value={ 'cse' }>
                                    Computer Science Engineering
                                </option>
                                <option value={ 'it' }>
                                    Information Technology
                                </option>
                                <option value={ 'auto' }>
                                    Automobile Engineering
                                </option>
                                <option value={ 'mech' }>
                                    Mechanical Engineering
                                </option>
                                <option value={ 'eee' }>
                                    Electrical And Electronics Engineering
                                </option>
                                <option value={ 'ece' }>
                                    Electronics and Communication Engineering
                                </option>
                                <option value={ 'eie' }>
                                    Electronics and Instrumentation Engineering
                                </option>
                                <option value={ 'civil' }>
                                    Civil Engineering Engineering
                                </option>
                            </select></div>
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
        );
    }
}


export default MarksViewDepartment