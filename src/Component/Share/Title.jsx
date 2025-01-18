export const Title = ({ title, para }) => {
  return (
    <div className="my-10 w-11/12 lg:w-8/12 mx-auto text-center">
      <h2 className="text-3xl font-bold mb-4">{title}</h2>
      <p className="font-medium text-gray-600">{para}</p>
    </div>
  );
};
