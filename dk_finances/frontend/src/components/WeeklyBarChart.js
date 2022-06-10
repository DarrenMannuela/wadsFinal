import React, { useEffect, useRef, useState } from 'react';
import { Chart} from 'chart.js';
import {Typography} from '@mui/material';


function WeeklyBarChart(props){
  //Used to display the days of the week based on the order given from .getDay()
  const week = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

  //Stores the amount spent on each day of the week 
  const weekChart = {"Sunday": 0,"Monday": 0,"Tuesday": 0,"Wednesday": 0,"Thursday": 0,"Friday": 0,"Saturday": 0};

  //Holds the data to be displayed within the chart
  const chartContainer = React.useRef(null);

  //Holds the current chart instance
  const [chartInstance, setChartInstance] = React.useState(null);
  const [chartData, setChartData] = React.useState(null);


  //Fetches data from the history table
  React.useEffect(()=>{fetch('api/history?', {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${props.token}`
    },
    })
    .then(res=>{return res.json()})
    .then(data =>{
      //Get today's date and day
      const today = new Date();
      const getDate = today.getDate();

      //Get the first date of the week and last date of the week+1
      const first = getDate - today.getDay();
      const last = first + 7;

      //Get the dates of the first day and last day
      const firstDay = new Date(today.setDate(first));
      const lastDay = new Date(today.setDate(last));

      //Set their hours to 0
      firstDay.setHours(0, 0, 0, 0);
      lastDay.setHours(0, 0, 0, 0)

      data.map(cur =>{
        //Get the date of the current data and set its hours to 0
        const d = new Date(cur.date_bought);
        d.setHours(0, 0, 0, 0);

        //Checks if the date is bteween the first date and the last day 
        if(firstDay.getTime()>=d.getTime()<lastDay.getTime()){
          weekChart[week[d.getDay()]] += cur.price;
          setChartData(Object.values(weekChart))}
      });
    })
    }, []);

  //Chart configurations
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

    

    //Set the chart instance based on the given data
    React.useEffect(() => {
        if (chartContainer && chartContainer.current) {
        const newChartInstance = new Chart(chartContainer.current, chartConfig);
        setChartInstance(newChartInstance);
        }
    }, [chartContainer]);

    //Function to update the chart values
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