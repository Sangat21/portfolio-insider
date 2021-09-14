const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/difficulty', async (req, res) => {
    console.log("Calling API /difficulty");
    axios.get("https://api.glassnode.com/v1/metrics/mining/difficulty_latest?a=ETH&i=24h", {
        headers: { "X-Api-Key": "1xvTphuHuilLXB1xVBZEolFrU6M" }
    }).then(data => {
        let sevenDayAvg = getSevenDayAvg(data.data);
        let perChange = ((data.data.slice(-1)[0].v)-(sevenDayAvg))/(sevenDayAvg);
        res.status(200).send({"data": data.data, "sevenDayAvg": sevenDayAvg, "perChange": perChange});
    }).catch(err => {
        console.log("ERROR: ", err);
        res.error(err);
    });

})

app.get('/gasMean', async (req, res) => {
    console.log("Calling API /gasMean");
    axios.get("https://api.glassnode.com/v1/metrics/fees/gas_price_mean?a=ETH&i=24h", {
        headers: { "X-Api-Key": "1xvTphuHuilLXB1xVBZEolFrU6M" }
    }).then(data => {
        let sevenDayAvg = getSevenDayAvg(data.data);
        let perChange = ((data.data.slice(-1)[0].v)-(sevenDayAvg))/(sevenDayAvg);
        res.status(200).send({"data": data.data, "sevenDayAvg": sevenDayAvg, "perChange": perChange});
    }).catch(err => {
        console.log("ERROR: ", err);
        res.error(err);
    });

})

app.get('/volumeMean', async (req, res) => {
    console.log("Calling API /volumeMean");
    axios.get("https://api.glassnode.com/v1/metrics/fees/volume_mean?a=ETH&i=24h", {
        headers: { "X-Api-Key": "1xvTphuHuilLXB1xVBZEolFrU6M" }
    }).then(data => {
        let sevenDayAvg = getSevenDayAvg(data.data);
        let perChange = ((data.data.slice(-1)[0].v)-(sevenDayAvg))/(sevenDayAvg);
        res.status(200).send({"data": data.data, "sevenDayAvg": sevenDayAvg, "perChange": perChange});
    }).catch(err => {
        console.log("ERROR: ", err);
        res.error(err);
    });
})

app.listen(port, () => {
    console.log("Server is running on port: ", port);
})

// function calculates and returns seven-day avg value
function getSevenDayAvg (data) {
    let sevenDayData = data.slice(-7);
    let total = 0;
    sevenDayData.forEach(e => {
        total += e.v;
    });
    // console.log(sevenDayData, total, total/7);
    return (total/7);
}
