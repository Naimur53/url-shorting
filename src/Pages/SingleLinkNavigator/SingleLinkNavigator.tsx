import React from "react";
import localDb from "../../utilities/localDb";
import NotFound from "../../Components/NotFound/NotFound";

const SingleLinkNavigator = () => {
  const shortLink = window.location.href;
  const { data: link, status } = localDb.getSingleUrlByShortUrl(shortLink);

  if (status === 200) {
    window.location.href = link;
    return (
      <div className="main-height flex justify-center items-center">
        Navigating to {link}
      </div>
    );
  }
  return (
    <div className="main-height">
      <NotFound title="Link Not Found!"></NotFound>
    </div>
  );
  //   return <Navigate to={window.location.pathname}></Navigate>;
};

export default SingleLinkNavigator;
