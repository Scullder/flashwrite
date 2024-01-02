'use client'

import { useState } from 'react'
import { Button, ButtonUpload, Input, Label } from '@/components/ui/UI'
import { useStateContext } from '@/contexts/ContextProvider'
import * as Post from '@/lib/models/Post'
import { MdDelete } from "react-icons/md"

export default function PostCreating(props) {
  const post = props.post

  const [title, setTitle] = useState(post.title ?? '')
  const [text, setText] = useState(post.text)
  const [errors, setErrors] = useState({})
  const [files, setFiles] = useState(post.images)
  const [oldFiles, setOldFiles] = useState(post.images)
  const [filePreviews, setFilePreviews] = useState(post.images)

  const { setLoading } = useStateContext()
  const { setAlertMessage } = useStateContext()

  /* const handleImageUpload = (loadedFiles) => {
    const uploadedFiles = [...files, ...loadedFiles]
    const uploadedFilePreviews = []
    setFiles(uploadedFiles)
    
    for (let index in uploadedFiles) {
      if (uploadedFiles[index] instanceof File) {
        uploadedFilePreviews[index] = URL.createObjectURL(uploadedFiles[index])
      } else {
        uploadedFilePreviews[index] = uploadedFiles[index]
      }
    }

    setFilePreviews(uploadedFilePreviews)
  } */

  /* const handleImageUpload = (loadedFiles) => {
    const uploadedFilePreviews = []
    setFiles([...files, ...loadedFiles])
    
    for (let index in loadedFiles) {
      if (loadedFiles[index] instanceof File) {
        uploadedFilePreviews.push(URL.createObjectURL(loadedFiles[index]))
      }
    }

    setFilePreviews([...filePreviews, ...uploadedFilePreviews])
  } */

  const handleImageUpload = (loadedFiles) => {
    const uploadedFilePreviews = []
    setFiles([...files, ...loadedFiles])
    
    for (let index in loadedFiles) {
      if (loadedFiles[index] instanceof File) {
        uploadedFilePreviews.push(URL.createObjectURL(loadedFiles[index]))
      }
    }

    setFilePreviews([...filePreviews, ...uploadedFilePreviews])
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

    let oldImagesPayload = []
    let newImagesPayload = []

    for (let key in files) {
      if (oldFiles.includes(files[key])) {
        oldImagesPayload.push(files[key])
      } else {
        newImagesPayload.push(files[key])
      }
    }

    const payload = {
      id: post.id,
      title: title,
      text: text,
      oldImages: oldImagesPayload,
      images: newImagesPayload,
    }

    Post.update(post.id, payload, (data) => {
      setLoading(false)
      setAlertMessage({
        title: 'Готово.',
        text: 'Пост успешно отредактирован.',
        status: 'success',
      })
      //window.location.replace("/profile/posts")
    }, (errors) => {
      setErrors(errors)
      setLoading(false)
    })
  }

  const deletePost = () => {
    setLoading(true)

    Post.destroy(post.id, (data) => {
      setLoading(false)
      window.location.replace("/profile/posts")
    })
  }

  return (
    <div className="w-[700px] space-y-3 flex flex-col">
      <Label help="заполните данные формы, что бы отредактировать запись" button={<button onClick={deletePost} className="text-xl rounded p-2 bg-rose-900 flex items-center justify-center hover:opacity-80"><MdDelete /></button>}>Редактирование публикации</Label>
      <Input width="w-full" label="Заголовок" handle={setTitle} error={errors.title}>{title}</Input>
      <Input width="w-full" label="Содержание" handle={setText} error={errors.text} type="textarea">{text}</Input>
      <ButtonUpload handle={handleImageUpload} error={errors.images} previews={filePreviews} clear={clearImagePreview}/>
      <Button onClick={submit} _class="ml-auto" type="submit">опубликовать</Button>
    </div>
  )
}