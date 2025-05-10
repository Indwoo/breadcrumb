import React from 'react'
import { useLocation } from 'react-router-dom';

function BreadCrumb() {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  const getPathname = (segment) => {
    switch (segment) {
      case 'species':
        return 'Pokemon Species List';
      case 'pokemons':
        return 'Pokemon List';
      default:
        return segment;
    }
  };

  return (
    <nav>
      <span>Home</span>
      {pathnames.map((segment, i) => (
        <span key={i}> {' > '} {getPathname(segment)}</span>
      ))}
    </nav>
  )
}

export default BreadCrumb