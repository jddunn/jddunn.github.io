import cn from 'classnames';
import Link from 'next/link';
import Image from 'next/image';
import { Fragment, useState, useEffect } from 'react';
import styles from '../../styles/CoverImage.module.scss';

type Props = {
  title: string
  src: string
  slug?: string
  dir?: string
  enablePadding?: boolean
}

const CoverImage = ({ title, src, slug, dir='blog', enablePadding = true }: Props) => {
  const [imageDimensions, setImageDimensions] = useState<{ width: number; height: number } | null>(null);
  const [needsPadding, setNeedsPadding] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!src || !enablePadding) {
      setIsLoading(false);
      return;
    }

    // Create an image element to check natural dimensions
    const img = new window.Image();
    img.onload = () => {
      const aspectRatio = img.naturalWidth / img.naturalHeight;
      // Consider image narrow if aspect ratio is less than 1.2 (taller than wide or nearly square)
      setNeedsPadding(aspectRatio < 1.2);
      setImageDimensions({ width: img.naturalWidth, height: img.naturalHeight });
      setIsLoading(false);
    };
    img.onerror = () => {
      setIsLoading(false);
    };
    img.src = src;
  }, [src, enablePadding]);

  // Generate gradient based on theme and image characteristics
  const getGradientStyle = () => {
    if (!needsPadding) return {};
    
    // Victorian-inspired gradients that complement the theme
    const gradients = {
      dark: [
        'linear-gradient(135deg, rgba(212, 175, 55, 0.1) 0%, rgba(139, 105, 20, 0.05) 50%, rgba(212, 175, 55, 0.1) 100%)',
        'radial-gradient(ellipse at center, rgba(212, 175, 55, 0.08) 0%, rgba(139, 105, 20, 0.03) 40%, rgba(0, 0, 0, 0) 70%)',
        'linear-gradient(90deg, rgba(139, 105, 20, 0.1) 0%, rgba(212, 175, 55, 0.05) 25%, rgba(212, 175, 55, 0.05) 75%, rgba(139, 105, 20, 0.1) 100%)'
      ],
      light: [
        'linear-gradient(135deg, rgba(212, 175, 55, 0.15) 0%, rgba(254, 253, 248, 0.5) 50%, rgba(212, 175, 55, 0.15) 100%)',
        'radial-gradient(ellipse at center, rgba(212, 175, 55, 0.12) 0%, rgba(254, 253, 248, 0.4) 40%, rgba(255, 255, 255, 0) 70%)',
        'linear-gradient(90deg, rgba(212, 175, 55, 0.12) 0%, rgba(254, 253, 248, 0.6) 25%, rgba(254, 253, 248, 0.6) 75%, rgba(212, 175, 55, 0.12) 100%)'
      ]
    };

    const isDark = typeof window !== 'undefined' && document.documentElement.classList.contains('dark');
    const selectedGradients = isDark ? gradients.dark : gradients.light;
    const randomGradient = selectedGradients[Math.floor(Math.random() * selectedGradients.length)];

    return {
      background: randomGradient,
      padding: '0 10%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative' as const,
      overflow: 'hidden' as const,
      '&::before': {
        content: '""',
        position: 'absolute' as const,
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'inherit',
        filter: 'blur(40px)',
        opacity: 0.3,
        zIndex: 0
      }
    };
  };
  const imageElement = src && (
    <Image
      src={src}
      alt={`Cover Image for ${title}`}
      className={cn('shadow-lg dark:shadow-black/30 mx-auto', {
        'hover:shadow-lg transition-shadow duration-200': slug,
      })}
      width={needsPadding ? 480 : 600}
      height={480}
      sizes="100vw"
      style={{
        objectFit: needsPadding ? 'contain' : 'cover',
        maxWidth: '100%',
        height: 'auto',
        position: 'relative' as const,
        zIndex: 1
      }}
    />
  );

  const image = (
    <Fragment>
      <div 
        className={cn('relative mx-auto', {
          [styles.coverImagePadded]: needsPadding,
          [styles.coverImageNormal]: !needsPadding
        })}
        style={needsPadding ? getGradientStyle() : {}}
      >
        {/* Decorative frame for narrow images */}
        {needsPadding && (
          <>
            <div className={cn(styles.cornerFrame, styles.topLeft)} />
            <div className={cn(styles.cornerFrame, styles.topRight)} />
            <div className={cn(styles.cornerFrame, styles.bottomLeft)} />
            <div className={cn(styles.cornerFrame, styles.bottomRight)} />
          </>
        )}
        {imageElement}
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
