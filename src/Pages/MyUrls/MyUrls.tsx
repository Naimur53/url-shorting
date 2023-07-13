import NotFound from "../../Components/NotFound/NotFound";
import useLocalDb from "../../hooks/useLocalDb";
import { Link } from "react-router-dom";

const MyUrls = () => {
  const { allUrl } = useLocalDb();
  let content = null;
  if (allUrl.length) {
    content = (
      <div className="grid grid-cols-1 md:grid-cols-2  gap-[10px]">
        {allUrl.map((single) => (
          <div
            className="content-box py-5 shadow-2xl  px-5 rounded-xl bg-white/50"
            key={single.shortedLink}
          >
            <h1 className="text-xl font-semibold mb-1">Shorted Link:-</h1>
            <Link
              target="_blank"
              className="text-blue-600 break-words text-lg md:text-xl hover:underline"
              to={single.shortedLink}
            >
              {single.shortedLink}
            </Link>
            <h1 className="text-xl font-semibold mb-1 mt-4">Link:-</h1>
            <p className="font-semibold text-lg whitespace-pre-wrap break-words">
              {single.link}
            </p>
          </div>
        ))}
      </div>
    );
  } else {
    content = <NotFound title="No Urls Found!"></NotFound>;
  }
  return (
    <div className="main-height">
      <div className="container">
        <h2 className="mt-4 text-3xl text-center mb-10 font-bold text-white">
          All Urls
        </h2>
        {content}
      </div>
    </div>
  );
};

export default MyUrls;
