# Bookings

## Retrieve Booking


> **Request**:

> - Header:

```plaintext
  session: next-auth.session-token
```

This endpoint matches the ID of a session booking and returns a JSON file containing information related to it as long as your next-auth session token is valid and the user ID in the session booking matches your own user ID.

### HTTP Request

`GET https://wdcc-uabc-staging.fly.dev/api/bookings/<bookingID>`

### URL Parameters

Parameter | Description
--------- | -----------
bookingID | A string obfuscation of the numerical ID related to a session booking

### Errors

Status Code | Error Code | Message
--------- | ------- | -----------
400 | Bad Request | multiple possible messages e.g. "Invalid bookingId"
401 | Unauthorized | Unauthorized request
403 | Forbidden | Invalid permissions
404 | Not Found | Booking not found
500 | Internal Server Error | Internal server error

## Session Booking

> **Request**:

> - Header:

```header
  session: next-auth.session-token
```

> - Body: (for casuals)

```json
  [
    {
        "gameSessionId": 1,
        "playLevel": "beginner"
    }
  ]
```

> - Body: (for members)

```json
  [
    {
        "gameSessionId": 1,
        "playLevel": "beginner"
    },
    {
        "gameSessionId": 2,
        "playLevel": "intermediate"
    }
  ]
```

> **Response**

> - Body:

```json
  {
    "id": "ewD9scdY"
  }
```


This endpoint allows users to make a session booking as long as none of the sessions have hit maximum capacity. Members of UABC can book 2 sessions, while casuals can only book 1. Returns a JSON containing the obfuscated BookingID.

### HTTP Request

`POST https://wdcc-uabc-staging.fly.dev/api/bookings`

### Errors

Status Code | Error Code | Message
--------- | ------- | -----------
201 | Created | null
400 | Bad Request | multiple possible messages e.g. "Insufficient prepaid sessions, Duplicate game session ids"
401 | Unauthorized | Unauthorized request 
403 | Forbidden | Unverified member
404 | Not Found | User not found
409 | Conflict | Game session at max capacity
500 | Internal Server Error | Internal server error


