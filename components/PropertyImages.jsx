import Image from 'next/image';

const PropertyImages = ({ images }) => {
  return (
    <section className="bg-blue-50 p-4">
      <div className="container mx-auto">
        {images.length === 1 && (
          <Image
            src={images[0]}
            alt=""
            width={1800}
            height={400}
            priority="true"
            className="object-cover rounded-xl h-[400px] mx-auto"
          />
        )}
        {images.length > 1 && (
          <div className="grid grid-cols-2 gap-4">
            {images.map((image, index) => (
              <Image
                key={index}
                src={image}
                alt=""
                width={1800}
                height={600}
                priority="true"
                className={`object-cover rounded-xl h-[400px] mx-auto ${
                  images.length % 2 === 1 && index === 0
                    ? 'col-span-2'
                    : 'col-span-1'
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default PropertyImages;
