interface Props {
  fileUrl: string;
}

export default function GOfficeViewer({ fileUrl }: Props) {
  const viewerUrl = `https://docs.google.com/viewer?url=${encodeURIComponent(
    fileUrl
  )}&embedded=true`;

  return (
    <iframe
      src={viewerUrl}
      width="100%"
      height="600px"
      // frameBorder="0"
      allowFullScreen
      title="Google Docs Viewer"
    ></iframe>
  );
}
