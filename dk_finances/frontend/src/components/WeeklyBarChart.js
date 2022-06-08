import React, { useEffect, useRef, useState } from 'react';
import { Chart} from 'chart.js';
import {Typography} from '@mui/material';


function WeeklyBarChart(props){
  const week = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
  const weekChart = {"Sunday": 0,"Monday": 0,"Tuesday": 0,"Wednesday": 0,"Thursday": 0,"Friday": 0,"Saturday": 0};
  const chartContainer = useRef(null);
  const [chartInstance, setChartInstance] = useState(null);
  const [chartData, setChartData] = useState(null);


  useEffect(()=>{fetch(`api/history?${props.user_id}`)
    .then(res=>{return res.json()})
    .then(data =>{
      const today = new Date();
      const getDate = today.getDate();
      const first = getDate - today.getDay();
      const last = first + 7;

      const firstDay = new Date(today.setDate(first));
      const lastDay = new Date(today.setDate(last));

      firstDay.setHours(0, 0, 0, 0);
      lastDay.setHours(0, 0, 0, 0)

      data.map(cur =>{
        const d = new Date(cur.date_bought);
        d.setHours(0, 0, 0, 0);
        if(firstDay.getTime()>=d.getTime()<lastDay.getTime()){
          weekChart[week[d.getDay()]] += cur.price;
          setChartData(Object.values(weekChart))}
      });
    })
    }, []);

  const chartConfig = {
      type: "bar",
      width: "50%",
      data: {
        labels: week,
        datasets: [
          {
            data: [0, 0, 0, 0, 0, 0, 0],
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
              "rgba(153, 102, 255, 0.2)",
              "rgba(255, 159, 64, 0.2)",
              "rgba(23, 27, 157, 0.2)",
              "rgba(69, 7, 12, 0.2)"
            ],
            borderColor: [
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
              "rgba(255, 159, 64, 1)",
              "rgba(23, 27, 157, 1)",
              "rgba(69, 7, 12, 1)"
            ],
            borderWidth: 1
          }
        ]
      },
      options: {
        legend: {
          display: false},
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true
              }
            }
          ]
        }
      }
      };

    

    useEffect(() => {
        if (chartContainer && chartContainer.current) {
        const newChartInstance = new Chart(chartContainer.current, chartConfig);
        setChartInstance(newChartInstance);
        }
    }, [chartContainer]);

    function updateChart(datasetIndex, fetchedData){
      chartInstance.data.datasets[datasetIndex].data = fetchedData;
      chartInstance.update();
      };
      
      
    if(chartData != null){
      updateChart(0, Object.values(chartData));
    }


    return (
        <div style={{position:'relative', height:'40vh', width: '80vh'}}>
          <Typography variant="h6" gutterBottom component="div" >
              Weekly Spending
          </Typography>
          <canvas ref={chartContainer} />
        </div>
      );
}

export default React.memo(WeeklyBarChart);