
"use client"
import { Skill } from '../page'


import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import React, { useState } from 'react'
import { z } from "zod"
 
import { Button } from "@/components/ui/button"

import { Input } from '@/components/ui/input'

const SkillAddBtn = ({onSkillAdd}:{onSkillAdd: (education:Skill) => void}) => {
  return (
    <div>SkillAddBtn</div>
  )
}

export default SkillAddBtn