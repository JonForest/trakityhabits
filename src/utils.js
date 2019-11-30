
export function getFormattedDate(dateObj) {
  return  `${dateObj.getFullYear()}-${dateObj.getMonth() + 1}-${dateObj.getDate()}`
}