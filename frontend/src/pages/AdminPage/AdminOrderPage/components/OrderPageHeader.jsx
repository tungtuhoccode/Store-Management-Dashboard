import React, { useState, useMemo } from 'react'

  import {
    Download,
    Plus
} from "lucide-react"
  import { Button } from "@/components/ui/button"


export default function OrderPageHeader() {
  return(
    <div className="flex justify-between w-full mb-4">
      <div>
        <h1 className='font-bold text-xl'>Orders</h1>
        <h3 className='text-slate-500'>Here's a list of your orders for your shop!</h3>
      </div>
      <div className='flex items-center gap-1'>
        <Button className="w-24 inline-flex items-center px-4 py-2 border border-gray-300 rounded-sm bg-white text-gray-700 text-sm font-medium hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"> 
          <span className='mr-1'>Import</span> 
          <Download/>
        </Button>
        <Button className="w-24 inline-flex items-center px-4 py-2 bg-slate-900 text-white text-sm font-medium rounded-md hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"> 
          <span className='mr-1'>Create</span> 
          <Plus/>
        </Button>
      </div>

    </div>
  )
}
