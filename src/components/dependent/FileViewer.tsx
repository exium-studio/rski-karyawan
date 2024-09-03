import { Image } from "@chakra-ui/react";
import { Viewer, Worker } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import React from "react";
import NotSupported from "../independent/NotSupported";
import CContainer from "../independent/wrapper/CContainer";

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
          <CContainer>
            <Worker
              workerUrl={`https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js`}
            >
              <Viewer fileUrl={fileUrl} />
            </Worker>
          </CContainer>
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

  return <div>{renderViewer()}</div>;
};

export default FileViewer;
