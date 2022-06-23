export default function formatCurrency(value: number) {
  return new Intl.NumberFormat('en-EN', {
    style: 'currency',
    currency: 'USD',
  }).format(value / 100);
}
