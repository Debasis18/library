"use client";

export default function Error({ error, reset }) {
  return (
    <div className="flex w-full min-h-screen items-center justify-center bg-slate-100 p-6">
      <div className="bg-white shadow-2xl rounded-2xl p-8 max-w-md text-center border border-slate-200">
        <div className="flex justify-center items-center mb-4">
          <svg
            className="w-12 h-12 text-indigo-600"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 9v2m0 4h.01M4.93 4.93a10.005 10.005 0 0114.14 0m0 14.14a10.005 10.005 0 01-14.14 0m14.14-14.14l-14.14 14.14"
            />
          </svg>
        </div>
        <h2 className="text-2xl font-semibold text-indigo-700">
          Oops! Something went wrong
        </h2>
        <p className="text-slate-600 mt-4">{error.message}</p>
        <button
          onClick={reset}
          className="mt-6 px-5 py-2.5 bg-indigo-600 text-white font-medium rounded-lg shadow-md hover:bg-indigo-700 transition-all focus:ring-4 focus:ring-indigo-300"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}
