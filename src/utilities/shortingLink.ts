import { IUrl } from "../Interface";
function getRandomString() {
  const random_string =
    Math.random().toString(32).substring(2, 5) +
    Math.random().toString(32).substring(2, 5);
  return random_string;
}
const shortingLink = (link: string): string => {
  console.log();
  // https:// or http://
  const host = window.location.host;
  const httpProtocol = window.location.protocol;
  const uniqLink = getRandomString();
  const shortedLink = `${httpProtocol}//${host}/${uniqLink}`;

  return shortedLink;
};

export default shortingLink;
