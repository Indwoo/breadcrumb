import React from 'react'
import BreadCrumb from '../components/BreadCrumb'

function SpeciesOverview() {
  const handleBreadcrumbClick = (path) => {
    console.log(`Breadcrumb Path: ${path}`);
  };

  return (
    <div className="p-4">
      <BreadCrumb BreadcrumbClick={handleBreadcrumbClick} />
    </div>
  );
}

export default SpeciesOverview