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
  const isUrlAlreadyExist = previousData.find(
    (single) => single.link === newData.link
  );
  if (!isUrlAlreadyExist) {
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
  let addStatus: IStatus<IUrl[]> = {
    status: 400,
    message: "Link not found!",
    data: previousData,
  };

  let newUpdatedAllData: IUrl[] = [];
  for (const single of previousData) {
    // checking does this link already exist
    if (single.link === updatableLink) {
      addStatus.message = "Url Already exist";
      addStatus.status = 400;
      newUpdatedAllData = previousData;
      break;
    }

    if (single.link === link) {
      addStatus.message = "Link successfully updated";
      addStatus.status = 200;
      newUpdatedAllData = [
        ...newUpdatedAllData,
        { link: updatableLink, shortedLink: single.shortedLink },
      ];
    } else {
      newUpdatedAllData = [...newUpdatedAllData, single];
    }
  }
  localStorage.setItem(KEY, stringifyData(newUpdatedAllData));

  // update status data
  addStatus.data = newUpdatedAllData;
  return addStatus;
};

const deleteDataByLink = (link: string) => {
  const previousData = getAllData();

  let addStatus: IStatus<IUrl[]> = {
    status: 400,
    message: "Link not found!",
    data: previousData,
  };

  const filterData = previousData.filter((single) => {
    if (single.link !== link) {
      return true;
    }
    addStatus.status = 200;
    addStatus.message = "Link successfully deleted!";
    return false;
  });
  addStatus.data = filterData;
  if (addStatus.status === 200) {
    localStorage.setItem(KEY, stringifyData(filterData));
  }

  return addStatus;
};

const localDb = {
  getAllData,
  addSingleData,
  updateSingleData,
  deleteDataByLink,
  getSingleUrlByShortUrl,
};
export default localDb;
