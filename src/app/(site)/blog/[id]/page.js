import Blog from '@/components/blog/Blog'
//import styles from './style.module.css'

async function getBlog(id) {
  try {
    return await fetch(`${process.env.apiUrl}/api/blogs/${id}`, { cache: 'no-store' })
      .then(res => res.json());

  } catch(e) {
    console.log(e);
  }
}

export default async function Page({params}) {
  const blog = await getBlog(params.id);
  
  return (
    <Blog blog={blog}/>
  )
}
