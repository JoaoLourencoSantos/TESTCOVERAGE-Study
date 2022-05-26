export class ResponseDTO {
  statusCode: number;
  sucess: boolean;
  message: string;
  error: string;
  body: any;

  constructor(message: string, body: any, statusCode: any, sucess: any) {
    this.message = message;
    this.statusCode = statusCode;
    this.sucess = sucess;
    this.body = body;
  }
}
