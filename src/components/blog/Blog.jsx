'use client'

import { useState, useEffect } from 'react'
import { useStateContext } from '@/contexts/ContextProvider';
import axiosClient from '@/axios-client.js'
import Link from 'next/link'
import { Button, Modal, Input, ButtonUpload } from '@/components/ui/UI'
import Pagination from '@/components/ui/Pagination'
import * as typ from '@/components/typography/headers'
import Wallpaper from '@/components/Wallpaper.jsx'
// HTML editor
import SunEditor, { buttonList } from 'suneditor-react'
import 'suneditor/dist/css/suneditor.min.css'
import { align, font, fontSize, fontColor, hiliteColor, horizontalRule, image, template, video } from 'suneditor/src/plugins'


export default function Page({blog}) {
  const data = blog.data;

  data.comments = [
    {
      id: 1,
      author: {
          authorId: 1,
          name: 'FlameDragon',
          image: '',
      },
      text: 'Después de 11 años aun sigo escuchando esta lista, así es es 2022',
      date: '2023-08-06 16:58:55',
    },
    {
      id: 2,
      author: {
          authorId: 2,
          name: 'Mr.Silver',
          image: '',
      },
      text: 'Amazing voice, no doubt you will continue to make this great music',
    },
    {
      id: 3,
      author: {
          authorId: 3,
          name: 'Judy',
          image: '',
      },
      text: 'This song is absolutely beautiful i love it so damn much its living rent free in my head for the past 3 weeks PLEASE make more like this and continue being unique and talented!!!!! your voice is just so soothing!',
    },
    {
      id: 4,
      author: {
          authorId: 1,
          name: 'FlameDragon',
          image: '',
      },
      text: 'Después de 11 años aun sigo escuchando esta lista, así es es 2022',
      date: '2023-08-06 16:58:55',
    },
    {
      id: 5,
      author: {
          authorId: 2,
          name: 'Mr.Silver',
          image: '',
      },
      text: 'Amazing voice, no doubt you will continue to make this great music',
    },
    {
      id: 6,
      author: {
          authorId: 3,
          name: 'Judy',
          image: '',
      },
      text: 'This song is absolutely beautiful i love it so damn much its living rent free in my head for the past 3 weeks PLEASE make more like this and continue being unique and talented!!!!! your voice is just so soothing!',
    },
  ]

  const { user } = useStateContext();
  const [comment, setComment] = useState(null);
  const [errors, setErrors] = useState({});
  
  const sendComment = (e) => {
    const payload = {
      author_id: user._id,
      post_id: post.id,
      text: comment,
    }

    axiosClient
      .post('/comments', payload)
      .then(({ data }) => {
        setComment('');
      })
      .catch((error) => {
        const response = error.response;
        if (response && response.status === 422) {
          setErrors(response.data.errors);
        }
      });
  }

  // Comments pagination
  const [commentPage, setCommentPage] = useState(1);
  const commentsPerPage = 30;
  const pageTotal = parseInt(data.comments.length / commentsPerPage);

  const pagination = (content, page, perPage) => {
    const startIndex = (page - 1) * perPage;
    
    return content.slice(startIndex, startIndex + perPage);
  }

  const paginationHandler = (pageNumber) => {
    setCommentPage(pageNumber);
  }

  // Content nav
  useEffect(() => {

    const headers = document.getElementById('blog-content')//.querySelector('h1, h2, h3');

    console.log(headers);

  });

  return (
    <>
      <Wallpaper src={data.image} />
      <main className="text-gray-300 my-44 z-30">
        <section id="blog" className="container relative w-11/12 mx-auto flex gap-4">
          <div className="w-[73%] rounded font-roboto text-xl bg-tileDark">
            <div className="flex items-center gap-2 mb-4 bg-tile p-5 text-lg">
              <img src={data.author.image} className="w-[40px] h-[40px] rounded-full border border-gray-700" />
              <label>{data.author.name}</label>
              <label className="text-gray-300 ml-auto">{data.created_at}</label>
            </div>
            <div className="p-10 px-20">
              <ul className="flex gap-3 text-lg font-sans px-[10px] mb-10">
                <li className="text-gray-500 hover:text-secondary"><a href="">@1st person</a></li>
                <li className="text-gray-500 hover:text-secondary"><a href="">@shooter</a></li>
                <li className="text-gray-500 hover:text-secondary"><a href="">@retro</a></li>
                <li className="text-gray-500 hover:text-secondary"><a href="">@doom shooter</a></li>
                <li className="text-gray-500 hover:text-secondary"><a href="">@2d graphick</a></li>
              </ul>
              <h1 className="text-4xl font-bold px-[10px] mb-6">{data.title}</h1>
              <p className="my-3 px-[10px]">{data.description}</p>
              <SunEditor id="blog-content"
                width="100%"
                height="auto"
                setDefaultStyle="font-family: inherit; font-size: inherit;"
                hideToolbar={true}
                disable={true}
                setContents={data.content}
                resizingBar={false}
              />
            </div>
          </div>

          <div className="w-[27%] h-auto rounded">
            <div className="bg-tileDark min-h-[500px] rounded p-5 sticky top-5">
              <span className="text-2xl font-bold">Содержание</span>
            </div>
          </div>
        </section>

        <section id="comments" className="my-20 container relative w-9/12 mx-auto">
          <div className="relative bg-tileDark rounded p-5">
            <div className="py-4">
              <h2 className="text-2xl font-semibold">Комментарии ({data.comments.length})</h2>
            </div>
            {pagination(data.comments, commentPage, commentsPerPage) 
              .map(comment => (
                <div className="bg-tile p-3 rounded my-5" key={comment.id}>
                  <div className="flex items-center gap-3">
                    <img src={comment.author.image} className="w-[40px] h-[40px] rounded-full border border-gray-700" />
                    <label className="font-bold">{comment.author.name}</label>
                    <label className="text-gray-500 ml-auto">{comment.date}</label>
                  </div>
                  <p className="my-2">{comment.text}</p>
                </div>
            ))}
            
            <div className="my-5">
              <Pagination page={commentPage} handler={paginationHandler} total={pageTotal}/>
            </div>
            
            <div className="h-[150px] relative">
              <textarea 
                onChange={(e) => setComment(e.target.value)} 
                value={comment} 
                className="w-full h-full bg-body rounded outline-none p-2 pb-[45px] resize-none border-2 border-tile" 
                placeholder="Введите ваш комментарий..."
              ></textarea>
              <Button onClick={sendComment} _class="absolute right-3 bottom-3" width="w-[110px]" height="h-[40px]">отправить</Button>
            </div>
          </div>
        </section>
        
      </main>

      
    </>
  )
}
