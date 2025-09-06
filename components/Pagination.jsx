import Link from 'next/link';

const Pagination = ({ page, pageSize, total }) => {
  const pageCount = Math.ceil(total / pageSize);

  return (
    <section className="container mx-auto flex justify-center items-center my-8 gap-4">
      {page > 1 && (
        <Link
          href={`/properties?page=${page - 1}&pageSize=${pageSize}`}
          className="border border-gray-300 rounded-md px-4 py-2 cursor-pointer hover:bg-gray-50"
        >
          Previous
        </Link>
      )}
      <span>
        Page {page} of {pageCount}
      </span>
      {page < pageCount && (
        <Link
          href={`/properties?page=${page + 1}&pageSize=${pageSize}`}
          className="border border-gray-300 rounded-md px-4 py-2 cursor-pointer hover:bg-gray-50"
        >
          Next
        </Link>
      )}
    </section>
  );
};

export default Pagination;
