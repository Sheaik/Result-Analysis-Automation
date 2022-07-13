import React from 'react'
import '../../css/marks/Marks.css'
import Navbar from "../navbar/Navbar";
import MarksViewIndividual from "./MarksViewIndividual";
import MarksViewClass from "./MarksViewClass";
import MarksViewCollege from "./MarksViewCollege";
import MarksViewDepartment from "./MarksViewDepartment";
import MarksAddIndividual from "./MarksAddIndividual";
import MarksAddClass from "./MarksAddClass";
import MarksAddDepartment from "./MarksAddDepartment";
import MarksUpdate from "./MarksUpdate";
import MarksDelete from "./MarksDelete";

class Marks extends React.Component {

    render () {
        const queryParams = new URLSearchParams( window.location.search )
        const action = queryParams.get( 'action' )
        const type = queryParams.get( 'type' )
        return (
            <div className={ 'Marks' }>
                <Navbar/>
                <div className={ 'container' }>
                    {
                        (action === 'add' && type === 'individual') ? <MarksAddIndividual/>
                            : (action === 'add' && type === 'class') ? <MarksAddClass/>
                            : (action === 'add' && type === 'department') ? <MarksAddDepartment/>
                                : (action === 'view' && type === 'individual') ? <MarksViewIndividual/>
                                    : (action === 'view' && type === 'class') ? <MarksViewClass/>
                                        : (action === 'view' && type === 'department') ? <MarksViewDepartment/>
                                            : (action === 'view' && type === 'college') ? <MarksViewCollege/>
                                                : (action === 'update') ? <MarksUpdate/>
                                                    : (action === 'delete') ? <MarksDelete/>
                                                        : 'PageNotFound'
                    }
                </div>
            </div>
        )
    }
}

export default Marks