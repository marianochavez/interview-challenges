export default function stringTerminaCon(
  string: string,
  final: string
): boolean {
  const slicedString = string.slice(-final.length)
  return slicedString === final;
}
