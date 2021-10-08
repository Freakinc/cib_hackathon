import axios, { AxiosError } from 'axios';
import { getUrl, HOST } from './constants';
import { RequestArguments } from './types';

const networkErrorMessage = 'Нет связи с сервером';

const reqError = (error: AxiosError | Error) => {
  let res = networkErrorMessage;
  if (axios.isAxiosError(error) && error.response) {
    res = error.response.data;
  }
  return res;
};

const get = async <T>({ method, params }: RequestArguments): Promise<T> => {
  const url = getUrl({ method, params }, HOST);
  const response = await axios.get(url).catch((error: Error | AxiosError) => {
    throw new Error(reqError(error));
  });
  const data = response.data;
  return data;
};

const post = async <T>({ method, params, body }: RequestArguments): Promise<T> => {
  const url = getUrl({ method, params }, HOST);
  const response = await axios.post(url, body).catch((error: Error | AxiosError) => {
    throw new Error(reqError(error));
  });
  const data = response.data;
  return data;
};

const put = async <T>({ method, params, body }: RequestArguments): Promise<T> => {
  const url = getUrl({ method, params }, HOST);
  const response = await axios.put(url, body).catch((error: Error | AxiosError) => {
    throw new Error(reqError(error));
  });
  const data = response.data;
  return data;
};

const patch = async <T>({ method, params, body }: RequestArguments): Promise<T> => {
  const url = getUrl({ method, params }, HOST);
  const response = await axios.patch(url, body).catch((error: Error | AxiosError) => {
    throw new Error(reqError(error));
  });
  const data = response.data;
  return data;
};

const deleteRequest = async <T>({ method, params }: RequestArguments): Promise<T> => {
  const url = getUrl({ method, params }, HOST);
  const response = await axios.delete(url).catch((error: Error | AxiosError) => {
    throw new Error(reqError(error));
  });
  const data = response.data;
  return data;
};

export default { get, post, put, delete: deleteRequest, patch };
