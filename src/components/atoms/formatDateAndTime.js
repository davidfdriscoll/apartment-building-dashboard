/*

This function takes a Unix epoch time and returns a consistent human readable date and time

Example:

formatDateAndTime(1617840940000)
Apr 7, 2021, 8:15:40 PM

The function provides consistency across the dashboard and handles some lack of support
for timeStyle and dateStyle in Safari and Firefox.

*/

export default function formatDateAndTime(time) {
  const opts = {
    timeZone: "America/New_York", 
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: "numeric",
    minute: "numeric",
    second: "numeric"
  }
  
  return( new Intl.DateTimeFormat( "en-US", opts ).format(time) ); 
}