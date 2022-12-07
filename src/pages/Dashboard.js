import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, ArcElement, Tooltip, Legend, PointElement, LineElement } from 'chart.js';
import { Pie, Bar, Line, Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title, PointElement, LineElement);

const Dashboard = () => {

    const [data, setData] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            const result = await axios(
                `http://localhost:3333/readProduct`
            );
            setData(result.data.products);
        };
        fetchData();
    }, [])

    function numberWithCommas(num) {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }

    const total = data.reduce((sum, item) => {
        return sum + item.Stockint;
    }, 0);

    const totalstring = numberWithCommas(total)

    const totalSeed_RDCSD = [];
    data.reduce(function (res, value) {
        if (!res[value.Seed_RDCSD]) {
            res[value.Seed_RDCSD] = {
                Seed_RDCSD: value.Seed_RDCSD,
                TotalStockint: 0,
                กข15: 0,
                กข41: 0,
                ขาวดอกมะลิ105: 0,
                ปทุมธานี1: 0,
                กข79: 0,
                กข31: 0,
                พิษณุโลก2: 0,
                สันป่าตอง1: 0,
                กข61: 0,
                กข6: 0,
                กข22: 0,
                ชัยนาท1: 0,
                เฉี้ยงพัทลุง: 0,
                เล็บนกปัตตานี: 0,
                สังข์หยดพัทลุง: 0,
            };
            totalSeed_RDCSD.push(res[value.Seed_RDCSD])
        }
        res[value.Seed_RDCSD].TotalStockint += value.Stockint;
        res[value.Seed_RDCSD].TotalStockstr = numberWithCommas(res[value.Seed_RDCSD].TotalStockint);
        return res;
    }, {});

    const totalSeed_Varity = [];
    data.reduce(function (res, value) {
        if (!res[value.Seed_Varity]) {
            res[value.Seed_Varity] = { Seed_Varity: value.Seed_Varity, TotalStockint: 0 };
            totalSeed_Varity.push(res[value.Seed_Varity])
        }
        res[value.Seed_Varity].TotalStockint += value.Stockint;
        return res;
    }, {});

    const sortSeed_Varity = totalSeed_Varity.sort((a,b)=> {return b.TotalStockint - a.TotalStockint})

    const mostSeedStock = Math.max.apply(Math, totalSeed_Varity.map((item) => { return item.TotalStockint; }))
    const minSeedStock = Math.min.apply(Math, totalSeed_Varity.map((item) => { return item.TotalStockint; }))
    const mostSeed = totalSeed_Varity.find(({ TotalStockint }) => TotalStockint === mostSeedStock);
    const minSeed = totalSeed_Varity.find(({ TotalStockint }) => TotalStockint === minSeedStock);

    const totalSeed_Season = [];
    data.reduce(function (res, value) {
        if (!res[value.Seed_Season]) {
            res[value.Seed_Season] = { Seed_Season: value.Seed_Season, TotalStockint: 0 };
            totalSeed_Season.push(res[value.Seed_Season])
        }
        res[value.Seed_Season].TotalStockint += value.Stockint;
        return res;
    }, {});

    const labelArrSeed_RDCSD = [];
    const dataArrSeed_RDCSD = [];
    for (const dataobj of totalSeed_RDCSD) {
        labelArrSeed_RDCSD.push(dataobj.Seed_RDCSD)
        dataArrSeed_RDCSD.push(dataobj.TotalStockint)
    }
    const labelArrSeed_Varity = [];
    const dataArrSeed_Varity = [];
    for (const dataobj of sortSeed_Varity) {
        labelArrSeed_Varity.push(dataobj.Seed_Varity)
        dataArrSeed_Varity.push(dataobj.TotalStockint)
    }


    const Piedata = {
        labels: labelArrSeed_Varity,
        datasets: [
            {
                label: 'ปริมาณเมล็ดพันธุ์ข้าว',
                data: dataArrSeed_Varity,
                backgroundColor: [
                    '#003f5c',
                    '#2f4b7c',
                    '#665191',
                    '#a05195',
                    '#d45087',
                    '#f95d6a',
                    '#ff7c43',
                    '#ffa600',
                ],
                borderWidth: 1,
            },
        ],
    }

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
        },
    }

    const Verticalbardata = {
        labels: labelArrSeed_RDCSD,
        datasets: [
            {
                label: "จำนวนเมล็ดพันธุ์",
                data: dataArrSeed_RDCSD,
                backgroundColor: '#003f5c',
            }
        ]
    };

    const Linedata = {
        labels: labelArrSeed_RDCSD,
        datasets: [
            {
                label: 'จำนวนเมล็ดพันธุ์',
                data: dataArrSeed_RDCSD,
                borderColor: '#003f5c',
                backgroundColor: '#003f5c',
            },
        ],
    }

    const Doughnutdata = {
        labels: ["ปีที่1", "ปีที่2"],
        datasets: [
            {
                label: 'จำนวนเมล็ดพันธุ์',
                data: totalSeed_Season.map(item => item.TotalStockint),
                backgroundColor: [
                    '#003f5c',
                    '#d45087',
                ],
                borderColor: [
                    '#003f5c',
                    '#d45087',
                ],
                borderWidth: 1,
            },
        ],
    };

    return (
        <main className='bg-gray-100'>
            <div className='mx-auto p-5 container'>
                <div className='flex gap-4'>
                    <div className='text-center border-2 border-white-600 rounded-md p-2 max-w-sm bg-white drop-shadow-md'>
                        <h1 className='p-2 text-xl'>ปริมาณเมล็ดพันธุ์ข้าวพร้อมจำหน่าย(กก.)</h1>
                        <h2 className='p-2 text-xl'>{totalstring}</h2>
                    </div>
                    <div className='text-center border-2 border-white-600 rounded-md p-2 max-w-sm bg-white drop-shadow-md'>
                        <h1 className='p-2 text-xl'>พันธุ์ข้าวที่มากที่สุด : {mostSeed ? mostSeed.Seed_Varity:null}</h1>
                        <h1 className='p-2 text-xl'>{mostSeed ? numberWithCommas(mostSeed.TotalStockint):null}</h1>
                    </div>
                    <div className='text-center border-2 border-white-600 rounded-md p-2 max-w-sm bg-white drop-shadow-md'>
                        <h1 className='p-2 text-xl'>พันธุ์ข้าวที่น้อยที่สุด : {minSeed ? minSeed.Seed_Varity:null}</h1>
                        <h1 className='p-2 text-xl'>{minSeed ? numberWithCommas(minSeed.TotalStockint):null}</h1>
                    </div>
                </div>
                <div className='grid grid-cols-3 my-2 gap-4'>
                    <div className='col-span-2 border-2 border-white-600 rounded-md p-2 bg-white drop-shadow-md min-w-full'>
                        <h1 className='text-xl text-center'>ปริมาณเมล็ดพันธุ์ข้าวในแต่ละจังหวัด</h1>
                        <Bar options={options} data={Verticalbardata} />
                    </div>
                    <div className='border-2 border-white-600 rounded-md p-2 max-w-md bg-white drop-shadow-md'>
                        <h1 className='text-xl text-center'>พันธุ์ข้าว</h1>
                        <Pie data={Piedata} />
                    </div>
                </div>
                <div className='grid grid-cols-3 my-2 gap-4'>
                    <div className='col-span-2 border-2 border-white-600 rounded-md p-2 bg-white drop-shadow-md min-w-full'>
                        <h1 className='text-xl text-center'>ปริมาณเมล็ดพันธุ์ข้าวในแต่ละจังหวัด</h1>
                        <Line options={options} data={Linedata} />
                    </div>
                    <div className='border-2 border-white-600 rounded-md p-2 max-w-md bg-white drop-shadow-md'>
                        <h1 className='text-xl text-center'>จำนวนเมล็ดพันธุ์ในแต่ละฤดูเก็บเกี่ยว</h1>
                        <Doughnut data={Doughnutdata} />
                    </div>
                </div>
                <table className='table-auto mx-auto border-collapse border border-slate-400 m-2 px-2 bg-white rounded-md'>
                    <tbody>
                        <tr className='text-center '>
                            <td className='border p-2 '>พันธุ์ข้าว</td>
                            <td className='border p-2 '>ศูนย์เมล็ดพันธุ์ข้าว</td>
                            <td className='border p-2 '>ปริมาณเมล็ดพันธุ์ข้าว</td>
                            <td className='border p-2 '>ปี</td>
                            <td className='border p-2 '>ฤดูเก็บเกี่ยว</td>
                            <td className='border p-2 '>ปีที่เก็บเกี่ยว</td>
                        </tr>
                        {data.map((item) =>
                            <tr key={item.id}>
                                <td className='border  p-2 text-center'>{item.Seed_Varity}</td>
                                <td className='border  p-2 text-center'>{item.Seed_RDCSD}</td>
                                <td className='border  p-2 text-center'>{item.Seed_Stock2Sale}</td>
                                <td className='border  p-2 text-center'>{item.Seed_Year}</td>
                                <td className='border  p-2 text-center'>{item.Seed_Season}</td>
                                <td className='border  p-2 text-center'>{item.Seed_Crop_Year}</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </main>
    )
}

export default Dashboard
