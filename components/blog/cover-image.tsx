import cn from 'classnames';
import Link from 'next/link';
import Image from 'next/image';

import { Fragment } from 'react';

type Props = {
  title: string
  src: string
  slug?: string
  dir?: string
}

const CoverImage = ({ title, src, slug, dir='blog' }: Props) => {
  const image = (
    <Fragment>
    <div className="relative mx-auto">
      {src && (
      <Image
        src={src}
        alt={`Cover Image for ${title}`}
        className={cn('shadow-lg dark:shadow-black/30 mx-auto', {
          'hover:shadow-lg transition-shadow duration-200': slug,
        })}
        width={600}
        height={480}
        sizes="100vw"
        // fill
     />
      )}
      </div>
    </Fragment>
  )
  return (
    <div className="sm:mx-0">
      {slug ? (
        <Link as={`/${dir}/${slug}`} href={`/${dir}/${slug}`} aria-label={title}>
          {image}
        </Link>
      ) : (
        image
      )}
    </div>
  )
}

export default CoverImage
