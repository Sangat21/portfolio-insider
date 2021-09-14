import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';



const Chart = (props) => {

    var hasData = false; // to check if chart has data or not
    // console.log(props.chartData, " received from chart");

    if(props.chartData.length){
        hasData = true;
    }else hasData = false;

    // function will convert milliseconds to local date string
    const convertMillisToDate = (millis) => {
        // let millis = props.chartData[text].t;
        return new Date(millis * 1000).toLocaleDateString();
    }

    // options for HighCharts
    const options = {
        chart: {
            type: 'line',
            zoomType: 'x',
        },
        title: {
            text: hasData ? props.title + " Graph" : "Click Above to See Graph"
        },
        yAxis: {
            title: {
                text: hasData ? props.title : ""
            }
        },
        xAxis: {
            title: {
                text: hasData ? "Date" : ""
            },
            labels: {
                formatter: function() {
                    return convertMillisToDate(this.value);
                }
            }
        },
        legend: {
            enabled: false
        },
        series: [{
            data: hasData ? props.chartData.map(i => [i.t, i.v]): [],
        }],
        colors: ['#0000FF'],
        credits: {
            enabled: false
        },
        tooltip: {
            formatter() {
                return `X: ${convertMillisToDate(this.x)}, Y: ${this.y}`;
            }
        }

    }

        return (
            <div>
                <HighchartsReact
                    highcharts={Highcharts}
                    options={options}
                    {...props}
                />
            </div>
      );
}

export default Chart;
