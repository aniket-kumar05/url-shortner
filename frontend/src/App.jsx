import axios from "axios";
import React, { useEffect, useState } from "react";

const App = () => {
  const [urls, setUrls] = useState([]);
  const [currentUrl, setCurrentUrl] = useState("");
  const [inputValue, setInputValue] = useState("");
  const fetchUrl = async () => {
    const response = await axios.get("http://localhost:5173/api/url");
    console.log(response.data.data.allUrl);
    setUrls(response.data.data.allUrl);
  };

  useEffect(() => {
    fetchUrl();
  }, []);

  const shortUrl = async () => {
    try {
      const response = await axios.post("http://localhost:5173/api/url", {
        originalUrl: inputValue,
      });

      console.log(response.data);

      setCurrentUrl(response.data.data.shortUrl);

      setInputValue("");

      // Get the newly updated list
      fetchUrl();
    } catch (error) {
      console.log(error);
    }
  };
  const deleteUrl = async (id) => {
    try {
      await axios.delete(`http://localhost:5173/api/url/${id}`);

      fetchUrl();
    } catch (error) {
      console.log(error);
    }
  };
  const copyUrl = async (shortCode) => {
    const shortLink = `http://localhost:5000/api/url/${shortCode}`;

    await navigator.clipboard.writeText(shortLink);

    console.log("Copied:", shortLink);
  };

return (
  <div className="min-h-screen bg-gray-100 px-6 py-10">
    <div className="mx-auto max-w-3xl">

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
          URL Shortener
        </h1>

        <p className="mt-1 text-gray-500">
          Create short links from long URLs.
        </p>
      </div>

      {/* Shorten */}
      <div className="rounded-lg bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-lg font-semibold text-gray-800">
          Shorten URL
        </h2>

        <div className="flex gap-3">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="https://example.com/your-long-url"
            className="flex-1 rounded-md border border-gray-300 px-4 py-2 outline-none focus:border-blue-500"
          />

          <button
            onClick={shortUrl}
            className="rounded-md bg-blue-600 px-5 py-2 font-medium text-white hover:bg-blue-700"
          >
            Shorten
          </button>
        </div>
      </div>

      {/* Newly created URL */}
{currentUrl && (
  <div className="mt-6 rounded-lg bg-white p-6 shadow-sm">
    <h2 className="mb-3 text-lg font-semibold text-gray-800">
      Your Short URL
    </h2>

    <div className="flex items-center gap-3">
      <input
        type="text"
        value={currentUrl}
        readOnly
        className="flex-1 rounded-md border border-gray-300 bg-gray-50 px-4 py-2 text-gray-700 outline-none"
      />

      {/* Copy */}
      <button
        onClick={() =>
          navigator.clipboard.writeText(currentUrl)
        }
        className="rounded-md bg-gray-800 px-4 py-2 text-white hover:bg-gray-900"
      >
        Copy
      </button>

      {/* Open */}
      <a
        href={currentUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
      >
        Open
      </a>
    </div>
  </div>
)}

      {/* All URLs */}
      <div className="mt-6 rounded-lg bg-white p-6 shadow-sm">

        <h2 className="mb-4 text-lg font-semibold text-gray-800">
          Your URLs
        </h2>

        <div className="space-y-3">

          {urls.map((url) => {
            const shortLink =
              `http://localhost:5000/url/${url.shortCode}`;

            return (
              <div
                key={url._id}
                className="flex items-center justify-between rounded-md border border-gray-200 p-4"
              >

                <div className="min-w-0">
                  <p className="font-medium text-blue-600">
                    {shortLink}
                  </p>

                  <p className="mt-1 text-sm text-gray-500">
                    {url.clickCount} clicks
                  </p>
                </div>

                <div className="ml-4 flex gap-2">

                  <button
                    onClick={() => copyUrl(url.shortCode)}
                    className="rounded-md bg-gray-800 px-4 py-2 text-sm text-white hover:bg-gray-900"
                  >
                    Copy
                  </button>

                  <button
                    onClick={() => deleteUrl(url._id)}
                    className="rounded-md bg-red-500 px-4 py-2 text-sm text-white hover:bg-red-600"
                  >
                    Delete
                  </button>

                </div>

              </div>
            );
          })}

          {urls.length === 0 && (
            <p className="py-6 text-center text-gray-500">
              No URLs found.
            </p>
          )}

        </div>
      </div>

    </div>
  </div>
);
};

export default App;
