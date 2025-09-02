import connectDB from '@/config/database';
import Property from '@/models/Property';
import Image from 'next/image';
import Link from 'next/link';
import PropertyDetails from '@/components/PropertyDetails';
import { FaArrowLeft } from 'react-icons/fa';
import PropertyImages from '@/components/PropertyImages';

const PropertyPage = async ({ params }) => {
  await connectDB();
  const { id } = await params;
  const property = await Property.findById(id).lean();

  if (!property) {
    return (
      <h1 className="text-center text-2xl font-bold mt-10">
        Property Not Found
      </h1>
    );
  }

  return (
    <>
      <header>
        <div className="container-xl m-auto">
          <div className="grid grid-cols-1">
            <Image
              src={property.images[0]}
              alt=""
              className="object-cover h-[400px] w-full"
              width={0}
              height={0}
              sizes="100vw"
              priority={true}
            />
          </div>
        </div>
      </header>
      <section>
        <div className="container m-auto py-6 px-6">
          <Link
            href="/properties"
            className="text-blue-500 hover:text-blue-600 flex items-center"
          >
            <FaArrowLeft className="mr-2" /> Back to Properties
          </Link>
        </div>
      </section>
      <section className="bg-blue-50">
        <div className="container m-auto py-10 px-6">
          <div className="grid grid-cols-1 md:grid-cols-[70%_28%] w-full gap-6">
            <PropertyDetails property={property} />
          </div>
        </div>
      </section>
      <PropertyImages images={property.images} />
    </>
  );
};

export default PropertyPage;
