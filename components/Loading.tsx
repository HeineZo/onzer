import React from 'react'
import { Loader2 } from 'lucide-react'

export default function Loading() {
  return (
    <div className='w-screen absolute h-screen flex justify-center items-center'>
        <Loader2 size="50" className="animate-spin" />
    </div>
  )
}
