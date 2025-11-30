import { Box, Button, HStack, Icon, Tooltip } from "@chakra-ui/react";
import {
  RiArrowLeftSLine,
  RiArrowRightSLine,
  RiAspectRatioLine,
  RiExpandWidthLine,
  RiZoomInLine,
  RiZoomOutLine,
} from "@remixicon/react";
import { useEffect, useRef, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";
import HScroll from "./independent/HScroll";
import CContainer from "./independent/wrapper/CContainer";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

type PDFViewerProps = {
  fileUrl: string;
};

export default function PDFViewer({ fileUrl }: PDFViewerProps) {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [scale, setScale] = useState<number>(1);
  const [isSingleMode, setIsSingleMode] = useState<boolean>(true);
  const [containerWidth, setContainerWidth] = useState<number>(0);

  const containerRef = useRef<HTMLDivElement | null>(null);

  const utils = {
    prevPage: () => setPageNumber((p) => Math.max(p - 1, 1)),
    nextPage: () => setPageNumber((p) => Math.min(p + 1, numPages || 1)),
    zoomIn: () => setScale((s) => Math.min(s + 0.1, 3)),
    zoomOut: () => setScale((s) => Math.max(s - 0.1, 0.5)),
    fitToWidth: () => setScale(1),
    fitToPage: () => setScale(0.6),
  };

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
    setPageNumber(1);
  }

  function toggleMode() {
    setIsSingleMode((v) => !v);
    setScale(1);
  }

  useEffect(() => {
    const observer = new ResizeObserver((entries) => {
      if (entries[0]) setContainerWidth(entries[0].contentRect.width);
    });
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <CContainer w="full" h="full" display="flex" flexDir="column">
      <HScroll bg="gray.50" borderBottom="1px solid" borderColor="gray.200">
        <HStack minW="full" w={"max"} gap={2} p={2}>
          {isSingleMode && (
            <HStack gap={1}>
              <Tooltip label="Previous Page">
                <Button
                  onClick={utils.prevPage}
                  isDisabled={pageNumber <= 1}
                  size="sm"
                  variant="ghost"
                >
                  <Icon as={RiArrowLeftSLine} boxSize={5} />
                </Button>
              </Tooltip>

              <Box px={2}>
                {pageNumber} / {numPages || "--"}
              </Box>

              <Tooltip label="Next Page">
                <Button
                  onClick={utils.nextPage}
                  isDisabled={pageNumber >= (numPages || 1)}
                  size="sm"
                  variant="ghost"
                >
                  <Icon as={RiArrowRightSLine} boxSize={5} />
                </Button>
              </Tooltip>
            </HStack>
          )}

          <Tooltip label="Zoom Out">
            <Button size="sm" variant="ghost" onClick={utils.zoomOut}>
              <Icon as={RiZoomOutLine} boxSize={5} />
            </Button>
          </Tooltip>

          <Box minW="35px" textAlign="center">
            {Math.round(scale * 100)}%
          </Box>

          <Tooltip label="Zoom In">
            <Button size="sm" variant="ghost" onClick={utils.zoomIn}>
              <Icon as={RiZoomInLine} boxSize={5} />
            </Button>
          </Tooltip>

          <Tooltip label="Fit to Width">
            <Button size="sm" variant="ghost" onClick={utils.fitToWidth}>
              <Icon as={RiExpandWidthLine} boxSize={5} />
            </Button>
          </Tooltip>

          <Tooltip label="Fit to Page">
            <Button size="sm" variant="ghost" onClick={utils.fitToPage}>
              <Icon as={RiAspectRatioLine} boxSize={5} />
            </Button>
          </Tooltip>

          <Tooltip label="Mode">
            <Button onClick={toggleMode} size="sm" variant="ghost" ml="auto">
              {isSingleMode ? "Single" : "Scroll"}
            </Button>
          </Tooltip>
        </HStack>
      </HScroll>

      <CContainer
        ref={containerRef}
        flex={1}
        overflow="auto"
        bg="gray.100"
        position="relative"
      >
        <Document
          file={fileUrl}
          onLoadSuccess={onDocumentLoadSuccess}
          loading={<Box p={4}>Loading PDF…</Box>}
          error={
            <Box p={4} textAlign="center">
              <Box mt={2}>Failed to load PDF</Box>
            </Box>
          }
        >
          {containerWidth > 0 && (
            <>
              {isSingleMode && (
                <Box mx="auto" width="fit-content">
                  <Page
                    pageNumber={pageNumber}
                    renderTextLayer
                    renderAnnotationLayer
                    width={containerWidth}
                    scale={scale}
                  />
                </Box>
              )}

              {!isSingleMode && (
                <Box
                  display="flex"
                  flexDir="column"
                  gap={4}
                  alignItems="center"
                >
                  {Array.from(new Array(numPages || 0), (_, index) => (
                    <Box key={index}>
                      <Page
                        pageNumber={index + 1}
                        renderTextLayer
                        renderAnnotationLayer
                        width={containerWidth}
                        scale={scale}
                      />
                    </Box>
                  ))}
                </Box>
              )}
            </>
          )}
        </Document>
      </CContainer>
    </CContainer>
  );
}
