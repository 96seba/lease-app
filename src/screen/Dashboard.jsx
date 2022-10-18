import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import TableCheck from '../components/TableCheck'
import TableDebtors from '../components/TableDebtors'
import TableToResolveNVisits from '../components/TableToResolveNVisits';



export default function Dashboard() {





    return (
        <div className="flex w-screen h-screen items-center justify-center">

            <div className='flex w-2/3 h-screen items-center justify-center flex-col'>
                <div className='flex h-1/2 w-full items-end justify-center flex-column
                p-4
                '>

                    <TableDebtors />

                </div>
                <div className='flex h-1/2 w-full items-center justify-center'>
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

            <div className='flex w-1/3 h-screen
             bg-white items-end
              justify-start flex-column
              p-5'>

                <TableCheck />

            </div>







        </div>
    )
} 