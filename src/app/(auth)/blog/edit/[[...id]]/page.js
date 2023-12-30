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

  /* const fetchBlog = (id) => {
    axiosClient
      .get(`/blogs/${id}`, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(({ data }) => {
        const blog = data.data
        console.log(blog)

        setImage(blog.image)
        setImagePreview(blog.image)
        setTitle(blog.title)
        setContent(blog.content)
        setIsPublic(blog.is_public)

        if (blog.description) {
          setDescription(blog.description)
        }
      })
      .catch((error) => {
        const response = error.response;
        if (response && response.status === 404) {
          // return 404
        }
      })
  } */

  useEffect(() => {
    if (params.id !== undefined) {
      //fetchBlog(params.id)
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
    }
  }, [])

  const submit = (e) => {
    e.preventDefault()

    setErrors({})

    const formData = new FormData()

    formData.append('author_id', user._id)
    formData.append('title', title)
    formData.append('description', description)
    formData.append('content', content)
    if (image) {
      formData.append('image', image)
    }
    formData.append('is_public', isPublic)

    console.log(formData)

    // Store
    if (params.id === undefined) {
      axiosClient
        .post('/blogs', formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then(({ data }) => {
          window.location.replace(`/blog/edit/${data.id}`);
        })
        .catch((error) => {
          const response = error.response;
          if (response && response.status === 422) {
            setErrors(response.data.errors)
            console.log(response.data.errors)
          }
        })
      
      return
    }
    
    // Update
    formData.append("_method", "PATCH")

    axiosClient
      .post(`/blogs/${params.id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(({ data }) => {
        // show Client message "Successfuly updated"
      })
      .catch((error) => {
        const response = error.response;
        if (response && response.status === 422) {
          setErrors(response.data.errors);
          console.log(response.data.errors);
        }
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
