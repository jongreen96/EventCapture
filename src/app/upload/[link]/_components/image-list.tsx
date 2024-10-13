import Image from 'next/image';
import { useMemo } from 'react';

export default function ImageList({ files }: { files: FileList | null }) {
  const images = useMemo(() => {
    if (!files) return null;

    return Array.from(files)
      .slice(0, 6)
      .map((file, index) => (
        <div
          key={index}
          className='relative z-10'
          style={{ marginLeft: index === 0 ? 0 : '-3rem' }}
        >
          <Image
            src={URL.createObjectURL(file)}
            alt={file.name}
            className='h-16 w-16 rounded-md object-cover'
            width={64}
            height={64}
          />
        </div>
      ));
  }, [files]);

  if (!files) return null;

  return (
    <div className='relative flex items-center gap-2'>
      {images}
      {files.length > 6 && (
        <span className='text-sm text-gray-500'>+{files.length - 6} more</span>
      )}
    </div>
  );
}
