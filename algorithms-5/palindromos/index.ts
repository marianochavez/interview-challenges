export default function posiblePalindromo(num: number): boolean {
  const counts: Record<number, number> = {}
  const sortedNumber = num.toString().split('').sort()
  sortedNumber.forEach((num, i) => {
    counts[num] = (counts[num] || 0) + 1;
  })
  const result: number = Object.values(counts).filter(n => n % 2 !== 0).length;

  return result % 2 !== 0 || result === 0;
}
