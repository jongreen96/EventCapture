import Image from 'next/image';

export default function ImagePreview({
  url,
  guest,
}: {
  url: string;
  guest: string;
}) {
  return (
    <Image
      src={url}
      alt={guest}
      className='h-full w-full object-contain'
      fill
    />
  );
}
