export function formatISO8601Timestamp(isoTimestamp: string) {
  const date = new Date(isoTimestamp);
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear().toString();
  return `${day}.${month}.${year}`;
}
