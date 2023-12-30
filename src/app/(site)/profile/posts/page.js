'use client'

import { useState, useEffect } from 'react'
import { useStateContext } from '@/contexts/ContextProvider'
import axiosClient from '@/axios-client.js'
import ProfilePost from '@/components/profile/ProfilePost'
import { Button } from '@/components/ui/UI'
import Modal from '@/components/ui/modal/Modal'
import PostCreating from '@/components/profile/forms/PostCreating'

export default function Page() {
  const [posts, setPosts] = useState([])
  const [postFormVisability, setPostFormVisability] = useState(false)
  const { setAlertMessage } = useStateContext()

  useEffect(() => {
    axiosClient
      .get('/posts')
      .then(({ data }) => {
        setPosts(data.data)
      })
      .catch((error) => {
        const response = error.response
        
        if (response && response.status === 422) {
          setErrors(response.data.errors)
        }
      })

    setAlertMessage({
      title: 'Новое сообщение!',
      text: 'Text message'
    })
  }, []);

  const handlePostFormVisability = () => {
    setPostFormVisability(!postFormVisability)
  }

  return (
    <>
      <Modal isVisible={postFormVisability} visabilityHandler={setPostFormVisability}>
        <PostCreating />
      </Modal>

      <Button onClick={handlePostFormVisability} _class="ml-auto my-10">Новый пост</Button>

      <div className="space-y-20 pb-20">
        {posts.map(post => (
          <ProfilePost post={post} key={post.id} />
        ))}
      </div>
    </>
  )
}
