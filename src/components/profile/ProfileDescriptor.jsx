'use client'

import { HiUser } from 'react-icons/hi'
import { RiUserFollowFill, RiUserSharedFill } from 'react-icons/ri'
import { TbArticle } from 'react-icons/tb'
import { Button } from '@/components/ui/UI'

export default function ProfileDescriptor(props) {
  const data = {
    name: 'Electric Youth',
    level: 23,
    tag: '@electric_youth',
    description: 'The thought of recreating the past with music is not interesting to us, it\'s probably been the biggest misconception of our music and what we\'re about thus far. The reality is, we\'re much more interested in creating things for the future than things from the past. We are nostalgic people, not in the sense that we long for a different time, because we love the present, but how could we not be reminded of the past when every day, we see the person we had a crush on since 7th grade?',
    followersCount: 1000,
    followingCount: 139,
    publicationsCount: 203,
  }

  return (
    <section id="descriptor" className="flex items-center mt-[140px] mb-[80px]">
      <div className="mx-auto flex text-xl gap-6 bg-background p-6 rounded">
        <div className="w-[300px] min-w-[300px] -mt-16">
          {data.image
            ? <img src={data.image} className="w-full rounded drop-shadow" />
            : <div className="w-full rounded drop-shadow flex h-[320px] bg-gray-300 text-tile justify-center items-center text-7xl"><HiUser /></div>
          }
          {/* <Button width="w-full" _class="mx-auto mt-4">Подписаться</Button> */}
        </div>
        <div className="w-9/12 relative">
          <div className="flex items-end mb-8">
            <h1 className="text-4xl font-bold">{data.name}</h1>
            {/* <h2 className="text-3xl text-red ml-4">
              <label className="flex items-end"><i className="ri-arrow-up-fill"></i>{data.level} lv.</label>
            </h2> */}
            <h2 className="text-2xl text-secondary ml-auto">{data.tag}</h2>
          </div>
          <div className="max-h-3/5 overflow-auto">{data.description}</div>
          <div className="mt-auto pt-4">
            <div className="flex gap-14 text-2xl text-gray-200 justify-center items-center p-4">
              {data.followersCount && <span className="flex justify-center items-center gap-2"><RiUserFollowFill /> {data.followersCount} followers</span>}
              {data.followersCount && <span className="flex justify-center items-center gap-2"><RiUserSharedFill /> {data.followingCount} following</span>}
              {data.followersCount && <span className="flex justify-center items-center gap-2"><TbArticle /> {data.publicationsCount} publications</span>}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}