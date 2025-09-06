import Link from 'next/link';
import connectDB from '@/config/database';
import Property from '@/models/Property';
import { convertToSerializeableObject } from '@/utils/convertToObject';
import PropertyCard from '@/components/PropertyCard';
import { FaArrowLeft } from 'react-icons/fa';

const SearchResultsPage = async ({ searchParams }) => {
  const { location, propertyType } = await searchParams;
  await connectDB();

  const locationPattern = new RegExp(location, 'i');

  let query = {
    $or: [
      { name: locationPattern },
      { description: locationPattern },
      { 'location.street': locationPattern },
      { 'location.city': locationPattern },
      { 'location.state': locationPattern },
      { 'location.zipcode': locationPattern },
    ],
  };

  if (propertyType && propertyType !== 'All') {
    const typePattern = new RegExp(propertyType, 'i');
    query.type = typePattern;
  }

  const searchResultsDoc = await Property.find(query).lean();
  const searchResults = convertToSerializeableObject(searchResultsDoc);

  return (
    <section className="px-4 py-6">
      <div className="container m-auto py-6 px-6">
        <Link
          href="/properties"
          className="text-blue-500 hover:text-blue-600 flex items-center"
        >
          <FaArrowLeft className="mr-2" /> Back to Properties
        </Link>
      </div>
      <div className="container-xl lg:container m-auto px-4 py-6">
        <h1 className="font-bold text-4xl text-center text-blue-700 mb-6">
          Search Results
        </h1>
        {searchResults.length === 0 ? (
          <p className="text-center">No properties found</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {searchResults.map((property) => (
              <PropertyCard key={property._id} property={property} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default SearchResultsPage;
