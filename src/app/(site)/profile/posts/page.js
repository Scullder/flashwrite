'use client'

import { useState, useEffect } from 'react'
import { useStateContext } from '@/contexts/ContextProvider'
import ProfilePost from '@/components/profile/ProfilePost'
import { Button } from '@/components/ui/UI'
import Modal from '@/components/ui/modal/Modal'
import PostCreating from '@/components/profile/forms/PostCreating'
import * as Post from '@/lib/models/Post'

export default function Page() {
  const [posts, setPosts] = useState([])
  const [postFormVisability, setPostFormVisability] = useState(false)
  const { setAlertMessage } = useStateContext()

  useEffect(() => {
    Post.getAll((data) => {
      setPosts(data.data)
    })
  }, []);

  /*setAlertMessage({
    title: 'Новое сообщение!',
    text: 'Text message',
    status: 'success',
  })*/

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
