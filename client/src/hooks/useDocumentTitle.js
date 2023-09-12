import { useEffect } from "react";

// page document title custom hook

const useDocumentTitle = (title) => {
  useEffect(() => {
    const usedTitle = document.title;

    document.title = title;

    return () => {
      document.title = usedTitle;
    };
  }, [title]);
};

export default useDocumentTitle;
