import { twMerge } from "tailwind-merge";
import React from "react";

export function OrbitingCircles({
  className,
  children,
  reverse,
  duration = 20,
  radius = 160,
  path = true,
  iconSize = 30,
  speed = 1,
  ...props
}) {
  const calculatedDuration = duration / speed;
  const childrenArray = React.Children.toArray(children);
  const count = childrenArray.length;

  return (
    <>
      {path && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          version="1.1"
          className="absolute inset-0 pointer-events-none size-full"
        >
          <circle
            className="stroke-1 stroke-white dark:stroke-gray-800"
            cx="50%"
            cy="50%"
            strokeWidth="1"
            r={radius}
            fill="none"
          />
        </svg>
      )}
      {childrenArray.map((child, index) => {
        const angle = (360 / count) * index;
        return (
          <div
            key={index}
            style={{
              "--duration": `${calculatedDuration}s`,
              "--radius": `${radius}px`,
              "--angle": `${angle}deg`,
              "--icon-size": `${iconSize}px`,
              position: "absolute",
              display: "flex",
              width: "var(--icon-size)",
              height: "var(--icon-size)",
              transform: `rotate(var(--angle)) translateX(var(--radius)) rotate(calc(var(--angle) * -1))`,
              transformOrigin: "center",
            }}
            className={twMerge(
              "animate-orbit items-center justify-center rounded-full",
              reverse ? "[animation-direction:reverse]" : "",
              className
            )}
            {...props}
          >
            {child}
          </div>
        );
      })}
    </>
  );
}
