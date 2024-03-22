import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import React from 'react'

const ExpAddBtn = () => {
  return (
    <Dialog>
        <DialogTrigger>
            <div className="add-btn rounded border p-3 bg-white text-sm font-semibold flex items-center justify-center">
                + Add
            </div>
        </DialogTrigger>

        <DialogContent>
            
        </DialogContent>
    </Dialog>
  )
}

export default ExpAddBtn