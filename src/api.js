export async function fetchImages(breed) {
  const response = await fetch(
    `https://www.amiiboapi.com/api/amiibo/?gameseries=${breed}`
  );
  const data = await response.json();
  return data.amiibo;
}