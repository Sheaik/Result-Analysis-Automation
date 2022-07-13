import React from 'react'

class StudentSemData extends React.Component {

    format ( num ) {
        return parseInt( num * 1000 ) / 1000
    }

    render () {
        let credits = this.props.data.result.Credit, credit1, credit2, credit3
        let subjects = Object.keys( this.props.data.result ).filter( sub => sub !== 'Credit' )


        let RenderArrear1 = () => {
            credit1 = credits
            let grades = subjects.map( sub => '' )
            if ( this.props.data.arrear1 != null ) {
                this.props.data.arrear1.map( sub => {
                    Object.keys( sub ).map( item => {
                        if ( item !== 'Credit' ) {
                            grades[ subjects.indexOf( item ) ] = sub[ item ]
                            credit1 += sub[ 'Credit' ]
                        }
                        return null
                    } )
                    return null
                } )

                return (
                    <tr>
                        <td>Arrear 1</td>
                        {
                            grades.map( grade => {
                                if ( grade === 'U' ) {
                                    return <td className={ 'fail' } key={ grade }>{ grade }</td>
                                }
                                return <td key={ grade }>{ grade }</td>
                            } )
                        }
                        <td>{ this.format( credit1 / this.props.data.totalCredits ) }</td>
                    </tr>
                )
            } else {
                return ''
            }
        }

        let RenderArrear2 = () => {
            credit2 = credit1
            let grades = subjects.map( sub => '' )
            if ( this.props.data.arrear2 != null ) {
                this.props.data.arrear2.map( sub => {
                    Object.keys( sub ).map( item => {
                        if ( item !== 'Credit' ) {
                            grades[ subjects.indexOf( item ) ] = sub[ item ]
                            credit2 += sub[ 'Credit' ]
                        }
                        return null
                    } )
                    return null
                } )

                return (
                    <tr>
                        <td>Arrear 2</td>
                        {
                            grades.map( grade => {
                                if ( grade === 'U' ) {
                                    return <td className={ 'fail' } key={ grade }>{ grade }</td>
                                }
                                return <td key={ grade }>{ grade }</td>
                            } )
                        }
                        <td>{ this.format( credit2 / this.props.data.totalCredits ) }</td>
                    </tr>
                )
            } else {
                return ''
            }
        }

        let RenderArrear3 = () => {
            credit3 = credit2
            let grades = subjects.map( sub => '' )
            if ( this.props.data.arrear3 != null ) {
                this.props.data.arrear3.map( sub => {
                    Object.keys( sub ).map( item => {
                        if ( item !== 'Credit' ) {
                            grades[ subjects.indexOf( item ) ] = sub[ item ]
                            credit3 += sub[ 'Credit' ]
                        }
                        return null
                    } )
                    return null
                } )

                return (
                    <tr>
                        <td>Arrear 3</td>
                        {
                            grades.map( grade => {
                                if ( grade === 'U' ) {
                                    return <td className={ 'fail' } key={ grade }>{ grade }</td>
                                }
                                return <td key={ grade }>{ grade }</td>
                            } )
                        }
                        <td>{ this.format( credit3 / this.props.data.totalCredits ) }</td>
                    </tr>
                )
            } else {
                return ''
            }
        }

        return (
            <div className={ 'sem-data sem-' + this.props.data.semester }>
                <div className={ 'sem-num' }>Semester: { this.props.data.semester }</div>
                <div className={ 'table-data' }>
                    <table>
                        <thead>
                        <tr>
                            <td>Subjects</td>
                            {
                                subjects.map( subject => {
                                    return <td key={ subject }>{ subject }</td>
                                } )
                            }
                            <td>GPA</td>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>Grades</td>
                            {
                                subjects.map( subject => {
                                    if ( this.props.data.result[ subject ] === 'U' ) {
                                        return <td className={ 'fail' }
                                                   key={ this.props.data.result[ subject ] }>{ this.props.data.result[ subject ] }</td>
                                    }
                                    return <td key={ subject }>{ this.props.data.result[ subject ] }</td>
                                } )
                            }
                            <td>{ this.format( credits / this.props.data.totalCredits ) }</td>
                        </tr>
                        <RenderArrear1/>
                        <RenderArrear2/>
                        <RenderArrear3/>
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}


export default StudentSemData