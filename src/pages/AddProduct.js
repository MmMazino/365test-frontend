import React, { useState } from 'react'
import axios from 'axios'

const AddProduct = () => {

    const [seed, setSeed] = useState({
        Seed_Year: '',
        Seeds_YearWeek: '',
        Seed_Varity: '',
        Seed_RDCSD: '',
        Seed_Stock2Sale: 0,
        Seed_Season: '',
        Seed_Crop_Year: '',
    })

    const handlechange = (e) => {
        setSeed((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }

    console.log(seed);

    const addProduct = async() => {
        const res =  await axios.post(`http://localhost:3333/createProduct`, {
            year: seed.Seed_Year,
            yearWeek: seed.Seeds_YearWeek,
            varity: seed.Seed_Varity,
            RDCSD: seed.Seed_RDCSD,
            stock2Sale: seed.Seed_Stock2Sale,
            season: seed.Seed_Season,
            cropYear: seed.Seed_Crop_Year
        })
        alert(res.data.message)
    }

    const inputcss = 'p-1 px-2 rounded-md shadow-md my-2'

    return (
        <div className='container mx-auto'>
            <h1 className='text-2xl my-5'>Add Product</h1>
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
                <input type='number' name='Seed_Stock2Sale' onChange={handlechange} min={0} className={inputcss} value={seed.Seed_Stock2Sale}></input>
                <label>ฤดูเก็บเกี่ยว</label>
                <input type='text' name='Seed_Season' onChange={handlechange} className={inputcss} value={seed.Seed_Season}></input>
                <label>ปีที่เก็บเกี่ยว</label>
                <input type='text' name='Seed_Crop_Year' onChange={handlechange} className={inputcss} value={seed.Seed_Crop_Year}></input>
                <button className='bg-[#003f5c] p-2 px-5 rounded-md text-white hover:bg-opacity-80 shadow-md' onClick={addProduct} >ADD</button>
            </div>
        </div>
    )
}

export default AddProduct