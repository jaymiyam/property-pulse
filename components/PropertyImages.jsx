'use client';
import Image from 'next/image';
import { Gallery, Item } from 'react-photoswipe-gallery';

const PropertyImages = ({ images }) => {
  return (
    <Gallery>
      <section className="bg-blue-50 p-4">
        <div className="container mx-auto">
          {images.length === 1 && (
            <Item
              original={images[0]}
              thumbnail={images[0]}
              width="1000"
              height="600"
            >
              {({ ref, open }) => (
                <Image
                  ref={ref}
                  onClick={open}
                  src={images[0]}
                  alt=""
                  width={1800}
                  height={400}
                  priority="true"
                  className="cursor-pointer object-cover rounded-xl h-[400px] mx-auto"
                />
              )}
            </Item>
          )}
          {images.length > 1 && (
            <div className="grid grid-cols-2 gap-4">
              {images.map((image, index) => (
                <Item
                  key={index}
                  original={image}
                  thumbnail={image}
                  width="1000"
                  height="600"
                >
                  {({ ref, open }) => (
                    <Image
                      ref={ref}
                      onClick={open}
                      src={image}
                      alt=""
                      width={1800}
                      height={600}
                      priority="true"
                      className={`cursor-pointer object-cover rounded-xl h-[400px] mx-auto ${
                        images.length % 2 === 1 && index === 0
                          ? 'col-span-2'
                          : 'col-span-1'
                      }`}
                    />
                  )}
                </Item>
              ))}
            </div>
          )}
        </div>
      </section>
    </Gallery>
  );
};

export default PropertyImages;
