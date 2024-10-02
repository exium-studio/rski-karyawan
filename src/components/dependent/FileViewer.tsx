import { Image } from "@chakra-ui/react";
import React from "react";
import NotSupported from "../independent/NotSupported";

interface FileViewerProps {
  fileUrl: string;
  fileType: string;
}

const FileViewer: React.FC<FileViewerProps> = ({ fileUrl, fileType }) => {
  const renderViewer = () => {
    switch (fileType) {
      case "doc":
      case "docx":
      case "xls":
      case "xlsx":
      case "ppt":
      case "pptx":
        const googleDocsViewerUrl = `https://docs.google.com/viewer?url=${encodeURIComponent(
          fileUrl
        )}&embedded=true`;
        return (
          <iframe
            src={googleDocsViewerUrl}
            width="100%"
            height="600px"
            allowFullScreen
            title="Google Docs Viewer"
          ></iframe>
        );
      case "pdf":
        return (
          <object
            data={fileUrl}
            type="application/pdf"
            aria-label="PDF document"
            style={{ height: "calc(100vh - 220px)" }}
          >
            <p>
              Perangkat anda tidak mendukung file PDF, silahkan download untuk
              melihat file <a href={fileUrl}>Download PDF</a>.
            </p>
          </object>
          //   <PDFViewer
          //     document={{
          //         url: 'https://arxiv.org/pdf/quant-ph/0410100.pdf',
          //     }}
          // />
        );
      case "jpg":
      case "jpeg":
      case "png":
      case "gif":
      case "bmp":
      case "webp":
      case "svg":
        return (
          <Image src={fileUrl} style={{ maxWidth: "100%", height: "auto" }} />
        );
      default:
        return (
          <NotSupported label="Tipe file tidak didukung untuk pratinjau" />
        );
    }
  };

  return renderViewer();
};

export default FileViewer;
