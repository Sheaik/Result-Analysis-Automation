import React from 'react'
import '../../css/Home.css'
import Navbar from "../navbar/Navbar";
import ResultImage from "../../assets/ResultImage.jpg"

class Home extends React.Component {
    handleStudentClick = () => {
        this.props.history.push( '/student' )
    }

    handleMarkClick = () => {
        this.props.history.push( '/marks' )
    }

    render() {
        return (
            <div className={ 'home' }>
                <Navbar/>

                <div className={ 'container' }>
                    <div className={ 'home-image' }>
                        <img src={ ResultImage } alt={ 'Result' }/>
                    </div>
                    <div className={ 'home-note' }>
                        <div className={'title'}>
                            Objective
                        </div>
                        <div className={'notes'}>
                            Technology in today’s world has reached to extent that it can be used to do various task in
                            day to day life easily with less effort and time. World today has realized importance of
                            education in one’s life which has led to revolution in field of education. Universities, colleges,
                            schools today have loads of task to be completed in given timeline. In today’s scenario colleges
                            needs to analyze student results manually which takes lots of time and effort by faculties
                            working on it. Hence in order to simplify this tasks a web based system is introduced
                            which can perform student result analysis. The system takes file of student results obtained
                            by universities in pdf format as an input. This system runs on web browser on computer with
                            well-connected network. Using Report Analysis Automation will make the examination cell
                            activities more efficient by wrapping the drawbacks of manual systems like accuracy, time, speed and
                            simplicity. This system will ensure examination activities are carried more effectively and
                            it can be accessible and will be convenient for staff by making it a centralized system. Finally
                            this product would an aimed automation system, which will replace present examination cell
                            process. Result Analysis Automation is a new concept which came into existence to reduce heavy burden
                            on examination cell and it made analysis of results a monotonous task, apart from the large
                            amount of data that is generated in a college for various branches of all semesters. This system
                            will make the analysis process much organized and will require data to be pre-existing. This
                            automation, however will manage a great deal of menial work. Finally this system will minimize the
                            manual work, which leads to ease of generating reports, reducing confusions and increase in work
                            rate effectively.
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Home