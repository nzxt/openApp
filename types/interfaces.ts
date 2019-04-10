export interface IRootState {}

export interface IObj {
  id?: number;
  value: string | number;
  text: string;
}
export interface IPagination {
  page: number;
  rowsPerPage: number;
  sortBy: string,
  descending: Boolean,
  totalItems: number;
  totalPages?: number;
  search?: string;
}

export interface IMenuItem {
  icon: string;
  title: string;
  description?: string;
  to: string;
}

export interface IDrawer {
  model: any;
  clipped?: Boolean;
  mini?: Boolean;
  temporary?: Boolean;
  fixed?: Boolean;
  absolute?: Boolean;
}

export interface ILocale {
  code: string;
  file: string;
  flag: string;
  iso: string;
  name: string;
}

export interface IApiService {
  $axios: any;
  $domain: string;
  request: Function;
}
