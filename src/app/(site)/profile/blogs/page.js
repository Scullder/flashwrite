'use client'

import { useState, useEffect } from 'react'
import axiosClient from '@/axios-client.js'
import Link from 'next/link'
import { Button, Modal, LoadingScreen } from '@/components/ui/UI'

export default function Page() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    axiosClient
      .get('/blogs')
      .then(({ data }) => {
        setPosts(data.data);
      })
      .catch((error) => {
        const response = error.response;

        if (response && response.status === 422) {
          setErrors(response.data.errors);
        }
      });
  }, []);

  return (
    <>
      <Button _class="ml-auto my-10" color="bg-primary" link="/blog/edit">
        Написать блог
      </Button>

      <div className="space-y-20 pb-20">
        {blogs.map(blog => (
          <ProfileBlog blog={post} key={blog.id} />
        ))}
      </div>
    </>
  )
}
