const extractHeight = (weight: string): number | null => {
  const match = weight.match(/^([\d.]+)m$/); // Matches a number followed by 'kg'
  return match ? parseFloat(match[1]) : null; // Returns the number or null if no match
};

export default extractHeight;
