import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

const Products = () => {

  const [data, setData] = useState([])
  const [query, setQuery] = useState('')

  const [delModal, setDelModal] = useState(false)
  const [deleteId,setDeleteId] = useState(0)

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        `http://localhost:3333/readProduct`
      );
      setData(result.data.products);
    };
    fetchData();
  }, [])

  function dateFormat(data) {
    const date = data.substring(0, 10)
    return date
  }

  function search(data) {
    if (query.length >= 1) {
      return data.filter((item) => item.Seed_Varity.toLowerCase().includes(query) || item.Seed_RDCSD.toLowerCase().includes(query))
    }
    else return data
  }

  const delhandle = (id) => {
    setDeleteId(id.target.value)
    setDelModal(!delModal)
  }

  const deleteProduct = async() => {
    const res = await axios.delete(`http://localhost:3333/deleteProduct/${deleteId}`)
    alert(res.data.message)
    setDelModal(!delModal)
  }

  return (
    <div>
      <h1 className='text-center p-5 text-3xl font-bold'>Products</h1>
      <div className={delModal ? "block relative z-10" : 'hidden'}>
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
        <div className='fixed inset-0 z-10 overflow-y-auto'>
          <div className='flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0'>
            <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3 className="text-lg font-medium leading-6 text-gray-900" id="modal-title">Delete Product id:{deleteId}</h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">Are you sure to delete Products</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <button onClick={deleteProduct} className="inline-flex w-full justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm">Delete</button>
                <button onClick={delhandle} className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">Cancel</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='px-10 pb-5'>
        <div className='py-2 flex justify-between'>
          <Link to='/products/add' className='bg-[#003f5c] p-2 px-5 rounded-md text-white hover:bg-opacity-80 shadow-md' >ADD Product</Link>
          <input type="text" placeholder='Search' className='p-2 rounded-md shadow-md' onChange={(e) => setQuery(e.target.value)} value={query} />
        </div>
        <table className='table-auto border-collapse border border-slate-400 p-2 bg-white rounded-md min-w-full'>
          <tbody>
            <tr className='text-center '>
              <td className='border p-2 '>ID</td>
              <td className='border p-2 '>วันที่</td>
              <td className='border p-2 '>ข้าวปี</td>
              <td className='border p-2 '>สัปดาห์ของปี</td>
              <td className='border p-2 '>พันธุ์ข้าว</td>
              <td className='border p-2 '>ศูนย์เมล็ดพันธุ์ข้าว</td>
              <td className='border p-2 '>ปริมาณเมล็ดพันธุ์ข้าว</td>
              <td className='border p-2 '>ฤดูเก็บเกี่ยว</td>
              <td className='border p-2 '>ปีที่เก็บเกี่ยว</td>
              <td className='border p-2 '></td>
            </tr>
            {search(data).map((item) =>
              <tr key={item.id}>
                <td className='border  p-2 text-center'>{item.id}</td>
                <td className='border  p-2 text-center'>{dateFormat(item.Seed_RepDate)}</td>
                <td className='border  p-2 text-center'>{item.Seed_Year}</td>
                <td className='border  p-2 text-center'>{item.Seeds_YearWeek}</td>
                <td className='border  p-2 text-center'>{item.Seed_Varity}</td>
                <td className='border  p-2 text-center'>{item.Seed_RDCSD}</td>
                <td className='border  p-2 text-center'>{item.Seed_Stock2Sale}</td>
                <td className='border  p-2 text-center'>{item.Seed_Season}</td>
                <td className='border  p-2 text-center'>{item.Seed_Crop_Year}</td>
                <td className='border  p-2 text-center'>
                  <Link to={`/products/edit/${item.id}`} className='bg-[#003f5c] p-2 px-5 rounded-md text-white hover:bg-opacity-80 m-1 shadow-md'>Edit</Link>
                  <button className='bg-red-500 p-2 px-5 rounded-md text-white hover:bg-opacity-80 m-1 shadow-md' onClick={delhandle} value={item.id}>Del</button>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Products