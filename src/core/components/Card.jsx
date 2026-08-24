import { motion as Motion } from 'motion/react';
const Card = ({
  style,
  text,
  image,
  icon: Icon,
  containerRef,
  alt,
  ariaLabel,
}) => {
  return (
    <Motion.div
      className="absolute flex items-center justify-center cursor-grab hover:z-50"
      style={style}
      drag
      dragConstraints={containerRef}
      dragElastic={0.2}
      aria-label={ariaLabel || alt || text || 'Draggable tech stack card'}
    >
      {Icon ? (
        <div className="p-3 bg-white/10 backdrop-blur-md border border-white/10 shadow-xl">
          <Icon className="w-8 h-8 sm:w-10 sm:h-10" />
        </div>
      ) : image ? (
        <div className="p-3 bg-white/10 backdrop-blur-md border border-white/10 shadow-xl">
          <img
            className="w-8 h-8 sm:w-10 sm:h-10 object-contain pointer-events-none"
            src={image}
            alt={alt || 'Tech stack icon'}
          />
        </div>
      ) : (
        <div className="px-4 py-2 text-sm sm:text-base text-center bg-white/10 backdrop-blur-md border border-white/10 text-text-primary font-medium shadow-xl">
          {text}
        </div>
      )}
    </Motion.div>
  );
};

export default Card;
