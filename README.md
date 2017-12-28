# boom-hit-miss-target-service

## Description
The service will listen to messages regestering vibrations on a physical hit-miss target.

When a vibration is registered, the service will determine if the vibration_factor is high enough to report a hit.

TODO: When a hit is reported, it will be persisted to the database and a message will be published on the bus

## Listeners / Subscribers
The service will listen on the queue hit-miss-target-event

The hit-miss-target-event messages are json formatted in the following format:

```
{
  "target_type": "hit_miss_target",
  "target_id": "80085",
  "event": "vibration_triggered",
  "vibration_factor": 0.302,
  "timestamp": "2017-12-28 18:16:13"
}
```

## Sent / Published messages
