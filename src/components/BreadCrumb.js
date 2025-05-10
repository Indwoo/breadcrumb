import React from 'react'
import { Link, useLocation } from 'react-router-dom';

function BreadCrumb() {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  const getPathname = (segment, index) => {
    const prev = pathnames[index - 1];

    switch (segment) {
      case 'species':
        return 'Pokemon Species List';
      case 'pokemons':
        return 'Pokemon List';
      default:
        if (prev === 'species') return `species-${segment}`;
        if (prev === 'pokemons') return `pokemon-${segment}`;
        return segment;
    }
  };

  return (
    <nav>
      <Link to="/">Home</Link>
      {pathnames.map((segment, i) => {
        const to = '/' + pathnames.slice(0, i + 1).join('/');
        const isLast = i === pathnames.length - 1;

        return (
          <span key={to}>
            {' > '}
            {isLast ? (
              <span>{getPathname(segment)}</span>
            ) : (
              <Link to={to}>{getPathname(segment)}</Link>
            )}
          </span>
        );
      })}
    </nav>
  )
}

export default BreadCrumb