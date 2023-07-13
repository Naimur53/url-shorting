import useLocalDb from "../../hooks/useLocalDb";
import SingleEditAbleUrl from "./SingleEditAbleUrl/SingleEditAbleUrl";
import NotFound from "../../Components/NotFound/NotFound";
const EditUrls = () => {
  const { allUrl, handleUpdateUrl, handelDeleteUrlByLink } = useLocalDb();

  let content = null;
  if (allUrl.length) {
    content = (
      <div>
        <div className="w-full  ">
          <div className="grid grid-cols-1 md:grid-cols-2 relative z-10 gap-5 mt-5">
            {allUrl.map((single) => (
              <SingleEditAbleUrl
                key={single.shortedLink}
                link={single.link}
                handleUpdateUrl={handleUpdateUrl}
                shortedLink={single.shortedLink}
                handelDeleteUrlByLink={handelDeleteUrlByLink}
              />
            ))}
          </div>
        </div>
      </div>
    );
  } else {
    content = <NotFound title="No url found to edit!"></NotFound>;
  }
  return (
    <div className="main-height">
      <h1 className="text-center pt-3  pb-5 block text-3xl font-bold text-white">
        Edit Urls
      </h1>
      <div className="container ">{content}</div>
    </div>
  );
};

export default EditUrls;
