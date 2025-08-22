import { OrbitingCircles } from "./OrbitingCircles";

export function Frameworks() {
  const skills = [
    "auth0",
    "blazor",
    "cplusplus",
    "csharp",
    "css3",
    "dotnet",
    "dotnetcore",
    "git",
    "html5",
    "javascript",
    "microsoft",
    "react",
    "sqlite",
    "tailwindcss",
    "vitejs",
    "wordpress",
  ];
  const Icon = ({ src }) => (
    <img
      src={src}
      className="duration-200 rounded-sm hover:scale-110"
      alt="Skill Icon"
    />
  );
  return (
    <div className="relative flex h-full w-full items-center justify-center">
      {/* Inner orbit */}
      <OrbitingCircles iconSize={30} radius={100} duration={20}>
        {skills.map((skill, index) => (
          <Icon key={index} src={`assets/logos/${skill}.svg`} />
        ))}
      </OrbitingCircles>

      {/* Outer orbit reversed */}
      <OrbitingCircles iconSize={35} radius={170} reverse duration={15}>
        {[...skills].reverse().map((skill, index) => (
          <Icon key={index} src={`assets/logos/${skill}.svg`} />
        ))}
      </OrbitingCircles>
    </div>
  );
}
export default Frameworks;
