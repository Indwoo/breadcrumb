import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom';

function BreadCrumb({ BreadcrumbClick }) {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter(Boolean);

  const [name, setName] = useState({ species: null, pokemon: null });
  const [isMobile, setIsMobile] = useState(window.innerWidth < 640);

  // 모바일 여부 확인
  useEffect(() => {
    const resize = () => setIsMobile(window.innerWidth < 640);
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, []);


  useEffect(() => {
    // API endpoint : /pokemon-species
    const fetchSpeciesName = async (id) => {
      try {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`);
        const data = await res.json();
        setName(prev => ({ ...prev, species: data.name }));
      } catch {
        console.warn('Failed Species Name');
      }
    };

    // API endpoint : /pokemon
    const fetchPokemonName = async (id) => {
      try {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        const data = await res.json();
        setName(prev => ({ ...prev, pokemon: data.name }));
      } catch {
        console.warn('Failed Pokemon Name');
      }
    };

    // URL 추출(species, pokemon)
    const speciesId = pathnames.find((_, i) => pathnames[i - 1] === 'species');
    const pokemonId = pathnames.find((_, i) => pathnames[i - 1] === 'pokemons');

    if (speciesId) fetchSpeciesName(speciesId);
    if (pokemonId) fetchPokemonName(pokemonId);
  }, [location.pathname]);

  // 모바일 경로 생략
  const skipName = isMobile && pathnames.length > 3
    ? [pathnames[0], '...', pathnames[pathnames.length - 1]]
    : pathnames;

  const textRender = (path, index) => {
    const prev = pathnames[index - 1];
    if (prev === 'species') return name.species || path;
    if (prev === 'pokemons') return name.pokemon || path;
    if (path === 'species') return 'Species';
    if (path === 'pokemons') return 'Pokemons';
    return path;
  };

  return (
    <nav className="flex" aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
        <li className="inline-flex items-center">
          <Link to="/" className="inline-flex items-center text-base font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white">
            Home
          </Link>
        </li>

        {skipName.map((path, i) => {
          if (path === '...') {
            return (
              <li key="ellipsis">
                <div className="flex items-center">
                  <span className="mx-2 text-gray-400">...</span>
                </div>
              </li>
            );
          }

          const sep = '/' + pathnames.slice(0, pathnames.indexOf(path) + 1).join('/');
          const last = path === pathnames[pathnames.length - 1];
          const text = textRender(path, pathnames.indexOf(path));

          return (
            <li key={sep} aria-current={last ? 'page' : undefined}>
              <div className="flex items-center">
                <svg className="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1" fill="none" viewBox="0 0 6 10">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4" />
                </svg>
                {last ? (
                  <span className="ms-1 text-base font-medium text-gray-500 md:ms-2 dark:text-gray-400">{text}</span>
                ) : (
                  <Link
                    to={sep}
                    onClick={() => BreadcrumbClick?.(sep)}
                    className="ms-1 text-base font-medium text-gray-700 hover:text-blue-600 md:ms-2 dark:text-gray-400 dark:hover:text-white"
                  >
                    {text}
                  </Link>
                )}
              </div>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

export default BreadCrumb;
