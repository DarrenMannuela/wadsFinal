import React from 'react';
import { Chart} from 'chart.js';
import {Typography} from '@mui/material';



function MonthlyPieChart(props){

    //Stores the amount spent based on subcategory
    var amountBasedOnCategory = {"Food": 0, "Transportation": 0, "Travel": 0, 
    "Housing": 0, "Utility bills": 0, "Cellphone": 0, 
    "Groceries": 1200, "Clothing": 0, "Healthcare": 0,
    "Childcare": 0, "Pet Necessities": 0, "Pet Insurance": 0,
    "Subscriptions": 0, "Others": 0}

    //Holds the data to be displayed within the chart
    const [chartData, setChartData] = React.useState(null);

    //Holds the current chart instance
    const chartContainer = React.useRef(null);
    const [chartInstance, setChartInstance] = React.useState(null);
  
    //Fetches the history table 
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
          //Iterates through the fetched data and checks if the date bought is within the current month
          data.map(cur =>{
            const monthNow = new Date(cur.date_bought).getMonth(); 
            const monthData = new Date().getMonth();
            if(monthData == monthNow){
              //Adds the data values within amountBasedCategory based on their subcategory
              amountBasedOnCategory[cur.subcategory] += cur.price;
              setChartData(Object.values(amountBasedOnCategory))};
          })
        })
      }

      fetchHistory();


    }, []);


    //Configuration of the chart
    const chartConfig = {
      type: "doughnut",
      width: "30%",
      data: {
        labels: ["Food", "Transportation", "Travel", 
        "Housing", "Utilities", "Cellphone", 
        "Groceries", "Clothing", "Healthcare",
        "Childcare", "Pet Necessities", "Pet Insurance",
        "Subscriptions", "Others"],
        datasets: [
          {
            label: "# of Votes",
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
              "rgba(153, 102, 255, 0.2)",
              "rgba(255, 159, 64, 0.2)",
              "rgba(23, 27, 157, 0.2)",
              "rgba(69, 7, 12, 0.2)",
              "rgba(1, 2, 3, 0.2)",
              "rgba(21, 10, 1, 0.2)",
              "rgba(120, 40, 3, 0.2)",
              "rgba(23, 230, 30, 0.2)",
              "rgba(230, 30, 120, 0.2)",
              "rgba(240, 120, 255, 0.2)",
              "rgba(42, 78, 7, 0.2)"


            ],
            borderColor: [
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
              "rgba(255, 159, 64, 1)",
              "rgba(23, 27, 157, 1)",
              "rgba(69, 7, 12, 1)",
              "rgba(1, 2, 3, 1)",
              "rgba(21, 10, 1, 1)",
              "rgba(120, 40, 3, 1)",
              "rgba(23, 230, 30, 1)",
              "rgba(230, 30, 120, 1)",
              "rgba(240, 120, 255, 1)",
              "rgba(42, 78, 7, 1)"
            ],
            borderWidth: 1
          }
        ]
      },
      options: {
        responsive: true,
        legend: {
          display: false
      }}
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
      }};          

    if(chartData != null){
      updateChart(0, chartData);
    }

    return (
        <div style={{position:'relative', height:'30vh', width: '70vh'}}>
           <Typography variant="h6" gutterBottom component="div" >
                Monthly Spending
            </Typography>
          <canvas ref={chartContainer} />
        </div>
      );
}

export default MonthlyPieChart;