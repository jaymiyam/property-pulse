import Pagination from '@/components/Pagination';
import PropertyCard from '@/components/PropertyCard';
import connectDB from '@/config/database';
import Property from '@/models/Property';

const PropertiesPage = async ({ searchParams }) => {
  const params = await searchParams;
  const page = params.page || '1';
  const pageSize = params.pageSize || '2';
  const skip = (parseInt(page) - 1) * parseInt(pageSize);
  const total = await Property.countDocuments({});

  const showPagination = total > pageSize;

  await connectDB();
  const properties = await Property.find({}).skip(skip).limit(pageSize).lean();

  return (
    <section className="px-4 py-6">
      <div className="container-xl lg:container m-auto px-4 py-6">
        <h1 className="font-bold text-4xl text-center text-blue-700 mb-6">
          All Properties
        </h1>
        {properties.length === 0 ? (
          <p className="text-center">No properties found</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {properties.map((property) => (
              <PropertyCard key={property._id} property={property} />
            ))}
          </div>
        )}
      </div>
      {showPagination && (
        <Pagination
          page={parseInt(page)}
          pageSize={parseInt(pageSize)}
          total={total}
        />
      )}
    </section>
  );
};

export default PropertiesPage;
