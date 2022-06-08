import React, { useEffect, useRef, useState } from 'react';
import { Chart} from 'chart.js';
import {Typography} from '@mui/material';

function BudgetPieChart(props){
    var needsWants = {needs: 0 , wants: 0};
    const [chartData, setChartData] = useState(null);
    const chartContainer = useRef(null);
    const [chartInstance, setChartInstance] = useState(null);

  
    useEffect(()=>{fetch(`api/history?${props.user_id}`)
    .then(res=>{return res.json()})
    .then(data =>{
      data.map(cur =>{
        if(cur.category == 'Needs'){
          needsWants['needs'] += cur.price;
        }else{
          needsWants['wants'] += cur.price;
        }
        setChartData(Object.values(needsWants));
      });
    })
    }, []);


    const chartConfig = {
        type: "doughnut",
        width: "30%",
        data: {
          labels: ['Needs', 'Wants'],
          datasets: [
            {
              data: [12, 16],
              backgroundColor: [
                "rgba(255, 99, 132, 0.2)",
                "rgba(54, 162, 235, 0.2)",
                "rgba(255, 206, 86, 0.2)",
                "rgba(75, 192, 192, 0.2)",
                "rgba(153, 102, 255, 0.2)",
                "rgba(255, 159, 64, 0.2)"
              ],
              borderColor: [
                "rgba(255, 99, 132, 1)",
                "rgba(54, 162, 235, 1)",
                "rgba(255, 206, 86, 1)",
                "rgba(75, 192, 192, 1)",
                "rgba(153, 102, 255, 1)",
                "rgba(255, 159, 64, 1)"
              ],
              borderWidth: 1
            }
          ]
        },
        options: {
          responsive: true,
          legend: {
              position: 'left',
              labels: {
                  boxWidth: 20,
                  padding: 20
              }
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
        var prevData = chartInstance.data.datasets[datasetIndex].data;
        for(var i=0; i<prevData.length; i++){
          if(prevData[i] != fetchedData[i]){
            chartInstance.data.datasets[datasetIndex].data = fetchedData;
            chartInstance.update();
          }
        }       
      }

      if(chartData != null){
        updateChart(0, chartData);
      }
        
      
      return (
          <div style={{position:'relative', height:'40vh', width: '80vh'}}>
            <Typography variant="h6" gutterBottom component="div" >
                Monthly Spending
            </Typography>
            <canvas ref={chartContainer} />
          </div>
        );
  }




export default BudgetPieChart;