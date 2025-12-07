let events: any[] = [];

export function addEvent(e: any) {
  events.unshift(e);
  if (events.length > 50) events.pop();
}

export function getEvents() {
  return events;
}
