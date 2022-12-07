import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

const AddProduct = () => {

    const params = useParams()
    const productid = params.id

    const [seed, setSeed] = useState({})

    useEffect(() => {
        const fetchData = async () => {
            const result = await axios(
                `http://localhost:3333/readProduct/${productid}`
            );
            setSeed(result.data[0]);
        };
        fetchData();
    }, [])


    const handlechange = (e) => {
        setSeed((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const editProduct = async () => {
        const res = await axios.put(`http://localhost:3333/updateProduct`, {
            id: productid,
            year: seed.Seed_Year,
            yearWeek: seed.Seeds_YearWeek,
            varity: seed.Seed_Varity,
            RDCSD: seed.Seed_RDCSD,
            stock2Sale: seed.Stockint,
            season: seed.Seed_Season,
            cropYear: seed.Seed_Crop_Year
        })
        alert(res.data.message)
    }

    const inputcss = 'p-1 px-2 rounded-md shadow-md my-2'

    return (
        <div className='container mx-auto'>
            <h1 className='text-2xl my-5'>Edit Product ID:{productid}</h1>
            <div className='flex flex-col max-w-md'>
                <label>ปี</label>
                <input type='text' name='Seed_Year' onChange={handlechange} className={inputcss} value={seed.Seed_Year}></input>
                <label>สัปดาห์ของปี</label>
                <input type='text' name='Seeds_YearWeek' onChange={handlechange} className={inputcss} value={seed.Seeds_YearWeek}></input>
                <label>พันธุ์ข้าว</label>
                <input type='text' name='Seed_Varity' onChange={handlechange} className={inputcss} value={seed.Seed_Varity}></input>
                <label>ศูนย์เมล็ดพันธุ์ข้าว</label>
                <input type='text' name='Seed_RDCSD' onChange={handlechange} className={inputcss} value={seed.Seed_RDCSD}></input>
                <label>ปริมาณเมล็ดพันธุ์ข้าว</label>
                <input type='number' name='Stockint' onChange={handlechange} min={0} className={inputcss} value={seed.Stockint}></input>
                <label>ฤดูเก็บเกี่ยว</label>
                <input type='text' name='Seed_Season' onChange={handlechange} className={inputcss} value={seed.Seed_Season}></input>
                <label>ปีที่เก็บเกี่ยว</label>
                <input type='text' name='Seed_Crop_Year' onChange={handlechange} className={inputcss} value={seed.Seed_Crop_Year}></input>
                <button className='bg-[#003f5c] p-2 px-5 rounded-md text-white hover:bg-opacity-80 shadow-md' onClick={editProduct} >Edit</button>
            </div>
        </div>
    )
}

export default AddProduct