import PropertyCard from '@/components/PropertyCard';
import connectDB from '@/config/database';
import User from '@/models/User';
import { getSessionUser } from '@/utils/getSessionUser';

const SavedPropertiesPage = async () => {
  await connectDB();

  const sessionUser = await getSessionUser();

  const { bookmarks } = await User.findById(sessionUser.userId)
    .populate('bookmarks')
    .lean();

  return (
    <section className="px-4 py-6">
      <div className="container-xl lg:container m-auto px-4 py-6">
        <h1 className="font-bold text-4xl text-center text-blue-700 mb-6">
          Saved Properties
        </h1>
        {bookmarks.length === 0 ? (
          <p className="text-center">No saved properties found</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {bookmarks.map((property) => (
              <PropertyCard key={property._id} property={property} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default SavedPropertiesPage;
