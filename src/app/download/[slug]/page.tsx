'use client';

import { redirect } from 'next/navigation';
import { useState } from 'react';

export default function DownloadPage({ params }: { params: { slug: string } }) {
  if (!params.slug) redirect('/');

  const [downloaded, setDownloaded] = useState(false);

  function sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  (async function getPresignedUrl() {
    if (downloaded) return;

    setDownloaded(true);
    const res = await fetch(`/api/download?event=${params.slug}`);
    const downloadUrl = await res.text();

    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = 'download.zip';
    link.click();
    link.remove();

    await sleep(1000);

    window.close();
  })();

  // TODO: Better UI
  return (
    <div>
      <h1>Download Page</h1>
    </div>
  );
}
