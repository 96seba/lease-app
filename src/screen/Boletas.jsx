import React, { Component } from 'react'
import TableBoletas from '../components/TableBoletas'
import { useNavigate } from "react-router-dom"

export default function Propiedades() {
    const files = []

    let navigate = useNavigate()

    return (
        <div className='bg-gray-100'>
            <button onClick={() => {

                console.log(files)
            }} className="py-5 flex items-center justify-start px-8 w-3/4 h-[6vh]">
                <button type="button" className="text-white bg-[#FF6F00] hover:bg-[#023E8A] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center mr-2 ">
                    <svg aria-hidden="true" className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                    <span className="sr-only">Icon description</span>
                </button>

                <h2 className="text-2xl">
                    Enviar boletas
                </h2>
            </button>
            <div className="flex px-4 items-end justify-start flex-col w-screen h-[85.5vh]"><div>
            </div>
                <TableBoletas files={files} />
            </div>
        </div>
    )
}