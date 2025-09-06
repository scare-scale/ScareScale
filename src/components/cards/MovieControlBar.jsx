import React from 'react';

const MovieControlBar = ({ movie }) => {
  const controlBarItems = [
    { name: "Trailers", href: movie.trailersUrl, icon: "/icons/trailers.svg" },
    {
      name: "Watch",
      href: movie.whereToWatchUrl,
      icon: "/icons/watch.svg",
    },
    {
      name: "Add Review",
      href: `/movie/${movie.slug}/review`,
      icon: "/icons/edit.svg",
    },
  ];

  return (
    <div className="w-full mt-4 bg-gray-800/80 backdrop-blur-md shadow-xl rounded-xl border border-gray-700/50 overflow-hidden">
      <ul className="flex flex-row justify-center items-center text-white">
        {controlBarItems.map((item, index) => (
          <li
            key={item.name}
            className={`flex items-center flex-1 ${index < controlBarItems.length - 1 ? "border-r border-gray-700/50" : ""}`}
          >
            <a
              href={item.href}
              className="flex flex-col items-center gap-2 font-semibold hover:text-red-400 transition-all duration-200 hover:scale-105 transform px-6 py-4 rounded-lg hover:bg-white/10 w-full text-center group"
            >
              <img
                src={item.icon}
                alt={`${item.name} Icon`}
                className="w-6 h-6 group-hover:scale-110 transition-transform duration-200"
              />
              <span className="text-sm">{item.name}</span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieControlBar;