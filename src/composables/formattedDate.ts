export const formattedDate = (date: string) => {
  const options = {year: 'numeric', month: '2-digit', day: '2-digit'};
  return new Date(date).toLocaleDateString('en-US', options).replace(/\//g, '.');
}
