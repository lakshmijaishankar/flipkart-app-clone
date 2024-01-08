import "./ZoomImage.css";

type ZoomImageProps = {
  src: string;
  altr?: string;
  x?: number;
  y?: number;
};
const ZoomImage = ({ src, altr, x, y }: ZoomImageProps) => {
  return (
    <section className="zoom-image-container">
      <img
        src={src}
        alt={altr}
        className="w-[100%] h-[100%] absolute"
        style={{ transform: `translate3d(${x}px,${y}px,0px)` }}
      />
    </section>
  );
};

export default ZoomImage;
