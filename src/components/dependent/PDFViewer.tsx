import { useMemo, Suspense, lazy } from "react";
import { StackProps, Text } from "@chakra-ui/react";
import { Worker } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import CContainer from "../independent/wrapper/CContainer";

// Lazy load Viewer to avoid SSR issues
const Viewer = lazy(() =>
  import("@react-pdf-viewer/core").then((mod) => ({ default: mod.Viewer }))
);

interface Props extends StackProps {
  fileUrl?: string;
  aspectRatio?: number;
}

export function PDFViewer({
  fileUrl,
  aspectRatio = 10 / 12,
  ...restProps
}: Props) {
  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  // In Vite, use CDN for worker file instead of require
  const workerUrl = useMemo(
    () => "https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js",
    []
  );

  return (
    <CContainer w="full" aspectRatio={aspectRatio} {...restProps}>
      {fileUrl ? (
        <Worker workerUrl={workerUrl}>
          <Suspense fallback={<div>Loading PDF...</div>}>
            <Viewer fileUrl={fileUrl} plugins={[defaultLayoutPluginInstance]} />
          </Suspense>
        </Worker>
      ) : (
        <Text>Tidak ditemukan/URL error</Text>
      )}
    </CContainer>
  );
}
