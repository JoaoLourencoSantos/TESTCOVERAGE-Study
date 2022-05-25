export class RequiredParametersException extends Error {
  constructor(public message: string) {
    super(message);
    this.name = 'RequiredParametersException';
    this.stack = new Error().stack;
  }
}
