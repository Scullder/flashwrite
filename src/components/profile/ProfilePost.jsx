'use client'

import { useState } from 'react'
import { useStateContext } from '@/contexts/ContextProvider'
import axiosClient from '@/axios-client.js'
import { BiSolidComment } from 'react-icons/bi'
import { Button } from '@/components/ui/UI'
import ImageSlider from '../ui/ImageSlider'

export default function ProfilePost(props) {
  const { user } = useStateContext();
  const post = props.post;
  const [isPostHover, setPostHover] = useState(false);
  const [isCommentsOpened, setCommentsOpened] = useState(false);
  const [comment, setComment] = useState('');
  const [errors, setErrors] = useState({});

  const handleCommentOpened = () => {
    setCommentsOpened(!isCommentsOpened);
  }

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

  return (
    <div className="w-full flex flex-col">
      <div className="relative m-auto p-4 rounded w-full bg-tile drop-shadow-lg|" onMouseEnter={() => setPostHover(true)} onMouseLeave={() => setPostHover(false)}>
        <div className="flex items-center gap-2 mb-4">
          <img src={post.author.image} className="w-[40px] h-[40px] rounded-full border border-gray-700" />
          <label>{post.author.name}</label>
          <label className="text-gray-500 ml-auto">{post.date}</label>
        </div>

        {post.title && 
          <h2 className="text-xl font-medium">{post.title}</h2>
        }
        <p className="my-4">{post.text}</p>
        
        {post.images && (
          <div className="w-full h-full">
            <ImageSlider slides={post.images} globKey={post.id}/>
          </div>
        )}

        {isPostHover &&
          <button onClick={handleCommentOpened} className="absolute right-4 bottom-4 w-[60px] h-[60px] text-primary hover:text-primaryDarker">
            <div className="relative w-full h-full text-center flex items-center justify-center">
              <div className="absolute top-0 text-6xl">
                <BiSolidComment />
              </div>
              <div className="absolute top-2 text-2xl text-white font-semibold">{post.comments.length}</div>
            </div>
          </button>
        }

        {isCommentsOpened &&
          <div onClick={handleCommentOpened} className="absolute top-0 right-0 w-full h-full bg-black opacity-60"></div>
        }

        {isCommentsOpened &&
          <div className="absolute top-0 left-0 w-3/4 h-full bg-tile p-2 pt-0 flex flex-col">
            <div className="py-4 px-5">
              <h2 className="text-2xl font-semibold">Comments ({post.comments.length})</h2>
            </div>
            <div className="bg-body w-full h-full flex-grow overflow-auto">
              {post.comments.map(comment => (
                <div className="bg-tile p-3 rounded m-5" key={comment.id}>
                  <div className="flex items-center gap-3">
                    <img src={comment.author.image} className="w-[40px] h-[40px] rounded-full border border-gray-700" />
                    <label className="font-bold">{comment.author.name}</label>
                    <label className="text-gray-500 ml-auto">{comment.date}</label>
                  </div>
                  <p className="mt-1">{comment.text}</p>
                </div>
              ))}
            </div>
            <div className="pt-2 h-[150px] relative">
              <textarea onChange={(e) => setComment(e.target.value)} value={comment} className="w-full h-full bg-body rounded outline-none p-2 pb-[45px] resize-none" placeholder="Введите ваш комментарий..."></textarea>
              <Button onClick={sendComment} _class="absolute right-2 bottom-2" width="w-[110px]" height="h-[40px]">отправить</Button>
            </div>
          </div>
        }
      </div>
    </div>
  )
}