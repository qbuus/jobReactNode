export default function dateFormat(date) {
  return new Date(date).toLocaleString("en-Us", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}
