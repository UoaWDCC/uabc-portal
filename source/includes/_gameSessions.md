# Game Sessions

## Get Game Session Info

> **Request**:

> - Header:

```header
  session: next-auth.session-token
```

> **Response**:

> Body:

```json
  {
    "id": 156,
    "gameSessionScheduleId": 346,
    "bookingPeriodId": 29,
    "date": "2024-07-23",
    "startTime": "18:00:00",
    "endTime": "20:00:00",
    "locationName": "Kings College",
    "locationAddress": "123 University Road, Auckland",
    "memberCapacity": 1,
    "casualCapacity": 5
  }
```

This endpoint allows users to get all the relevant information of any game session with a corresponding gameSessionId.

### HTTP Request

`GET https://wdcc-uabc-staging.fly.dev/api/game-sessions/<gameSessionId>`

### URL Parameters

Parameter | Description
--------- | -----------
gameSessionID | Integer representation of gameSessionID

### Errors

Status Code | Error Code | Message
--------- | ------- | -----------
204 | No Content | null
400 | Bad Request | multiple possible messages e.g. "Invalid id provided in the request", "Start time must be less than end time"
404 | Not Found | No Game Session found with id: `${gameSessionId}`
500 | Internal Server Error | Internal server error

## Edit Existing Game Session

> **Request**:

> - Header:

```header
  session: next-auth.session-token (needs admin role)
```

> - Body:

```json
  {
    "id": 170,
    "gameSessionScheduleId": 346,
    "bookingPeriodId": 31,
    "date": "2024-08-06",
    "startTime": "19:00:00",
    "endTime": "20:00:00",
    "locationName": "Kings College",
    "locationAddress": "123 University Road, Auckland",
    "memberCapacity": 40,
    "casualCapacity": 5
  }
```

This endpoint allows admins to update an existing game session.

### HTTP Request

`PUT https://wdcc-uabc-staging.fly.dev/api/game-sessions/<gameSessionId>`

### URL Parameters

Parameter | Description
--------- | -----------
gameSessionID | Integer representation of gameSessionID

### Errors

Status Code | Error Code | Message
--------- | ------- | -----------
204 | No Content | null
400 | Bad Request | multiple possible messages e.g. "Invalid id provided in the request", "Start time must be less than end time"
403 | Forbidden | Access denied
404 | Not Found | No Game Session found with id: `${gameSessionId}`
500 | Internal Server Error | Internal server error

## Delete Game Session

> **Request**:

> - Header:

```header
  session: next-auth.session-token (needs admin role)
```

This endpoint allows admins to delete existing game sessions.

### HTTP Request

`DELETE https://wdcc-uabc-staging.fly.dev/api/game-sessions/<gameSessionId>`

### URL Parameters

Parameter | Description
--------- | -----------
gameSessionID | Integer representation of gameSessionID

### Errors

Status Code | Error Code | Message
--------- | ------- | -----------
204 | No Content | null
400 | Bad Request | Invalid id provided in the request
404 | Not Found | Game session with id `${gameSessionId}` does not exist.
500 | Internal Server Error | Internal server error

## Download Attendees List 

> **Request**:

> - Header:

```header
  session: next-auth.session-token (needs admin role)
```

This endpoint allows admins to download the list of all attendees of a session as a CSV. The CSV contains details of their first name, last name, email, play level, and if they are a member/pro or not. 

### HTTP Request

`GET https://wdcc-uabc-staging.fly.dev/api/game-sessions/<gameSessionId>/download`

### URL Parameters

Parameter | Description
--------- | -----------
gameSessionID | Integer representation of gameSessionID

### Errors

Status Code | Error Code | Message
--------- | ------- | -----------
200 | Ok | null
400 | Bad Request | Invalid id provided in the request
401 | Unauthorized | ERROR: Unauthorized request
403 | Forbidden | ERROR: No valid permissions
404 | Not Found | No Game Session found with id: `${gameSessionId}`
500 | Internal Server Error | Internal server error

## Get Active Dates (Dates with Game Sessions)

> **Request**:

> - Header:

```header
  session: next-auth.session-token (needs admin role)
```

> **Response**:

> - Body (between `?start-date=2024-08-25&end-date=2024-10-07`):

```json
  [
    "2024-09-11",
    "2024-09-12",
    "2024-09-17",
    "2024-09-18",
    "2024-09-19",
    "2024-09-24",
    "2024-09-25",
    "2024-09-26"
  ] 
```

This endpoint gets all the active dates with game sessions between a given start and end date. It returns the string dates in the format "yyyy-mm-dd" in a list.

### HTTP Request

`GET https://wdcc-uabc-staging.fly.dev/api/game-sessions/active-dates`

### Query Parameters

Query | Description
--------- | -----------
start-date | starting date in the format yyyy-mm-dd
end-date | ending date in the format yyyy-mm-dd

### Errors

Status Code | Error Code | Message
--------- | ------- | -----------
200 | Ok | null
400 | Bad Request | Bad Request
401 | Unauthorized | ERROR: Unauthorized request
403 | Forbidden | ERROR: No valid permissions

## Get Current Game Sessions 

> **Response**:

> - Body:

```json
  [
    {
      "id": 167,
      "date": "2024-07-30",
      "startTime": "18:00:00",
      "endTime": "19:00:00",
      "locationName": "Kings College",
      "locationAddress": "123 University Road, Auckland",
      "memberCapacity": 40,
      "casualCapacity": 5,
      "memberBookingCount": 1,
      "casualBookingCount": 0
    },
    {
      "id": 168,
      "date": "2024-07-31",
      "startTime": "18:00:00",
      "endTime": "20:00:00",
      "locationName": "Kings College",
      "locationAddress": "123 University Road, Auckland",
      "memberCapacity": 40,
      "casualCapacity": 5,
      "memberBookingCount": 0,
      "casualBookingCount": 0
    },
    {
      "id": 169,
      "date": "2024-08-01",
      "startTime": "19:30:00",
      "endTime": "22:00:00",
      "locationName": "UoA Sports Center",
      "locationAddress": "7 Wynyard Street, Auckland CBD",
      "memberCapacity": 20,
      "casualCapacity": 3,
      "memberBookingCount": 0,
      "casualBookingCount": 0
    }
  ]
```

This endpoint gets all the sessions which you can currently book a spot for. Returns a list of JSON's containing each sessions information.

### HTTP Request

`GET https://wdcc-uabc-staging.fly.dev/api/game-sessions/current`

### Errors

Status Code | Error Code | Message
--------- | ------- | -----------
200 | Ok | null
500 | Internal Server Error | Internal Server Error: `${error}`

## Get Game Session Information for a specific date

> **Request**:

> - Header:

```header
  session: next-auth.session-token (needs admin role)
```

> **Response**:

> - Body (if there does not exist a game session):

```json
  {
    "exists": false,
    "canCreate": true,
    "message": "No game session found for this date",
    "data": {
      "semesterName": "Semester 2",
      "bookingOpen": "2024-08-05T00:00:00.000Z"
    }
  }
```

> - Body (if there exists a game session)

```json
  {
    "exists": true,
    "canCreate": true,
    "data": {
      "id": 171,
      "gameSessionScheduleId": 347,
      "bookingPeriodId": 31,
      "date": "2024-08-07",
      "startTime": "18:00:00",
      "endTime": "20:00:00",
      "locationName": "Venue Name",
      "locationAddress": "Address",
      "memberCapacity": 40,
      "casualCapacity": 5,
      "bookingOpen": "2024-08-05T00:00:00.000Z",
      "attendees": 0
    }
  }
```

This endpoint allows admins to check if there exists a game session on a specific date. If there does, then the endpoint returns a JSON containing the data of the existing game session.

### HTTP Request

`GET https://wdcc-uabc-staging.fly.dev/api/game-sessions`

### Query Parameters

Query | Description
--------- | -----------
date | date in the format yyyy-mm-dd

### Errors

Status Code | Error Code | Message
--------- | ------- | -----------
200 | Ok | null
400 | Bad Request | Bad Request
401 | Unauthorized | ERROR: Unauthorized request
403 | Forbidden | ERROR: No valid permissions
404 | Not Found | multiple possible messages e.g. "No ongoing semester found for this date", "No game session found for this date"
500 | Internal Server Error | Internal server error
