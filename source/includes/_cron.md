# Cron

## Generate Sessions (Cron Job) 

> **Request**:

> - Header:

```header
  session: next-auth.session-token
  x-api-key: CRON key used to secure APIs
```

> **Response**:

> - Body:

```json
  [
    {
      "id": 170,
      "gameSessionScheduleId": 346,
      "bookingPeriodId": 31,
      "date": "2024-08-06",
      "startTime": "18:00:00",
      "endTime": "20:00:00",
      "locationName": "Kings College",
      "locationAddress": "123 University Road, Auckland",
      "memberCapacity": 40,
      "casualCapacity": 5
    },
    {
      "id": 171,
      "gameSessionScheduleId": 347,
      "bookingPeriodId": 31,
      "date": "2024-08-07",
      "startTime": "18:00:00",
      "endTime": "20:00:00",
      "locationName": "Venue Name",
      "locationAddress": "Address",
      "memberCapacity": 40,
      "casualCapacity": 5
    },
    {
      "id": 172,
      "gameSessionScheduleId": 351,
      "bookingPeriodId": 31,
      "date": "2024-08-08",
      "startTime": "19:30:00",
      "endTime": "22:00:00",
      "locationName": "UoA Sports Center",
      "locationAddress": "7 Wynyard Street, Auckland CBD",
      "memberCapacity": 20,
      "casualCapacity": 3
    }
  ]
```

This endpoint is automatically called by Amazon EventBridge Scheduler, allowing it to populate the database with game-sessions inside of an active semester ahead of time. Returns a JSON containing data on all the sessions that have been created.

### HTTP Request

`POST https://wdcc-uabc-staging.fly.dev/api/cron/generate-sessions`

### Errors

Status Code | Error Code | Message
--------- | ------- | -----------
200 | Ok | No game sessions to insert
201 | Created | null
400 | Bad Request | No active semester found
401 | Unauthorized | Missing or invalid API key
500 | Internal Server Error | Internal server error