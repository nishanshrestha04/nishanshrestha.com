import { motion as Motion } from "motion/react";
const Card = ({ style, text, image, containerRef, alt, ariaLabel }) => {
  return image && !text ? (
    <Motion.img
      className="absolute w-12 sm:w-15 cursor-grab" // reduced size for small devices
      src={image}
      alt={alt || "Tech stack icon"}
      style={style}
      whileHover={{ scale: 1.05 }}
      drag
      dragConstraints={containerRef}
      dragElastic={1}
      aria-label={ariaLabel || alt || "Draggable tech stack icon"}
    />
  ) : (
    <Motion.div
      className="absolute px-1 py-2 sm:py-4 text-base sm:text-xl text-center rounded-full ring ring-gray-700 font-extralight bg-storm w-32 sm:w-48 cursor-grab" // smaller text and width for small devices
      style={style}
      whileHover={{ scale: 1.05 }}
      drag
      dragConstraints={containerRef}
      dragElastic={1}
      aria-label={ariaLabel || text || "Draggable tech stack card"}
    >
      {text}
    </Motion.div>
  );
};

export default Card;
