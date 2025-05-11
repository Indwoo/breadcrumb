import BreadCrumb from "../components/BreadCrumb";

function Home() {
  const handleBreadcrumbClick = (path) => {
    console.log(`Breadcrumb Path: ${path}`);
  };

  return (
    <div className="p-4">
      <BreadCrumb BreadcrumbClick={handleBreadcrumbClick} />
    </div>
  );
}

export default Home;