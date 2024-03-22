import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import React from 'react'

const ExpAddBtn = () => {
  return (
    <Dialog>
        <DialogTrigger>
            <div className="add-btn rounded border p-3 bg-white text-sm font-semibold flex items-center justify-center">
                            + Add
                        </div>
        </DialogTrigger>
    </Dialog>
  )
}

export default ExpAddBtn