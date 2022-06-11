import React from 'react';
import { Chart} from 'chart.js';
import {Typography} from '@mui/material';


function BudgetPieChart(props){
    //Store the total sum amount of both needs and wants categories
    var needsWants = {needs: 0 , wants: 0};

    //Holds the data to be displayed within the chart
    const [chartData, setChartData] = React.useState(null);

    //Holds the current chart instance
    const chartContainer = React.useRef(null);
    const [chartInstance, setChartInstance] = React.useState(null);


    // const [balance, setBalance] = React.useState(null);

    // React.useEffect(()=>{fetch(`api/budget-allocation?${props.user_id}`)
    // .then(res=>{return res.json()})
    // .then(data=>{setBalance(data)})
    // }, [])

    //Fetch the history table  
    React.useEffect(()=>{
      
      const fetchHistory = async()=>{
        await fetch('api/get-history', {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `Token ${props.token}`
          },
        })
        .then(res=>{return res.json()})
        .then(data =>{
          data.map(cur =>{
            //Get the current month and the date of the current data
            const monthNow = new Date(cur.date_bought).getMonth(); 
            const monthData = new Date().getMonth();
            if(monthData == monthNow){
              //Adds the data price into needsWants
              if(cur.category == 'Needs'){
                needsWants['needs'] += cur.price;
              }else{
                needsWants['wants'] += cur.price;
              }
              //Set the chart data based on the needsWants values
              setChartData(Object.values(needsWants));
    
            }
          });
        })
      }

      fetchHistory();

    }, []);

    //Chart configs
    const chartConfig = {
        type: "doughnut",
        width: "30%",
        data: {
          labels: ['Needs', 'Wants'],
          datasets: [
            {
              data: [0, 0],
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
  
      //Set the chart instance based on the given data
      React.useEffect(() => {
          if (chartContainer && chartContainer.current) {
          const newChartInstance = new Chart(chartContainer.current, chartConfig);
          setChartInstance(newChartInstance);
          }
      }, [chartContainer]);

      //Function to update the chart values
      function updateChart(datasetIndex, fetchedData){
        var prevData = chartInstance.data.datasets[datasetIndex].data;
        for(var i=0; i<prevData.length; i++){
          //if any of the data within the new data is different, update the chart instance
          if(prevData[i] != fetchedData[i]){
            chartInstance.data.datasets[datasetIndex].data = fetchedData;
            chartInstance.update();
          }
        }       
      }

      if(chartData != null || props.updateData == true){
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