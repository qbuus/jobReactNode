export default function dateFormat(date) {
  return new Date(date).toLocaleString("en-Us", {
    year: "short",
    month: "short",
    day: "numeric",
    hour: "numeric",
  });
}
