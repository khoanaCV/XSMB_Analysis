import React, { useState } from 'react';
import { Container, Button } from 'react-bootstrap';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

const Gan = () => {
    ChartJS.register(
        CategoryScale,
        LinearScale,
        BarElement,
        Title,
        Tooltip,
        Legend
    );
    const [choosenNumber, setChoosenNumber] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [min, setMin] = useState('');
    const [countSparseArray, setCountSparseArray] = useState([]);

    // const handleInputChange = (event) => {
    //     event.preventDefault();
    //     const { name, value } = event.target;
    //     if (name === "choosenNumber") {
    //         setChoosenNumber(value);
    //     } else if (name === "startDate") {
    //         setStartDate(value);
    //     } else if (name === "endDate") {
    //         setEndDate(value);
    //     } else if (name === "min") {
    //         setMin(value);
    //     }
    // };

    // const handleChooseNumber = (event) => {
    //     event.preventDefault();
    //     const value = event.target.value
    //     setChoosenNumber(value)
    // }

    // const handleStartDate = (event) => {
    //     event.preventDefault();
    //     const value = event.target.value
    //     setStartDate(value)
    // }

    // const handleEndDate = (event) => {
    //     event.preventDefault();
    //     const value = event.target.value
    //     setEndDate(value)
    // }

    // const handleMin = (event) => {
    //     event.preventDefault();
    //     const value = event.target.value
    //     setMin(value)
    // }
    const handleSubmit = (event) => {
        event.preventDefault();
        const form = event.target;
        const choosenNumberValue = form.elements.choosenNumber.value;
        const startDateValue = form.elements.startDate.value;
        const endDateValue = form.elements.endDate.value;
        const minValue = form.elements.min.value;
        setChoosenNumber(choosenNumberValue);
        setStartDate(startDateValue);
        setEndDate(endDateValue);
        setMin(minValue);
        console.log(form.elements.min.value, minValue, typeof min);
        // Kiểm tra điều kiện trước khi gửi yêu cầu POST
        // if (choosenNumber !== "" && startDate !== "" && endDate !== "" && min !== "") {
        // Gửi yêu cầu POST đến backend với các biến đã được cập nhật
        axios
            .post('http://localhost:9999/sparses/gan_time/findOne', {
                choosenNumber: choosenNumberValue,
                startDate: startDateValue,
                endDate: endDateValue,
                min: minValue
            })
            .then((res) => setCountSparseArray(res.data?.data))
            .catch((err) => console.log(err));
        // }
    };
    console.log(countSparseArray);

    const get_day_of_time = (d1, d2) => {
        let ms1 = d1.getTime();
        let ms2 = d2.getTime();
        return Math.ceil((ms2 - ms1) / (24 * 60 * 60 * 1000));
    };

    const ganArray = []
    countSparseArray?.map((item, key) => {
        let birthday = new Date(item.lastDate);

        let today = new Date(item.newDate);
        const time = get_day_of_time(birthday, today)
        const formatLastDate = item.lastDate.split('T')[0]; // Lấy phần trước "T"
        const formatNewDate = item.newDate.split('T')[0]; // Lấy phần trước "T"
        const gan = { numId: item.numId, lastDate: formatLastDate, newDate: formatNewDate, time: time }
        if (gan.time >= min) {
            ganArray.push(gan)
        }
    })
    console.log(ganArray);
    const options = {
        indexAxis: 'y',
        elements: {
            bar: {
                borderWidth: 2,
            },
        },
        responsive: true,
        plugins: {
            legend: {
                position: 'right',
            },
            title: {
                display: true,
                text: 'Liver cycle statistics',
            },
            tooltip: {
                callbacks: {
                    label: (context) => {
                        const data = context.dataset.data[context.dataIndex];
                        const time = ganArray[context.dataIndex].time;
                        const newDate = ganArray[context.dataIndex].newDate;
                        return `Time: ${time} days, New Date: ${newDate}`;
                    },
                },
            },
        },
    };
    const labels = ganArray?.map((item) => item.lastDate);
    const data = {
        labels,
        datasets: [
            {
                label: 'Time (day)',
                data: ganArray?.map((item) => item.time),
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
        ],
    };
    const HorizontalBarChart = () => {
        if (ganArray.length != 0) {
            return (
                <div>
                    <Bar data={data} options={options} />
                </div>
            );
        }
        return <></>

    };
    return (
        <section className="gan-wrapper my-8">
            <div className='text-xl' >Liver cycle statistics</div>
            <div className='mb-4'>This is a tool to help you calculate non-appearance periods (liver intervals).
                of a pair of numbers. To use, enter the pair of numbers you want to check and select the time period
                (default is the most recent 1 year). The value <b>Min</b> is the lowest range you need to calculate</div>

            <form className="flex justify-center" onSubmit={handleSubmit}>
                Cặp số:<input className="border-[1px] border-black ml-1 mr-4 rounded-sm" name="choosenNumber"
                    defaultValue={choosenNumber}
                    size="2"
                />
                Từ:<input className="border-[1px] border-black ml-1 mr-4 rounded-sm" type="date" name="startDate"
                    defaultValue={startDate}
                    size="10"
                />
                Đến:<input className="border-[1px] border-black	ml-1 mr-4 rounded-sm" type="date" name="endDate"
                    defaultValue={endDate}
                    size="10"
                />
                Min: <input className="border-[1px] border-black ml-1 mr-4 rounded-sm" type="text" name="min"
                    defaultValue={min}
                    size="2"
                    title="Số ngày gan nhỏ nhất"
                />
                <Button size='sm' type="submit">Statistical</Button>
            </form>
            <div>
                <HorizontalBarChart />
            </div>

        </section>
    );
};

export default Gan;