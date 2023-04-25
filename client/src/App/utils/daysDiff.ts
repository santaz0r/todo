const daysDiff = (created: string, end: string) => {
  const start = new Date(created) as unknown as number;
  const deadline = new Date(end) as unknown as number;
  const diffTime = Math.abs(deadline - start);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};

export default daysDiff;
