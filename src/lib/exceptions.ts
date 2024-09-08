export class StatusError extends Error {
  status: number;

  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}

export class RateLimitError extends StatusError {
  constructor() {
    super(429, "Rate limit exceeded");
  }
}
