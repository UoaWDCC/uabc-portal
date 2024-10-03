export class StatusError extends Error {
  code?: string;
  status: number;

  constructor({
    status,
    message,
    code,
  }: {
    status: number;
    message: string;
    code?: string;
  }) {
    super(message);
    this.status = status;
    this.code = code;
  }
}

export class RateLimitError extends StatusError {
  constructor() {
    super({
      status: 429,
      message: "Rate limit exceeded",
      code: "RATE_LIMIT_EXCEEDED",
    });
  }
}
