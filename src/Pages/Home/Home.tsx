import React, { useRef, useState } from "react";
import useLocalDb from "../../hooks/useLocalDb";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const Home = () => {
  const { handleAddNewUrl } = useLocalDb();
  const inputRef = useRef<HTMLInputElement>(null);
  const [shortLink, setShortLink] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const link = inputRef.current?.value;
    if (!link) {
      toast.error("Something went wrong");
      return;
    }
    const generatedLink = handleAddNewUrl(link);
    if (generatedLink.shortedLink) {
      setShortLink(generatedLink.shortedLink);
    }
    inputRef.current.value = "";
  };

  let content = null;

  if (shortLink) {
    content = (
      <div className="md:w-[80%] px-4 ">
        <h2 className="text-xl font-semibold">Generated Link</h2>
        <Link
          to={shortLink}
          target="_blank"
          className="mt-1 inline-block  transition-all hover:text-blue-500 hover:underline font-bold "
        >
          {shortLink}
        </Link>
        <div>
          <button className="btn-blue" onClick={() => setShortLink("")}>
            Short Another Link
          </button>
        </div>
      </div>
    );
  } else {
    content = (
      <form onSubmit={handleSubmit}>
        <label className="block capitalize text-xl font-semibold mb-2">
          Short your Long link!
        </label>
        <input
          ref={inputRef}
          placeholder="Enter your link"
          required
          className="shadow-md focus:outline-none  border px-2 rounded-md  w-[250px] md:w-[400px] h-[50px] "
          type="url"
        />
        <div>
          <button type="submit" className=" btn-blue ">
            Short It
          </button>
        </div>
      </form>
    );
  }
  return (
    <div className="main-height flex justify-center items-center">
      <div className="-translate-y-[56px]">
        <div className="w-[300px] md:w-[500px] h-[200px] md:h-[250px] rounded-xl flex justify-center items-center content-box  ">
          {content}
        </div>
      </div>
    </div>
  );
};

export default Home;
