export default function ripple(elementRef: React.RefObject<HTMLDivElement>) {
  if (elementRef.current) {
    elementRef.current.classList.remove("ripple");
    setTimeout(() => {
      if (elementRef.current) {
        elementRef.current.classList.add("ripple");
      }
    }, 10);
  }
}
