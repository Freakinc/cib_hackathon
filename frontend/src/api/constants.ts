import { RequestArguments } from './types';

export const REMOTE = `https://all-sh-sudiwsa24-proxy.ca.sbrf.ru/pcap360ui/api/planair`;
export const PORT = `80`;
// export const LOCAL = 'http://100.70.74.153:8082/planair';
export const LOCAL = 'http://100.70.89.181:8080/planair';

export const HOST = window.location.hostname === 'localhost' ? LOCAL : REMOTE;
export const BASE_URL = '/cm';

export const getUrl = ({ method, params }: RequestArguments, host: string) => {
  return `${host}/${method}${
    params
      ? '?' +
        Object.entries(params)
          .map((p) => `${p[0]}=${p[1]}`)
          .join('&')
      : ''
  }`;
};
// Determines if local jsons or api endpoints are used for async queries
export const useTrueData = false;
export const PER_PAGE = 5;
