'use client'

import { useState, useEffect } from 'react'
import axiosClient from '@/axios-client.js'
import { Button, Input, ButtonUpload, Label, Switch } from '@/components/ui/UI'
import { useStateContext } from '@/contexts/ContextProvider'
import Wallpaper from '@/components/Wallpaper.jsx'
import CKECustom from '@/components/ckeditor/ckecustom'
import NotFound from '@/app/not-found'
import * as Blog from '@/lib/models/Blog'

export default function Page({params}) {
  const { user } = useStateContext();
  const [image, setImage] = useState({});
  const [imagePreview, setImagePreview] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [content, setContent] = useState('');
  const [isPublic, setIsPublic] = useState(false);
  const [errors, setErrors] = useState({});

  const { setAlertMessage } = useStateContext()

  useEffect(() => {
    if (params.id === undefined) {
      return
    }

    Blog.get(params.id, (data) => {
      const blog = data.data
      console.log(blog)

      setImage(blog.image)
      setImagePreview(blog.image)
      setTitle(blog.title)
      setContent(blog.content ?? '')
      setIsPublic(blog.is_public)

      if (blog.description) {
        setDescription(blog.description)
      }
    })
  }, [])

  const submit = (e) => {
    e.preventDefault()

    setErrors({})

    let blog = {
      author_id: user._id,
      title: title,
      description: description,
      content: content,
      is_public: isPublic,
      image: image ?? '',
    }

    // Store
    if (params.id === undefined) {
      Blog.create(blog, (data) => {
        window.location.replace(`/blog/edit/${data.id}`)
      }, (errors) => {
        setErrors(errors)
      })

      return
    }
    
    // Update
    blog._method = "PATCH"

    Blog.update(params.id, blog, (data) => {
      // show Client message "Successfuly updated"
      setAlertMessage({
        title: 'Success!',
        text: 'Blog was updated successfully!',
        status: 'success',
      })
    }, (errors) => {
      setErrors(errors)
    })
  }

  const handleImageUpload = (files) => {
    setImage(files[0])
    setImagePreview(URL.createObjectURL(files[0]))
  }

  const clearImagePreview = (e) => {
    e.stopPropagation()
    setImage('')
    setImagePreview(null)
  }

  const handleIsPublic = () => {
    setIsPublic(!isPublic)
  };

  return (
    <div>
      <Wallpaper src={imagePreview} />
      <main className="container w-9/12 mx-auto text-gray-200 bg-background my-44 relative z-30 p-10 rounded">
        <form onSubmit={submit} className="space-y-8">
          <Label help="здесь вы можете создать свой следующий шедевр" button={<Button width="w-40" color="bg-primary" type="submit">сохранить</Button>}>Создание блога</Label>
          <Switch checked={isPublic} onChange={handleIsPublic}/>
          <div>
            <ButtonUpload handle={handleImageUpload} error={errors.image} clear={clearImagePreview} previews={imagePreview} single={true}>Титульное изображение</ButtonUpload>
          </div>
          <Input width="w-full" label="Придумайте название" handle={setTitle} error={errors.title}>{title}</Input>
          <Input width="w-full" label="Добавьте описание" handle={setDescription} error={errors.description} type="textarea">{description}</Input>
          <div className="text-white">
            <div className="text-gray-400 block mb-2">Содержание вашей публикации</div>
            <div>
              <CKECustom 
                content={content}
                handler={(e, editor) => {
                  setContent(editor.getData())
              }}/>
            </div>
          </div>
        </form>
      </main>
    </div>
  )
}
