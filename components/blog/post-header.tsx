import DateFormatter from './date-formatter'
import CoverImage from './cover-image'
import PostTitle from './post-title'
import type Author from '../../interfaces/author'

import { useRouter } from "next/router"
import { BsArrowLeftCircleFill } from "react-icons/bs"

type Props = {
  title: string
  coverImage: string
  date: string
  createdDate?: string
  tags?: string
  author?: Author
  dir?: string
}

const PostHeader = ({ title, coverImage, date, createdDate, tags, 
   // author,
   dir='blog'}: Props) => {


  const _tags = tags.split(",")
  const router = useRouter()
  return (
    <>
      <div>
        <PostTitle>{title}</PostTitle>
        {/* <div className="hidden md:block md:mb-12"> */}
          {/* <Avatar name={author.name} picture={author.picture} /> */}
        {/* </div> */}
        <div className="mb-0">
     
        <div className="text-md text-slate-500 text-center">
          {/* Ternary statement to change the text from Project created to Post created 
              if dirs is equal to projects
          */}
          {createdDate && (
            dir === 'projects' ? 'Project created: ' : 'Post created:' 
          )}
          {createdDate && (
            <DateFormatter dateString={createdDate} />)
          }
        </div>


        <div className="text-md text-slate-200 mb-3 backButton">
          {router.pathname !== "/" && (
            <button onClick={() => router.back()}>
                <BsArrowLeftCircleFill />
            </button>
          )}
          </div>
      </div>

        <div className="text-md text-slate-500 text-center">
          Post updated: <DateFormatter dateString={date} />
        </div>
        <div className="mb-8 md:mb-16 sm:mx-0 mt-5">
          <CoverImage title={title} src={coverImage} dir={dir}/>
          {_tags && _tags.length > 0 && (
          <div className="text-sm text-slate-500 mb-4 mt-2 text-center">
            {_tags.map((tag, index) => (
              <span key={index} className="mr-5 underline">
                {tag}
              </span>
            ))}
            </div>
          )}
        </div>


      <div className="max-w-2xl mx-auto">
        {/* <div className="block md:hidden mb-6">
          <Avatar name={author.name} picture={author.picture} />
        </div> */}
      </div>
      </div>
    </>
  )
}

export default PostHeader
