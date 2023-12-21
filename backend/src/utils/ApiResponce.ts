class ApiResponse {
  readonly statusCode: number;
  readonly data: object | null;
  readonly success: boolean;
  readonly message: string;

  constructor(statusCode: number, data: object, message = "Success") {
    this.statusCode = statusCode;
    this.data = data;
    this.message = message;
    this.success = statusCode < 400;
  }
}
