import { useEffect, useState } from "react";
import { IUrl } from "../Interface";
import localDb from "../utilities/localDb";
import { toast } from "react-toastify";
import shortingLink from "../utilities/shortingLink";

const useLocalDb = () => {
  const [allUrl, setAllUrls] = useState<IUrl[]>([]);

  const handleAddNewUrl = (link: string) => {
    const shortedLink = shortingLink(link);
    const { data, message, status } = localDb.addSingleData({
      link,
      shortedLink,
    });
    if (status === 200) {
      setAllUrls(data);
      return {
        link,
        shortedLink,
      };
    } else {
      toast.error(message);
    }
    return {
      link,
      shortedLink: undefined,
    };
  };
  const handleUpdateUrl = (link: string, updatableLink: string): void => {
    const { data, status, message } = localDb.updateSingleData(
      link,
      updatableLink
    );
    if (status === 200) {
      setAllUrls(data);
      toast.success("Url successfully updated");
    } else {
      toast.error(message);
    }
  };
  const handelDeleteUrlByLink = (link: string) => {
    const { data, message, status } = localDb.deleteDataByLink(link);
    if (status === 200) {
      setAllUrls(data);
      toast.success(message);
    } else {
      toast.error(message);
    }
  };

  useEffect(() => {
    //getting all url
    const getAllUrl = localDb.getAllData();
    setAllUrls(getAllUrl);
  }, []);

  return {
    allUrl,
    handleAddNewUrl,
    handleUpdateUrl,
    handelDeleteUrlByLink,
  };
};

export default useLocalDb;
