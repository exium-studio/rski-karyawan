import { useCallback, useEffect } from "react";
import { useLocation } from "react-router-dom";

const useBackOnClose = (
  id: string,
  isOpen: boolean,
  onOpen: () => void,
  onClose: () => void
) => {
  const location = useLocation();

  // handle onOpen, push history if needed
  useEffect(() => {
    const currentUrl = new URL(window.location.href);
    const componentId = currentUrl.searchParams.get(id);

    if (isOpen && !componentId) {
      currentUrl.searchParams.set(id, "1");
      window.history.pushState(null, "", currentUrl.toString());
    }
  }, [isOpen, id]);

  const handlePopState = useCallback(() => {
    const currentUrl = new URL(window.location.href);
    const componentId = currentUrl.searchParams.get(id);

    if (componentId) {
      onOpen();
    } else {
      onClose();
    }
  }, [id, onOpen, onClose]);

  // handle trigger popstate (back)
  useEffect(() => {
    if (isOpen) {
      window.addEventListener("popstate", handlePopState);
    }

    return () => {
      if (isOpen) {
        window.removeEventListener("popstate", handlePopState);
      }
    };
  }, [isOpen, handlePopState]);

  // handle initial onOpen with query parameter
  useEffect(() => {
    const currentUrl = new URL(window.location.href);
    const componentId = currentUrl.searchParams.get(id);

    if (componentId) {
      onOpen();
    } else {
      onClose();
    }
  }, [location, id, onOpen, onClose]);
};

export default useBackOnClose;
