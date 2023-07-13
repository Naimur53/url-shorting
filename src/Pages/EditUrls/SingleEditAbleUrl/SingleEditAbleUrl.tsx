import React, { useRef, useState } from "react";
import { IUrl } from "../../../Interface";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const SingleEditAbleUrl = ({
  link,
  shortedLink,
  handleUpdateUrl,
  handelDeleteUrlByLink,
}: ISingleEditAbleUrl) => {
  const [isEditAble, setIsEditable] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const updatableLink = inputRef.current?.value;
    if (!updatableLink) {
      toast.error("Url not found!");
      return;
    }
    handleUpdateUrl(link, updatableLink);
    setIsEditable(false);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  const labelStyle = "mt-4 text-lg font-bold";
  return (
    <div className="w-full p-5 md:py-5  md:px-10 shadow-xl rounded-xl content-box bg-white/50 ">
      <h1 className={labelStyle}>Shorted link: </h1>
      <Link
        to={shortedLink}
        target="_blank"
        className="w-full text-lg hover:underline font-semibold whitespace-pre-wrap break-words text-blue-700 "
      >
        {shortedLink}
      </Link>
      <h1 className={labelStyle}>Link:-</h1>
      {!isEditAble ? (
        <>
          <a
            rel="noreferrer"
            href={link}
            target="_blank"
            className="text-lg hover:underline font-semibold whitespace-pre-wrap break-words text-blue-700 "
          >
            {link}
          </a>
          <div className="flex mt-2 gap-x-5">
            <button onClick={() => setIsEditable(true)} className="btn-blue">
              Edit Link
            </button>
            <button
              onClick={() => handelDeleteUrlByLink(link)}
              className="btn-red"
            >
              Delete
            </button>
          </div>
        </>
      ) : (
        <form onSubmit={handleSubmit}>
          <input
            ref={inputRef}
            type="url"
            required
            placeholder="Enter your link"
            className="w-full border rounded-lg shadow px-3 mt-2 py-3 focus:outline-none"
          />
          <div className="flex mt-2 gap-x-5">
            <button type="submit" className="btn-green">
              Save Link
            </button>
            <button
              onClick={() => setIsEditable(false)}
              type="button"
              className="btn-blue "
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default SingleEditAbleUrl;

interface ISingleEditAbleUrl extends IUrl {
  handleUpdateUrl: (link: string, updatableLink: string) => void;
  handelDeleteUrlByLink: (link: string) => void;
}
