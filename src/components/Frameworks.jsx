import { OrbitingCircles } from "./OrbitingCircles";

export function Frameworks() {
  const skills = [
    "figma",
    "html5",
    "css3",
    "javascript",
    "react",
    "tailwindcss",
    "node",
    "express",
    "python",
    "git",
    "github",
    "docker",
    "post",
    "jupyter",
    'redis',
    "pandas"
  ];
  return (
      <div className="relative flex h-[15rem] w-full flex-col items-center justify-center">
        <OrbitingCircles iconSize={40}>
          {skills.map((skill, index) => (
              <Icon key={index} src={`assets/logos/${skill}.svg`} alt={skill} />
          ))}
        </OrbitingCircles>
        <OrbitingCircles iconSize={25} radius={100} reverse speed={2}>
          {skills.reverse().map((skill, index) => (
              <Icon key={index} src={`assets/logos/${skill}.svg`} alt={skill} />
          ))}
        </OrbitingCircles>
      </div>
  );
}

const Icon = ({ src, alt }) => (
    <img src={src} alt={alt} className="duration-200 rounded-sm hover:scale-110" />
);