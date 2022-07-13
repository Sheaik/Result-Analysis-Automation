import React from 'react'
import { Bar } from 'react-chartjs-2'

class BarGraph extends React.Component {
    render () {
        let data = []
        this.props.subjects.forEach(subject => {
            data.push(this.props.graphData[subject])
        })
        let graphData = {
            labels: this.props.subjects,
            datasets: [
                {
                    label: 'Subject Pass Percentage',
                    data: data,
                    backgroundColor: 'rgba(166,39,234,0.6)',
                    borderColor: 'rgb(0,0,0)',
                    borderWidth: 1,
                    barThickness: 30
                },
            ],
        }
        return (
            <div className={ 'BarGraph' }>
                <Bar
                    data={ graphData }
                    height={ 400 }
                    width={ 600 }
                    options={ {
                        maintainAspectRatio: false,
                        scales: {
                            y:{
                                beginAtZero: true
                            }
                        }
                    } }
                />
            </div>
        );
    }
}

export default BarGraph