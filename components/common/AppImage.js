import React from 'react';
import Image from 'next/image';

function AppImage({
  src,
  alt = "Image Name",
  className = "",
  width = 800,
  height = 600,
  priority = false,
  ...props
}) {
  const [imgSrc, setImgSrc] = React.useState(src);

  const handleError = () => {
    setImgSrc("/assets/images/no_image.png");
  };

  return (
    <Image
      src={imgSrc}
      alt={alt}
      width={width}
      height={height}
      className={className}
      priority={priority}
      onError={handleError}
      {...props}
    />
  );
}

export default AppImage;