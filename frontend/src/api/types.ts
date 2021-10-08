export type GetByPageArgs = {
  page: number;
  size: number;
  method: string;
};

export type RequestArguments = {
  method: string;
  params?: {
    [key: string]: number | string;
  };
  body?: any;
};
