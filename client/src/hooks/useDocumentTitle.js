import { useEffect } from "react";

// page document title custom hook

const useMetaData = ({ title, description }) => {
  useEffect(() => {
    const usedTitle = document.title;
    const usedDescription = document.querySelector(
      'meta[name="description"]'
    );

    document.title = title;

    if (usedDescription) {
      usedDescription.setAttribute("content", description);
    }

    return () => {
      document.title = usedTitle;
      usedDescription.setAttribute(
        "content",
        "Job portal where you can find your dream it job. Wait no more"
      );
    };
  }, [title, description]);
};

export default useMetaData;
