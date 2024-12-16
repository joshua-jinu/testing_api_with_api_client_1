// API: Retrieve Students Above Threshold
// ---------------------------------------
// Task:
// Implement an API to fetch students whose total marks exceed a given threshold.
//
// Endpoint:
// POST /students/above-threshold
//
// Request Body:
// {
//   "threshold": <number>
// }
//
// Response:
// Success: List of students with their names and total marks who meet the criteria.
// Example:
// {
//   "count": 2,
//   "students": [
//     { "name": "Alice Johnson", "total": 433 },
//     { "name": "Bob Smith", "total": 410 }
//   ]
// }
//
// No Matches:
// {
//   "count": 0,
//   "students": []
// }
//
// Purpose:
// Help teachers retrieve and analyze student performance efficiently.


const express = require('express');
const { resolve } = require('path');
const fs = require('fs');

const app = express();
const port = 3010;
const jsondata = fs.readFileSync('data.json');
const data = JSON.parse(jsondata);

app.use(express.static('static'));
app.use(express.json());

app.get('/', (req, res) => {
  res.sendFile(resolve(__dirname, 'pages/index.html'));
});

app.post('/students/above-threshold', sendFilteredData);

async function sendFilteredData(req, res){
    const threshold = req.body.threshold;
    
    let filtered = data.filter((ele)=>{
      return ele.total>threshold;
    }).map((ele)=>{
      return {
        name: ele.name,
        total: ele.total
      }
    })
    const count = filtered.length;
    res.status(200).send({count: count, students: filtered})
}

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});


