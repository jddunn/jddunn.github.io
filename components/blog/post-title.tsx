import { ReactNode } from 'react'

type Props = {
  children?: ReactNode
}

const PostTitle = ({ children }: Props) => {
  return (
    <>

    <h1 className="text-2xl md:text-2xl lg:text-3xl font-bold 
      tracking-tighter leading-tight md:leading-none mb-12 
      text-center"
    >
    <span className="text-2xl md:text-2xl lg:text-3xl red-400 inline
     tracking-tighter leading-tight md:leading-none mb-12 text-center
      text-gray-400 mr-2">
      // 
    </span>
      {children}
    </h1>
    </>
  )
}

export default PostTitle
