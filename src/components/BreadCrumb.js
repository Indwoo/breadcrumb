import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom';

function BreadCrumb({BreadcrumbClick}) {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter(Boolean);

  const [name, setName] = useState({ species: null, pokemon: null });
  const [isMobile, setIsMobile] = useState(false);

  const [loading, setLoading] = useState({ species: false, pokemon: false });

  useEffect(() => {

    const updateIsMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };

    updateIsMobile();
    window.addEventListener('resize', updateIsMobile);
    return () => window.removeEventListener('resize', updateIsMobile);
  }, []);

  useEffect(() => {
    const fetchName = async () => {
      const spIdx = pathnames.findIndex((x, i) => pathnames[i - 1] === 'species');
      const pkIdx = pathnames.findIndex((x, i) => pathnames[i - 1] === 'pokemons');

      try {
        if (spIdx !== -1) {
          const res = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${pathnames[spIdx]}`);
          const data = await res.json();
          setName(prev => ({ ...prev, species: data.name }));
        }
        if (pkIdx !== -1) {
          const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pathnames[pkIdx]}`);
          const data = await res.json();
          setName(prev => ({ ...prev, pokemon: data.name }));
        }
      } catch (err) {
        console.log('Failed to fetch');
      }
    };

    fetchName();
  }, [location.pathname]);

  const skipName = isMobile && pathnames.length > 3
    ? [pathnames[0], '...', pathnames[pathnames.length - 1]]
    : pathnames;

  return (
    <nav className="flex" aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
        <li className="inline-flex items-center">
          <Link to="/" className="inline-flex items-center text-base font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white">
            <svg className="w-3 h-3 me-2.5" fill="currentColor" viewBox="0 0 20 20">
              <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
            </svg>
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

          const sep = '/' + pathnames.slice(0, i + 1).join('/');
          const last = i === pathnames.length - 1;
          const prev = pathnames[i - 1];

          let text = path;
          if (prev === 'species') {
            text = loading.species
              ? <span className="inline-block h-4 w-20 bg-gray-300 rounded animate-pulse" />
              : (name.species || path);
          }

          if (prev === 'pokemons') {
            text = loading.pokemon
              ? <span className="inline-block h-4 w-20 bg-gray-300 rounded animate-pulse" />
              : (name.pokemon || path);
          }

          if (path === 'species') text = 'Species';
          if (path === 'pokemons') text = 'Pokemons';

          return (
            <li key={sep} aria-current={last ? 'page' : undefined}>
              <div className="flex items-center">
                <svg className="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1" fill="none" viewBox="0 0 6 10">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4" />
                </svg>
                {last ? (
                  <span className="ms-1 text-base font-medium text-gray-500 md:ms-2 dark:text-gray-400">{text}</span>
                ) : (
                  <Link to={sep} onClick={() => {
                    if (BreadcrumbClick) BreadcrumbClick(sep);
                  }} className="ms-1 text-base font-medium text-gray-700 hover:text-blue-600 md:ms-2 dark:text-gray-400 dark:hover:text-white">
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