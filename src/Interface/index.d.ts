export interface IUrl {
  link: string;
  shortedLink: string;
}

export interface IStatus<T> {
  status: 200 | 400;
  message: string;
  data: T;
}
