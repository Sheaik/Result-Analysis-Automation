import React from 'react'
import '../../css/Navbar.css'
import { Link } from "react-router-dom";

class Navbar extends React.Component {
    constructor ( props ) {
        super( props );
        this.state = {
            studentHovered: 'studentNotHovered',
            marksHovered: 'marksNotHovered',
            studentAddHovered: 'studentAddNotHovered',
            marksViewHovered: 'marksViewNotHovered',
            marksAddHovered: 'marksAddNotHovered',
            urlLists: {
                'home': '/home',
                'student': {
                    'default': '#',
                    'add': {
                        'individual': '/student?action=add&type=individual',
                        'class': '/student?action=add&type=class',
                        'department': '/student?action=add&type=department'
                    },
                    'update': '/student?action=update',
                    'delete': '/student?action=delete'
                },
                'marks': {
                    'default': '#',
                    'add': {
                        'individual': '/marks?action=add&type=individual',
                        'class': '/marks?action=add&type=class',
                        'department': '/marks?action=add&type=department'
                    },
                    'update': '/marks?action=update',
                    'delete': '/marks?action=delete',
                    'view': {
                        'individual': '/marks?action=view&type=individual',
                        'class': '/marks?action=view&type=class',
                        'department': '/marks?action=view&type=department',
                        'college': '/marks?action=view&type=college'
                    }
                }
            }
        }
        this.handleStudentMouseOver = this.handleStudentMouseOver.bind( this )
        this.handleStudentMouseOut = this.handleStudentMouseOut.bind( this )
        this.handleMarksMouseOver = this.handleMarksMouseOver.bind( this )
        this.handleMarksMouseOut = this.handleMarksMouseOut.bind( this )
        this.handleStudentAddMouseOver = this.handleStudentAddMouseOver.bind( this )

        this.handleStudentAddMouseOut = this.handleStudentAddMouseOut.bind( this )
        this.handleMarksAddMouseOver = this.handleMarksAddMouseOver.bind( this )
        this.handleMarksAddMouseOut = this.handleMarksAddMouseOut.bind( this )
        this.handleMarksViewMouseOver = this.handleMarksViewMouseOver.bind( this )
        this.handleMarksViewMouseOut = this.handleMarksViewMouseOut.bind( this )
    }

    handleStudentMouseOver () {
        this.setState( {
            studentHovered: "studentHovered"
        } )
    }

    handleStudentMouseOut () {
        this.setState( {
            studentHovered: "studentNotHovered"
        } )
    }

    handleMarksMouseOver () {
        this.setState( {
            marksHovered: "marksHovered"
        } )
    }

    handleMarksMouseOut () {
        this.setState( {
            marksHovered: "marksNotHovered"
        } )
    }

    handleStudentAddMouseOver () {
        this.setState( {
            studentAddHovered: "studentAddHovered"
        } )
    }

    handleStudentAddMouseOut () {
        this.setState( {
            studentAddHovered: "studentAddNotHovered"
        } )
    }

    handleMarksAddMouseOver () {
        this.setState( {
            marksAddHovered: "marksAddHovered"
        } )
    }

    handleMarksAddMouseOut () {
        this.setState( {
            marksAddHovered: "marksAddNotHovered"
        } )
    }

    handleMarksViewMouseOver () {
        this.setState( {
            marksViewHovered: "marksViewHovered"
        } )
    }

    handleMarksViewMouseOut () {
        this.setState( {
            marksViewHovered: "marksViewNotHovered"
        } )
    }

    render () {
        return (<div className={ 'NavBar' }>
            <div className={ 'logo' }>Result Analysis Automation</div>
            <div className={ 'menu-desktop' }>
                <div className={ 'home-nav' }>
                    <Link to={ this.state.urlLists.home }>Home</Link>
                </div>
                <div className={ 'divider' }></div>
                <div className={ 'student-nav ' + this.state.studentHovered }
                     onMouseOver={ this.handleStudentMouseOver } onMouseOut={ this.handleStudentMouseOut }>
                    <div className={ 'link' }>Student</div>
                    <div className={ 'sub-student-nav' }>
                        <ul>
                            <li onMouseOver={ this.handleStudentAddMouseOver }
                                onMouseOut={ this.handleStudentAddMouseOut }>
                                <div className={ 'student-add' }>Add</div>
                                <div className={ 'student-add-nav ' + this.state.studentAddHovered }>
                                    <ul>
                                        {/*<li><Link to={ this.state.urlLists.student.add.individual }>Individual</Link>*/}
                                        {/*</li>*/}
                                        {/*<li><Link to={ this.state.urlLists.student.add.class }>Class</Link></li>*/}
                                        <li><Link to={ this.state.urlLists.student.add.department }>Department</Link>
                                        </li>
                                    </ul>
                                </div>
                            </li>
                            {/*<li><Link to={ this.state.urlLists.student.update }>Update</Link></li>*/}
                            {/*<li><Link to={ this.state.urlLists.student.delete }>Delete</Link></li>*/}
                        </ul>
                    </div>
                </div>
                <div className={ 'divider' }></div>
                <div className={ 'marks-nav ' + this.state.marksHovered } onMouseOver={ this.handleMarksMouseOver }
                     onMouseOut={ this.handleMarksMouseOut }>
                    <div className={ 'link' }>Marks</div>
                    <div className={ 'sub-marks-nav' }>
                        <ul>
                            <li onMouseOver={ this.handleMarksViewMouseOver }
                                onMouseOut={ this.handleMarksViewMouseOut }>
                                <div className={ 'marks-view' }>View</div>
                                <div className={ 'marks-view-nav ' + this.state.marksViewHovered }>
                                    <ul>
                                        <li><Link to={ this.state.urlLists.marks.view.individual }>Individual</Link></li>
                                        <li><Link to={ this.state.urlLists.marks.view.class }>Class</Link></li>
                                        <li><Link to={ this.state.urlLists.marks.view.department }>Department</Link></li>
                                        {/*<li><Link to={ this.state.urlLists.marks.view.college }>College</Link></li>*/}
                                    </ul>
                                </div>
                            </li>
                            <li onMouseOver={ this.handleMarksAddMouseOver } onMouseOut={ this.handleMarksAddMouseOut }>
                                <div className={ 'marks-add' }>Add</div>
                                <div className={ 'marks-add-nav ' + this.state.marksAddHovered }>
                                    <ul>
                                        {/*<li><Link to={ this.state.urlLists.marks.add.individual }>Individual</Link></li>*/}
                                        {/*<li><Link to={ this.state.urlLists.marks.add.class }>Class</Link></li>*/}
                                        <li><Link to={ this.state.urlLists.marks.add.department }>Department</Link></li>
                                    </ul>
                                </div>
                            </li>
                            {/*<li><Link to={ this.state.urlLists.marks.update }>Update</Link></li>*/}
                            {/*<li><Link to={ this.state.urlLists.marks.delete }>Delete</Link></li>*/}
                        </ul>
                    </div>
                </div>
                <div className={ 'divider' }></div>
                <div className={ 'logout' }><Link to={ '/' }>Logout</Link></div>
            </div>
        </div>)
    }
}

export default Navbar