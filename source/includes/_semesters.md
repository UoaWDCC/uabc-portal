# Semesters

## Get All Semester Information

> **Request**:

> - Header:

```plaintext
  session: next-auth.session-token (needs admin role)
```

> **Response**:

> - Body:

```json
  [
    {
      "id": 137,
      "name": "Semester 2",
      "startDate": "2024-07-15",
      "endDate": "2024-11-11",
      "breakStart": "2024-08-26",
      "breakEnd": "2024-09-06",
      "bookingOpenDay": "Monday",
      "bookingOpenTime": "12:00:00",
      "createdAt": "2024-07-19T01:33:44.692Z"
    },
    {
      "id": 138,
      "name": "Semester 1",
      "startDate": "2025-02-26",
      "endDate": "2025-06-24",
      "breakStart": "2025-03-29",
      "breakEnd": "2025-04-12",
      "bookingOpenDay": "Monday",
      "bookingOpenTime": "12:00:00",
      "createdAt": "2024-07-21T10:58:38.591Z"
    }
  ]
```

This endpoint allows admins to get all the relevant information about all the semesters that exist right now.

### HTTP Request

`GET https://wdcc-uabc-staging.fly.dev/api/semesters`

### Errors

Status Code | Error Code | Message
--------- | ------- | -----------
200 | Ok | null
401 | Unauthorized | ERROR: Unauthorized request
403 | Forbidden | ERROR: No valid permissions
500 | Internal Server Error | Internal server error

## Get Specific Semester Information

> **Request**:

> - Header:

```plaintext
  session: next-auth.session-token (needs admin role)
```

> **Response**:

> - Body:

```json
  {
    "id": 137,
    "name": "Semester 2",
    "startDate": "2024-07-15",
    "endDate": "2024-11-11",
    "breakStart": "2024-08-26",
    "breakEnd": "2024-09-06",
    "bookingOpenDay": "Monday",
    "bookingOpenTime": "12:00:00",
    "createdAt": "2024-07-19T01:33:44.692Z"
  }
```

This endpoint allows admins to get all the relevant information of any semester with the corresponding semesterId. 

### HTTP Request

`GET https://wdcc-uabc-staging.fly.dev/api/semesters/<semesterId>`

### Query Parameters

Query | Description
--------- | -----------
semesterId | Integer representation of semesterId

### Errors

Status Code | Error Code | Message
--------- | ------- | -----------
200 | Ok | null
401 | Unauthorized | ERROR: Unauthorized request
403 | Forbidden | ERROR: No valid permissions
404 | Not Found Error | No semester found for id: `${semesterId}`
500 | Internal Server Error | Internal server error

## Delete Existing Semester

> **Request**:

> - Header:

```plaintext
  session: next-auth.session-token (needs admin role)
```

This endpoint allows admins to delete the semester with the corresponding semesterId.

### HTTP Request

`DELETE https://wdcc-uabc-staging.fly.dev/api/semesters/<semesterId>`

### Query Parameters

Query | Description
--------- | -----------
semesterId | Integer representation of semesterId

### Errors

Status Code | Error Code | Message
--------- | ------- | -----------
204 | No Content | null
401 | Unauthorized | ERROR: Unauthorized request
403 | Forbidden | ERROR: No valid permissions
404 | Not Found | No semester found for id: ${semesterId}``
500 | Internal Server Error | Internal server error

## Edit Existing Semester

> **Request**:

> - Header:

```plaintext
  session: next-auth.session-token (needs admin role)
```

> - Body:

```json
  {
    "name": "Semester 3",
    "startDate": "2026-01-01",
    "endDate": "2026-12-31",
    "breakStart": "2026-05-01",
    "breakEnd": "2026-05-31",
    "bookingOpenDay": "Monday",
    "bookingOpenTime": "01:23:00",
    "createdAt": "2024-08-10T09:11:46.366Z"
  }
```

This endpoint allows admins to edit the semester with the corresponding semesterId.

### HTTP Request

`PUT https://wdcc-uabc-staging.fly.dev/api/semesters/<semesterId>`

### Query Parameters

Query | Description
--------- | -----------
semesterId | Integer representation of semesterId

### Errors

Status Code | Error Code | Message
--------- | ------- | -----------
204 | No Content | null
400 | Bad Request | multiple possible messages e.g. "Start date must be less than end date", "Semesters cannot overlap"
401 | Unauthorized | ERROR: Unauthorized request
403 | Forbidden | ERROR: No valid permissions
500 | Internal Server Error | Internal server error

## Create New Semester

> **Request**:

> - Header:

```plaintext
  session: next-auth.session-token (needs admin role)
```

> - Body:

```json
  {
    "name": "Semester 3",
    "startDate": "2026-01-01",
    "endDate": "2026-12-31",
    "breakStart": "2026-05-01",
    "breakEnd": "2026-05-31",
    "bookingOpenDay": "Sunday",
    "bookingOpenTime": "01:23:00"
  }
```

> **Response**:

> - Body:

```json
  [
    {
      "id": 142,
      "name": "Semester 3",
      "startDate": "2026-01-01",
      "endDate": "2026-12-31",
      "breakStart": "2026-05-01",
      "breakEnd": "2026-05-31",
      "bookingOpenDay": "Sunday",
      "bookingOpenTime": "01:23:00",
      "createdAt": "2024-08-10T07:20:33.714Z"
    }
  ]
```

This endpoint allows admins to create a new Semester.

### HTTP Request

`PUT https://wdcc-uabc-staging.fly.dev/api/semesters`

### Errors

Status Code | Error Code | Message
--------- | ------- | -----------
204 | No Content | null
401 | Unauthorized | ERROR: Unauthorized request
403 | Forbidden | ERROR: No valid permissions
500 | Internal Server Error | Internal server error

## Get All Schedules Related to Existing Semester

> **Request**:

> - Header:

```plaintext
  session: next-auth.session-token
```

> **Response**:

> - Body:

```json
  [
    {
      "id": 358,
      "semesterId": 137,
      "weekday": "Wednesday",
      "startTime": "17:00:00",
      "endTime": "19:00:00",
      "locationName": "Auckland Badminton Association",
      "locationAddress": "99 Gillies Avenue, Epsom",
      "memberCapacity": 40,
      "casualCapacity": 5
    },
    {
      "id": 359,
      "semesterId": 137,
      "weekday": "Thursday",
      "startTime": "19:30:00",
      "endTime": "22:00:00",
      "locationName": "Kings School",
      "locationAddress": "258 Remuera Road, Remuera",
      "memberCapacity": 40,
      "casualCapacity": 5
    },
    {
      "id": 360,
      "semesterId": 137,
      "weekday": "Friday",
      "startTime": "17:00:00",
      "endTime": "19:00:00",
      "locationName": "Auckland Badminton Association",
      "locationAddress": "99 Gillies Avenue, Epsom",
      "memberCapacity": 40,
      "casualCapacity": 5
    }
  ]
```

This endpoint allows users to get all the schedules inside the semester with the corresponding semesterId.

### HTTP Request

`GET https://wdcc-uabc-staging.fly.dev/api/semesters/<semesterId>/schedules`

### Query Parameters

Query | Description
--------- | -----------
semesterId | Integer representation of semesterId

### Errors

Status Code | Error Code | Message
--------- | ------- | -----------
200 | Ok | null
500 | Internal Server Error | Internal server error

## Create New Schedule in an Existing Semester

> **Request**:

> - Header:

```plaintext
  session: next-auth.session-token (needs admin role)
```

> - Body:

```json
  {
    "weekday": "Sunday",
    "startTime": "01:23:00",
    "endTime": "04:56:00",
    "locationName": "Home",
    "locationAddress": "My Bed",
    "memberCapacity": 50,
    "casualCapacity": 50
  }
```

> **Response**:

> - Body:

```json
  [
    {
      "id": 366,
      "semesterId": 143,
      "weekday": "Sunday",
      "startTime": "01:23:00",
      "endTime": "04:56:00",
      "locationName": "Home",
      "locationAddress": "My Bed",
      "memberCapacity": 50,
      "casualCapacity": 50
    }
  ]
```

This endpoint allows admins to create a schedule inside the semester with the corresponding semesterId.

### HTTP Request

`GET https://wdcc-uabc-staging.fly.dev/api/semesters/<semesterId>/schedules`

### Query Parameters

Query | Description
--------- | -----------
semesterId | Integer representation of semesterId

### Errors

Status Code | Error Code | Message
--------- | ------- | -----------
201 | Created | null
401 | Unauthorized | ERROR: Unauthorized request
403 | Forbidden | ERROR: No valid permissions
500 | Internal Server Error | Internal server error
