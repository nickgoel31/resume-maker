import { redirect } from 'next/navigation'
import React from 'react'

const ShowcasePage = () => {
  redirect("/create-resume")
  return (
    <div>Redirecting</div>
  )
}

export default ShowcasePage