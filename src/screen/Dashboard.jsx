import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import TableCheck from '../components/TableCheck'
import TableDebtors from '../components/TableDebtors'
import TableToResolveNVisits from '../components/TableToResolveNVisits';



export default function Dashboard() {

    return (
        <div className="flex  h-[91.5vh] w-screen items-center justify-center">

            <div className='flex w-3/4  h-[91.5vh] items-center justify-center flex-col'>
                <div className='flex h-[46vh] w-full items-end justify-center flex-column p-4
                '>

                    <TableDebtors />

                </div>
                <div className='flex h-[46vh] w-full items-center justify-center'>
                    <div className='flex w-1/2 h-full items-end justify-center
                    flex-column p-4'>
                        <TableToResolveNVisits />
                    </div>
                    <div className='flex w-1/2 h-full items-end justify-center 
                    flex-column p-4'>

                        <TableToResolveNVisits />

                    </div>
                </div>
            </div>
            <div className='flex w-1/4  h-[91.5vh]
              items-end
              justify-start flex-column p-4
              '>
                <TableCheck />
            </div>
        </div>
    )
} 