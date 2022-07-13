import React from 'react'
import { Pie } from 'react-chartjs-2'

class BarGraph extends React.Component {
    render () {
        let graphData = {
            labels: [ 'Pass Percentage', 'Fail Percentage' ],
            datasets: [
                {
                    label: '%',
                    data: [ this.props.graphData, 100 - this.props.graphData ],
                    backgroundColor: [
                        'rgba(53,255,31,0.7)',
                        'rgba(255,31,31,0.7)'
                    ],
                    borderColor: 'rgba(0,0,0,1)',
                    borderWidth: 1,
                }
            ],
        }
        return (
            <div className={ 'PieGraph' }>
                <Pie
                    data={ graphData }
                    height={ 400 }
                    width={ 600 }
                    options={ {
                        maintainAspectRatio: false,
                        scales: {
                            y: {
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