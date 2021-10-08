export type ResponseWithPagination<T> = {
  content: T[];
  totalPages: number;
  totalElements: number;
  size: number;
  numberOfElements: number;
};
