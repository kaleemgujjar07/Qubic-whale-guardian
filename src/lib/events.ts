const DUMMY_EVENTS = [
  {
    id: Date.now() - 90000,
    type: "Large Transfer",
    wallet: "0xABCDEF1234567890abcdef1234567890ABCDEF12",
    amount: 5_000_000,
    timestamp: new Date(Date.now() - 90000).toISOString(),
  },
  {
    id: Date.now() - 75000,
    type: "Whale Movement",
    wallet: "0x1234567890ABCDEF1234567890abcdefABCDEF12",
    amount: 3_500_000,
    timestamp: new Date(Date.now() - 75000).toISOString(),
  },
  {
    id: Date.now() - 60000,
    type: "Exchange Transfer",
    wallet: "0xFEDCBA0987654321fedcba0987654321FEDCBA09",
    amount: 2_250_000,
    timestamp: new Date(Date.now() - 60000).toISOString(),
  },
  {
    id: Date.now() - 45000,
    type: "Vault Deposit",
    wallet: "0x9876543210FEDCBA9876543210fedcba98765432",
    amount: 1_800_000,
    timestamp: new Date(Date.now() - 45000).toISOString(),
  },
  {
    id: Date.now() - 30000,
    type: "Pool Transfer",
    wallet: "0xBEEFCAFE1234567890abcdef1234567890BEEFCAFE",
    amount: 4_200_000,
    timestamp: new Date(Date.now() - 30000).toISOString(),
  },
  {
    id: Date.now() - 15000,
    type: "Whale Movement",
    wallet: "0x0123456789ABCDEF0123456789abcdef01234567",
    amount: 2_900_000,
    timestamp: new Date(Date.now() - 15000).toISOString(),
  },
];

let events: any[] = [...DUMMY_EVENTS];

export function addEvent(e: any) {
  events.unshift(e);
  if (events.length > 50) events.pop();
}

export function getEvents() {
  return events;
}
