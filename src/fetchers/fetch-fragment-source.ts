export const fetchFragmentSource = async (url: string) => {
  const response = await fetch(url);
  if (response) return await response.text();
  return null;
};
