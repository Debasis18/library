const UserBookDetails = ({ details }) => {
  return (
    <div className="w-full max-w-lg border rounded-xl p-6">
      <h2 className="text-xl font-semibold text-gray-800">
        {details.userName}
      </h2>
      <div className="mt-2 text-gray-600 space-y-1">
        <p>
          <span className="font-medium text-gray-700">Library ID:</span>{" "}
          {details.userId}
        </p>
        <p>
          <span className="font-medium text-gray-700">Email:</span>{" "}
          {details.userEmail}
        </p>
      </div>

      <hr className="my-4 border-gray-300" />
      <div>
        <h3 className="text-lg font-semibold text-gray-800">
          Book Description
        </h3>
        <p className="text-gray-700 mt-2">{details.description}</p>
      </div>
    </div>
  );
};

export default UserBookDetails;
