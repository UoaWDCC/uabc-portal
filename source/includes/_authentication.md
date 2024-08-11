# Authentication

## Validate Email

This endpoint takes in a JSON file containing an email address, and consequently sends to the address an email containing a verification code that expires with 3 minutes. This endpoint is usually used in conjuction with the [register](#register) endpoint.

> **Request**:

> - Body:

```json
  {
    "email": "email@address.com"
  }
```

### HTTP Request

`POST https://wdcc-uabc-staging.fly.dev/api/auth/register/validate-email`

### Errors

Status Code | Error Code | Message
--------- | ------- | -----------
204 | No Content | null
400 | Bad Request | multiple possible messages e.g. "Email already in use", "Invalid email address"
500 | Internal Server Error | Internal server error

## Resend Verification Code

> **Request**:

> - Body:

```json
  {
    "email": "email@address.com"
  }
```

This endpoint shares similarities with the [validate email](#validate-email) endpoint. It is used after the validate email endpoint, if users need the verification code resent to their email address. Only difference is that this endpoint accounts for rate limiting if the user sends too many requests.

### HTTP Request

`POST https://wdcc-uabc-staging.fly.dev/api/auth/register/resend-code`

### Errors

Status Code | Error Code | Message
--------- | ------- | -----------
204 | No Content | null
400 | Bad Request | multiple possible messages e.g. "Email already in use", "Invalid email address"
429 | Too Many Requests | Rate limit exceeded
500 | Internal Server Error | Internal server error

## Register

> **Request**:

> - Body:

```json
  {
    "email": "email@address.com"
    "password": "Number1Password"
    "token": "123456"
  }
```

This endpoint registers new users using a unique email address, password and the verification token sent to their email address via the [validate email](#validate-email) endpoint or [resend verification code](#resend-verification-code) endpoint.

### HTTP Request

`POST https://wdcc-uabc-staging.fly.dev/api/auth/register`

### Errors

Status Code | Error Code | Message
--------- | ------- | -----------
200 | OK | User registered successfully
400 | Bad Request | multiple possible messages e.g. "Invalid token", "Invalid email address"
500 | Internal Server Error | Internal server error
