import Link from 'next/link';

const InfoBox = ({
  title,
  text,
  backgroundColor = 'bg-gray-100',
  textColor = 'text-black',
  buttonProps,
}) => {
  return (
    <div className={`p-6 rounded-lg shadow-md ${backgroundColor} ${textColor}`}>
      <h2 className="text-2xl font-bold">{title}</h2>
      <p className="mt-2 mb-4">{text}</p>
      <Link
        href={buttonProps.link}
        className={`inline-block text-white rounded-lg px-4 py-2 ${buttonProps.styles}`}
      >
        {buttonProps.text}
      </Link>
    </div>
  );
};

export default InfoBox;
