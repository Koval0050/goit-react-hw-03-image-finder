const apiKey = '38588934-ca3f2fd9066700e445cac814c';

export const fetchImages = async (query, page = 1, perPage = 12) => {
  const baseUrl = 'https://pixabay.com/api/';
  const queryParams = `?q=${encodeURIComponent(
    query
  )}&page=${page}&key=${apiKey}&image_type=photo&orientation=horizontal&per_page=${perPage}`;

  try {
    const response = await fetch(baseUrl + queryParams);
    if (!response.ok) {
      throw new Error('Network response was not ok.');
    }
    const data = await response.json();
    return data.hits; // Повертаємо масив об'єктів з картинками
  } catch (error) {
    console.error('Error fetching images:', error);
    return []; // Повертаємо пустий масив у випадку помилки
  }
};
