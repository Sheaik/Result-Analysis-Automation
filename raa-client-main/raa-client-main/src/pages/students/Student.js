import React from 'react'
import Navbar from "../navbar/Navbar";
import '../../css/student/Student.css'
import StudentAddIndividual from "./StudentAddIndividual";
import StudentAddClass from "./StudentAddClass";
import StudentAddDepartment from "./SudentAddDepartment";
import StudentUpdate from "./StudentUpdate";
import StudentDelete from "./StudentDelete";

class Student extends React.Component {
    render() {
        const queryParams = new URLSearchParams( window.location.search )
        const action = queryParams.get( 'action' )
        const type = queryParams.get( 'type' )
        return (
            <div className={ 'Student' }>
                <Navbar/>
                <div className={ 'container' }>
                    {
                        ( action === 'add' && type === 'individual' ) ? <StudentAddIndividual/>
                            : ( action === 'add' && type === 'class' ) ? <StudentAddClass/>
                                : ( action === 'add' && type === 'department' ) ? <StudentAddDepartment/>
                                    : ( action === 'update' ) ? <StudentUpdate/>
                                        : ( action === 'delete' ) ? <StudentDelete/>
                                            : 'PageNotFound'
                    }
                </div>
            </div>
        )
    }
}

export default Student