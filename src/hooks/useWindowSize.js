import React from "react";

export default function useWindowSize() {
  const [windowSize, setWindowSize] = React.useState({
    width: window.innerWidth
  });

  React.useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth
      });
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowSize;
}
