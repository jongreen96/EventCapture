import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Upload } from 'lucide-react';

export default function ImageInput({
  files,
  setFiles,
}: {
  files: FileList | null;
  setFiles: React.Dispatch<React.SetStateAction<FileList | null>>;
}) {
  const handleFileClick = () => {
    const fileInput = document.getElementById('fileInput') as HTMLInputElement;
    fileInput?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const newFilesArray = Array.from(e.target.files);

    setFiles((prevFiles) => {
      if (!prevFiles) {
        return newFilesArray as unknown as FileList;
      }

      const prevFilesArray = Array.from(prevFiles);

      // Merge the new files with the existing ones, but filter out duplicates
      const combinedFiles = [
        ...prevFilesArray,
        ...newFilesArray.filter(
          (newFile) =>
            !prevFilesArray.some(
              (prevFile) =>
                prevFile.name === newFile.name &&
                prevFile.size === newFile.size &&
                prevFile.lastModified === newFile.lastModified,
            ),
        ),
      ];

      // Create a new FileList from the combined array
      const dataTransfer = new DataTransfer();
      combinedFiles.forEach((file) => dataTransfer.items.add(file));

      return dataTransfer.files;
    });
  };
  return (
    <>
      <Input
        id='fileInput'
        type='file'
        name='files'
        accept='image/*'
        multiple
        className='hidden'
        onChange={handleFileChange}
      />

      <Button
        type='button'
        variant='outline'
        onClick={handleFileClick}
        className='flex h-32 w-full flex-col gap-2 border-dashed'
      >
        <Upload className='h-8 w-8' />
        {files?.length ? (
          <>
            <p>Add More Photos</p>
            <p className='text-sm text-gray-500'>
              {files.length} file{files.length > 1 ? 's' : ''} selected
            </p>
          </>
        ) : (
          'Upload Photos'
        )}
      </Button>
    </>
  );
}
