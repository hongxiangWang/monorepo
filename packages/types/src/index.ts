export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

export interface ApiResponse<T> {
  code: number;
  data: T;
  message: string;
  success: boolean;
}

export type PaginationParams = {
  page: number;
  pageSize: number;
};

export type PaginationResult<T> = {
  list: T[];
  total: number;
  page: number;
  pageSize: number;
};
