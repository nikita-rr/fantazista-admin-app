export interface IServerError {
  message: string;
  name: string;
  code: string;
  response?: {
    data?: {
      statusCode: number;
      error: string;
      message: string | string[];
    };
  };
}
