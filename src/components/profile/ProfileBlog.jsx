'use client'

import { useState } from 'react'
import { useStateContext } from '@/contexts/ContextProvider'
import axiosClient from '@/axios-client.js'
import { Button } from '@/components/ui/UI'
import ImageSlider from '../ui/ImageSlider'

export default function ProfileBlog({blog}) {
  const { user } = useStateContext();
  const [comment, setComment] = useState('');
  const [errors, setErrors] = useState({});

  return (
    <div className="w-full flex flex-col">
      <div className="relative m-auto p-4 rounded w-full bg-tile drop-shadow-lg">
        <div className="flex items-center gap-2 mb-4">
          <img src={blog.author.image} className="w-[40px] h-[40px] rounded-full border border-gray-700" />
          <label>{blog.author.name}</label>
          <label className="text-gray-500 ml-auto">{blog.date}</label>
        </div>
        <h2 className="text-xl font-medium">{blog.title}</h2>
        <p className="my-4">{blog.text}</p>
        <div className="w-full h-full">
          <ImageSlider slides={[blog.image]}/>
        </div>
      </div>
    </div>
  )
}