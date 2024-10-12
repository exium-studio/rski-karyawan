import DOMPurify from "dompurify";
import useDataState from "../../hooks/useDataState";
import NoData from "../independent/NoData";
import Skeleton from "../independent/Skeleton";
import Retry from "./Retry";

interface Props {
  url: string;
  tabIndex: number;
  index: number;
}

export default function TentangContent({ url, tabIndex, index }: Props) {
  const { error, loading, data, retry } = useDataState<any>({
    initialData: undefined,
    url: url,
    conditions: tabIndex === index,
    dependencies: [tabIndex],
  });

  // Sanitasi HTML menggunakan DOMPurify
  const cleanHtml = DOMPurify.sanitize(data?.[0]?.konten || "");

  const render = {
    loading: (
      <>
        <Skeleton flex={1} />
      </>
    ),
    error: (
      <>
        <Retry retry={retry} />
      </>
    ),
    empty: (
      <>
        <NoData />
      </>
    ),
    loaded: (
      <>
        <div dangerouslySetInnerHTML={{ __html: cleanHtml }} />
      </>
    ),
  };

  return (
    <>
      {loading && render.loading}
      {!loading && (
        <>
          {error && render.error}
          {!error && (
            <>
              {!data && render.empty}
              {data && render.loaded}
            </>
          )}
        </>
      )}
    </>
  );
}
