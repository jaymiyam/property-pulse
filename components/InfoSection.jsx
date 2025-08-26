import InfoBox from './InfoBox';

const InfoSection = () => {
  return (
    <section>
      <div className="container-xl lg:container m-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-lg">
          <InfoBox
            title="For Renters"
            text="Find your dream rental property. Bookmark properties and contact
              owners."
            buttonProps={{
              link: '/properties',
              styles: 'bg-black hover:bg-gray-700',
              text: 'Browse Properties',
            }}
          />
          <InfoBox
            title="For Property Owners"
            text="List your properties and reach potential tenants. Rent as an airbnb or long term."
            backgroundColor="bg-blue-200"
            textColor="text-blue-900"
            buttonProps={{
              link: '/properties/add',
              styles: 'bg-blue-500 hover:bg-blue-600',
              text: 'Add Property',
            }}
          />
        </div>
      </div>
    </section>
  );
};

export default InfoSection;
