import React, {useState} from 'react';
import Card from './card.js';
import Chart from './chart.js';




const Home = () => {

    const [cardTitle, setCardTitle] = useState("");
    const [chartData, setChartData] = useState([]);

    // function will run when Card component was clicked
    const cardClicked = (cardTitle, graphData) => {
        setCardTitle(cardTitle);
        // console.log(graphData, " for ", cardTitle);
        setChartData(graphData); // will also trigger Chart component to re-render
    }

        return (
            <div className="container">
                <div className="row mt-5"></div>
                <div className="row mt-5">
                    <div className="col">
                        <Card id="difficulty" selected={cardTitle === "Difficulty"} title="Difficulty" cardClicked={cardClicked}/>
                    </div>
                    <div className="col">
                        <Card id="gasMean" selected={cardTitle === "Gas Fee"} title="Gas Fee" cardClicked={cardClicked}/>
                    </div>
                    <div className="col">
                        <Card id="volumeMean" selected={cardTitle === "Miner Fee"} title="Miner Fee" cardClicked={cardClicked}/>
                    </div>

                </div>
                <div className="row">
                    <Chart title={cardTitle} chartData={chartData} />
                </div>

            </div>
      );
}
export default Home;
