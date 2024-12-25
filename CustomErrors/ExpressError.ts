export default class ExpressError extends Error {
  status: number;
  constructor(message: string, statusCode?: number) {
    super(message);
    this.status = statusCode || 500;
  }
}

export class ExpressMultiError extends ExpressError {
  errors: string[];
  constructor(message: string, statusCode: number, errors: string[]) {
    super(message, statusCode);
    this.errors = errors;
  }
}
