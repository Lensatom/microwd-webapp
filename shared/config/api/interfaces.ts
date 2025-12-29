export interface ApiRes<DataType = null> {
  token: any;
  user(user: any): unknown;
  statusCode: number;
  message: string | null;
  data: DataType;
};

export interface IPOST {
  route: string;
  data: any;
  authorization?: boolean;
  isFormData?: boolean;
  isServer?: boolean;
}

export interface IGET {
  route: string;
  authorization?: boolean;
  isServer?: boolean;
}

export interface IPUT {
  route: string;
  data: any;
  authorization?: boolean;
  isFormData?: boolean;
}

export interface IDELETE {
  route: string;
  data: any;
  authorization?: boolean;
  isFormData?: boolean;
}