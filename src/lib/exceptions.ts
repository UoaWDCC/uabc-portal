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
  constructor(message?: string) {
    super({
      status: 429,
      message: message || "Rate limit exceeded",
      code: "RATE_LIMIT_EXCEEDED",
    });
  }
}
