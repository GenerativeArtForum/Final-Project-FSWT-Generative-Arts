import Image from 'next/image';
import { useState } from 'react';

interface ImageOverlayProps {
  src: string;
  alt: string;
  width: number;
  height: number;
}

const ImageOverlay: React.FC<ImageOverlayProps> = ({ src, alt, width, height }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOverlay = () => setIsOpen(!isOpen);

  return (
    <>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        onClick={toggleOverlay}
        className="cursor-pointer"
      />
      {isOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 backdrop-blur-sm"
          onClick={toggleOverlay}
        >
          <div className="relative">
            <Image
              src={src}
              alt={alt}
              width={width * 2}
              height={height * 2}
              className="max-h-[90vh] max-w-[90vw] object-contain"
            />
            <button 
              className="absolute top-4 right-4 text-white text-2xl"
              onClick={toggleOverlay}
            >
              ×
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ImageOverlay;