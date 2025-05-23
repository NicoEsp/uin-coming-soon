
import { Link, useLocation } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";

const Breadcrumb = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  const breadcrumbNameMap: { [key: string]: string } = {
    'privacy-policy': 'Privacy Policy',
  };

  if (pathnames.length === 0) return null;

  return (
    <nav aria-label="Breadcrumb" className="py-4 px-4 sm:px-6 lg:px-8">
      <ol className="flex items-center space-x-2 text-sm text-gray-300">
        <li>
          <Link 
            to="/" 
            className="flex items-center hover:text-uin-purple transition-colors"
            aria-label="Home"
          >
            <Home className="w-4 h-4" />
            <span className="sr-only">Home</span>
          </Link>
        </li>
        {pathnames.map((pathname, index) => {
          const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
          const isLast = index === pathnames.length - 1;
          const breadcrumbName = breadcrumbNameMap[pathname] || pathname.replace('-', ' ');

          return (
            <li key={pathname} className="flex items-center">
              <ChevronRight className="w-4 h-4 mx-2 text-gray-500" />
              {isLast ? (
                <span className="text-white font-medium capitalize" aria-current="page">
                  {breadcrumbName}
                </span>
              ) : (
                <Link 
                  to={routeTo} 
                  className="hover:text-uin-purple transition-colors capitalize"
                >
                  {breadcrumbName}
                </Link>
              )}
            </li>
          );
        })}
      </ol>

      {/* Structured data for breadcrumbs */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            {
              "@type": "ListItem",
              "position": 1,
              "name": "Home",
              "item": "https://uin.tech/"
            },
            ...pathnames.map((pathname, index) => ({
              "@type": "ListItem",
              "position": index + 2,
              "name": breadcrumbNameMap[pathname] || pathname.replace('-', ' '),
              "item": `https://uin.tech/${pathnames.slice(0, index + 1).join('/')}`
            }))
          ]
        })}
      </script>
    </nav>
  );
};

export default Breadcrumb;
