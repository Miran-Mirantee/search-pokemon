const extractWeight = (weight: string): number | null => {
  const match = weight.match(/^([\d.]+)kg$/); // Matches a number followed by 'kg'
  return match ? parseFloat(match[1]) : null; // Returns the number or null if no match
};

export default extractWeight;
