export interface JsonApiResponse {
  success: boolean;
  data: any;
  errors?: Array<{
    message: string;
    code: number;
  }>;
}
