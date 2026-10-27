import type { ImgHTMLAttributes, SyntheticEvent } from 'react';

interface SafeImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  fallbackSrc?: string;
}

export default function SafeImage({ fallbackSrc = '/blog-cover.svg', onError, ...props }: SafeImageProps) {
  const handleError = (event: SyntheticEvent<HTMLImageElement>) => {
    const image = event.currentTarget;
    if (image.dataset.fallbackApplied !== 'true') {
      image.dataset.fallbackApplied = 'true';
      image.src = fallbackSrc;
    }
    onError?.(event);
  };

  return <img {...props} onError={handleError} />;
}
