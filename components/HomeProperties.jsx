import PropertyCard from './PropertyCard';
import Link from 'next/link';
import properties from '@/properties.json';

const HomeProperties = () => {
  const recentProperties = properties.slice(0, 3);
  return (
    <section className="px-4 py-6">
      <div className="container-xl lg:container m-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {recentProperties.map((property) => (
            <PropertyCard key={property._id} property={property} />
          ))}
        </div>
        <Link
          href="/properties"
          className="block bg-black text-white text-center py-4 px-6 rounded-xl hover:bg-gray-700"
        >
          View all properties
        </Link>
      </div>
    </section>
  );
};

export default HomeProperties;
