import PropertyCard from './PropertyCard';
import Link from 'next/link';
import connectDB from '@/config/database';
import Property from '@/models/Property';

const HomeProperties = async () => {
  await connectDB();
  const recentProperties = await Property.find({})
    .sort({ createdAt: -1 })
    .limit(3)
    .lean();
  return (
    <section className="px-4 py-6">
      <div className="container-xl lg:container m-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {recentProperties.map((property) => (
            <PropertyCard key={property._id} property={property} />
          ))}
        </div>
        <div className="flex justify-center mt-6">
          <Link
            href="/properties"
            className=" bg-black text-white text-center py-4 px-6 rounded-xl hover:bg-gray-700"
          >
            View all properties
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HomeProperties;
