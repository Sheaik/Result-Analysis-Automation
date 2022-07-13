import React from 'react'
import { Line } from 'react-chartjs-2'

class LineGraph extends React.Component {
    render () {
        return (
            <div className={ 'LineGraph' }>
                <Line
                    data={ this.props.graphData }
                    height={ 400 }
                    width={ 600 }
                    axisY={{
                        interval: 1
                    }}
                    options={ {
                        maintainAspectRatio: false,
                        scales: {
                            y: {
                                min: 6,
                                max: 10,
                            },
                        },
                    } }
                />
            </div>
        );
    }
}

export default LineGraph