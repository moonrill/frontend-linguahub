function formatDate(dateString: string): string {
  const date = new Date(dateString);

  const day = date.getUTCDate();
  const month = date.toLocaleString('default', { month: 'long' });
  const year = date.getUTCFullYear();
  const hours = date.getUTCHours().toString().padStart(2, '0');
  const minutes = date.getUTCMinutes().toString().padStart(2, '0');

  return `${day} ${month} ${year}, ${hours}:${minutes}`;
}

export default formatDate;
