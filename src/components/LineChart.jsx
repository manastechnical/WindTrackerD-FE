// components/LineChart.js
import React, { useEffect, useState } from "react";
import { Data } from '../utils/Data';
import Chart from 'chart.js/auto'; // Makes all the features of Chart.js available to us.
import { Line } from "react-chartjs-2"; // React wrapper for Chart.js 2.0 and 3.0 which let us use Chart.js elements as React components.


const LineChart = ({mode}) => {
    if (mode === "dark") {
        Chart.defaults.color = '#fff';
    }else{
        Chart.defaults.color = '#000';
    }
    const [date, setDate] = useState("2021-03-19");
    const filterData = Data.filter(data=>data.date.includes(date));

    const charData = {
        labels: filterData.map(data=>data.date),  //x-axis
        datasets: [
            {
                label: "P1",
                data: filterData.map((data) => data.p1),
                backgroundColor: "#AFEEEE",
                borderColor: mode === "dark" ? "white" : "grey",
                borderWidth: 2,
                tension: 0.4,
            },
            {
                label: "P2.5",
                data: filterData.map((data) => data.p25),
                backgroundColor: "#ca5cdd",
                borderColor: mode === "dark" ? "white" : "grey",
                borderWidth: 2,
                tension: 0.4,
                
            },
            {
                label: "P10",
                data: filterData.map((data) => data.p10),
                backgroundColor: "#6699cc",
                borderColor: mode === "dark" ? "white" : "grey",
                borderWidth: 2,
                tension: 0.4,
                
            },
        ]
    };

    return (
            <div className="lg:w-[90%] h-full m-4 bg-white/30 rounded-lg transition-all duration-300 ease-in-out shadow-xl hover:shadow-blue-600">
                <Line
                    data={charData}
                    options={{
                        plugins: {
                            tooltip: {
                                callbacks: {
                                    afterBody: function (tooltipItem) {
                                        return `Wind Speed: ${filterData[tooltipItem[0].dataIndex].ws}Km/Hr \nWind Direction: ${filterData[tooltipItem[0].dataIndex].d}`
                                    }
                                }
                            },
                            title: {
                                display: true,
                                text: "Comparison between PM1, PM2.5 & PM10 in air"
                            },
                            legend: {
                                position: 'top',
                                display: true
                            }
                        },
                        scales: {
                            y: {
                                title: {
                                    display: true,
                                    text: 'Amount of Particulate Matter'
                                }
                            },
                            x: {
                                title: {
                                    display: true,
                                    text: 'Data and Time',
                                }
                            }
                        }
                    }}
                />
                <div className="text-center py-4">
                    <input className="md:text-xl border-solid border-gray-600 border-2 rounded-lg bg-inherit" type="date" onChange={(e)=>setDate(e.target.value)} id="date" value={date} />
                </div>
            </div>
    );
}
export default LineChart;