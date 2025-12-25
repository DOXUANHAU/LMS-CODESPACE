export const scrollContainer = (containerRef, direction) => {
  if (containerRef.current) {
    const scrollAmount = direction === "left" ? -432 * 3 : 432 * 3;
    containerRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
  }
};
