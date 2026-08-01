const useUtils = () => {
  const restart = () => {
    if (typeof window !== "undefined") {
      window.location.reload();
    }
  };
  return { restart };
};

export { useUtils };
