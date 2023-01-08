// components/BarChart.js
import React, { useEffect, useState } from "react";
import { Data } from '../utils/Data';
import { axiosInstance } from "../config"; 
import Chart from 'chart.js/auto'; // Makes all the features of Chart.js available to us.
import { Bar } from "react-chartjs-2"; // React wrapper for Chart.js 2.0 and 3.0 which let us use Chart.js elements as React components.

const BarChart = (props, { mode }) => {
    const [info, setInfo] = useState([]);

    // tried connecting backend to frontend
    useEffect(() => {
        const getInfo = async () => {
            try {
                const res = await axiosInstance.get('/get');
                console.log(res.data);
                setInfo(res.data);
            } catch (err) {
                console.log(err);
            }
        }

        getInfo();
    }, []);


    // console.log(info);

    const [date, setDate] = useState("2021-03-19"); //setting default date to display
    const filterData = Data.filter(data => data.date.includes(date)); //filtering data as per date selected
    let sum = 0, sum1 = 0, sum2 = 0, sum3 = 0;
    //sending data to dashboard component
    useEffect(() => {
        filterData.map(data => (sum += data.ws));
        let avg = sum / filterData.length;
        props.windS(avg.toFixed(2));
        props.windD(date);
        filterData.map(data => sum1 += data.p1);
        let avg1 = sum1 / filterData.length;
        filterData.map(data => sum2 += data.p25);
        let avg2 = sum2 / filterData.length;
        filterData.map(data => sum3 += data.p10);
        let avg3 = sum3 / filterData.length;
        props.windP1(avg1.toFixed(2));
        props.windP2(avg2.toFixed(2));
        props.windP10(avg3.toFixed(2));
        // console.log(sum);
    }, [date])

    //bar attributes
    const charData = {
        labels: filterData.map(data => data.date),  //x-axis
        datasets: [
            {
                label: "Wind Speed",
                data: filterData.map((data) => data.ws),
                backgroundColor: "#AFEEEE",
                borderColor: mode === "dark" ? "white" : "grey",
                borderWidth: 2,
                tension: 0.4,
            }
        ]
    };

    return (
        <div className="lg:w-[90%] h-full m-4 bg-white/30 rounded-lg transition-all duration-300 ease-in-out shadow-xl hover:shadow-blue-600">
            <Bar
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
                            text: "Wind Speed throughtout the day"
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
                                text: 'Date and Time',
                            }
                        },
                    }
                }}
            />
            <div className="text-center py-4">
                <input className="md:text-xl border-solid border-gray-600 border-2 rounded-lg bg-inherit" type="date" onChange={(e) => setDate(e.target.value)} id="date" value={date} />
            </div>
        </div>
    );
}
export default BarChart;