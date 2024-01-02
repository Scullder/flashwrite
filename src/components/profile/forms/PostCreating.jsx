'use client'

import { useState } from 'react'
import { Button, ButtonUpload, Input, Label } from '@/components/ui/UI'
import { useStateContext } from '@/contexts/ContextProvider'
import * as Post from '@/lib/models/Post'

export default function PostCreating(props) {
  const [title, setTitle] = useState('')
  const [text, setText] = useState('')
  const [errors, setErrors] = useState({})
  const [files, setFiles] = useState([])
  const [filePreviews, setFilePreviews] = useState([])

  const {setLoading} = useStateContext()

  const handleImageUpload = (loadedFiles) => {
    const uploadedFiles = [...files, ...loadedFiles]
    const uploadedFilePreviews = []
    setFiles(uploadedFiles)

    for (let index in uploadedFiles) {
      uploadedFilePreviews[index] = URL.createObjectURL(uploadedFiles[index])
    }

    setFilePreviews(uploadedFilePreviews)
  }
  
  const clearImagePreview = (e, index) => {
    e.stopPropagation()
    setFiles(files.toSpliced(index, 1))
    setFilePreviews(filePreviews.toSpliced(index, 1))
  }

  const submit = (e) => {
    e.preventDefault()
    
    setErrors({})
    setLoading(true)

    const payload = {
      title: title,
      text: text,
      images: files,
    }

    Post.create(payload, (data) => {
      setLoading(false)
      window.location.replace("/profile/posts")
    }, (errors) => {
      setErrors(errors)
      setLoading(false)
    })
  }

  return (
    <form onSubmit={submit} className="w-[700px] space-y-3 flex flex-col">
      <Label help="заполните данные формы, что бы опубликовать новую запись">Новая публикация</Label>
      <Input width="w-full" label="Заголовок" handle={setTitle} error={errors.title}>{title}</Input>
      <Input width="w-full" label="Содержание" handle={setText} error={errors.text} type="textarea">{text}</Input>
      <ButtonUpload handle={handleImageUpload} error={errors.images} previews={filePreviews} clear={clearImagePreview}/>
      <Button _class="ml-auto" type="submit">опубликовать</Button>
    </form>
  )
}