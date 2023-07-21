import { IStatus, IUrl } from "../Interface";

// key of localStorage
const KEY = "urls";

const parseData = (data: string | null): IUrl[] => {
  try {
    if (data) {
      return JSON.parse(data);
    }
  } catch (error) {
    console.error("Error parsing data:", error);
  }

  return [];
};

const stringifyData = (data: IUrl | IUrl[]): string => {
  return JSON.stringify(data);
};

const isLinkAlreadyExist = (link: string) => {
  const allLink = getAllData();
  return allLink.find(
    (single) => single.link === link || single.shortedLink === link
  );
};

// get all data from db
const getAllData = (): IUrl[] => {
  const data = parseData(localStorage.getItem(KEY));

  if (!data) {
    const defaultValue: IUrl[] = [];
    localStorage.setItem(KEY, stringifyData(defaultValue));
    return defaultValue;
  }

  return data;
};

const getSingleUrlByShortUrl = (shortLink: string): IStatus<string> => {
  const allUrl = getAllData();
  let addStatus: IStatus<string> = {
    status: 200,
    message: "",
    data: "",
  };
  const urlInfo = allUrl.find((single) => single.shortedLink === shortLink);
  if (!urlInfo) {
    addStatus.status = 400;
    addStatus.message = "Link not found";
    return addStatus;
  }
  addStatus.data = urlInfo.link;
  addStatus.message = "Link found successfully";
  return addStatus;
};

const addSingleData = (newData: IUrl): IStatus<IUrl[]> => {
  let previousData: IUrl[] = getAllData();

  let addStatus: IStatus<IUrl[]> = {
    status: 200,
    message: "Link successfully added",
    data: previousData,
  };

  // check is url already exits
  const checkIsLinkAlreadyExist = isLinkAlreadyExist(newData.link);
  if (!checkIsLinkAlreadyExist) {
    const allData = [newData, ...previousData];
    localStorage.setItem(KEY, stringifyData(allData));
    addStatus.data = allData;
    addStatus.message = "Link successfully added";
    return addStatus;
  }

  addStatus.message = "Link already exist";
  addStatus.status = 400;
  return addStatus;
};

const updateSingleData = (link: string, updatableLink: string) => {
  const previousData = getAllData();

  // default status is not found
  let updateStatus: IStatus<IUrl[]> = {
    status: 400,
    message: "Link not found!",
    data: previousData,
  };
  // check is url already exits
  const checkIsLinkAlreadyExist = isLinkAlreadyExist(updatableLink);

  if (checkIsLinkAlreadyExist) {
    updateStatus.message = "Link Already Exist!";
    return updateStatus;
  }

  const newUpdatedAllData = previousData.map((single) => {
    if (single.link === link) {
      updateStatus.message = "Link successfully updated!";
      updateStatus.status = 200;
      return { link: updatableLink, shortedLink: single.shortedLink };
    } else {
      return single;
    }
  });
  localStorage.setItem(KEY, stringifyData(newUpdatedAllData));

  // update status data
  updateStatus.data = newUpdatedAllData;

  return updateStatus;
};

const deleteDataByLink = (link: string) => {
  const previousData = getAllData();

  let deleteStatus: IStatus<IUrl[]> = {
    status: 400,
    message: "Link not found!",
    data: previousData,
  };

  const filterData = previousData.filter((single) => {
    if (single.link !== link) {
      return true;
    }
    deleteStatus.status = 200;
    deleteStatus.message = "Link successfully deleted!";
    return false;
  });

  deleteStatus.data = filterData;

  if (deleteStatus.status === 200) {
    localStorage.setItem(KEY, stringifyData(filterData));
  }

  return deleteStatus;
};

const localDb = {
  getAllData,
  addSingleData,
  updateSingleData,
  deleteDataByLink,
  getSingleUrlByShortUrl,
};
export default localDb;
