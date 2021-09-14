import React, {useState, useEffect} from 'react';
import axios from 'axios';
import $ from 'jquery';
import ProgressBar from 'react-bootstrap/ProgressBar';

const Card = (props) => {

    const [graphData, setGraphData] = useState([]);
    const [progress, setProgress] = useState(0);
    const [latestVal, setLatestVal] = useState(0);
    const [sevenDayAvgVal, setSevenDayAvgVal] = useState(0);
    const [perChange, setPerChange] = useState(0);

    const getData = async (title) => {
        let endpoint = props.id;
        // console.log(title);
        // ** sending request to backend
        const resp = await axios.get('http://localhost:5000/' + endpoint);
        let lastVal = resp.data.data.slice(-1)[0].v;
        setLatestVal(lastVal);
        setSevenDayAvgVal(resp.data.sevenDayAvg);
        console.log(resp.data.perChange, " perChange")
        setPerChange(resp.data.perChange);
        setProgress(parseInt(lastVal / resp.data.sevenDayAvg*100));
        console.log(title, "DONE!");
        // console.log("RESPONSE:  **", resp);
        // set response to graphData
        setGraphData(resp.data.data);
        // console.log(graphData)
    }

    // will only run exactly once
    useEffect(async () => {
        // console.log("executing");
        await getData(props.title);
        // jquery stmts to assign latest and 7-day avg values
        // $("#latest_"+props.id).text("Latest: "+ latestVal);
        // $("#sevenDay_"+props.id).text("7-Day Avg: "+ sevenDayAvgVal);

    }, [])

        return (
        <a  onClick={() => props.cardClicked(props.title, graphData)} >
            <div className={"card border mb-3"} styles="width: 20px;">
              <div className="card-body text-primary">
                <h5 className="card-title">{props.title}</h5>
                <p  className="card-text">Latest: {latestVal}</p>
                <p  className="card-text">7-Day Avg: {sevenDayAvgVal}</p>
                <span className="oi oi-caret-top"></span>
                <span className={perChange < 0 ? "text-danger" : "text-success"}>{perChange.toFixed(2)}%</span>
                <ProgressBar variant="success" now={progress} />
              </div>
            </div>
        </a>
      );
}

export default Card;
