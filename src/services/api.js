const apiKey = '38588934-ca3f2fd9066700e445cac814c';
export const fetchImages = async (searchTerm = '', currentPage = 1) => {
  const response = await fetch(
    `https://pixabay.com/api/?q=${searchTerm}&page=${currentPage}&key=${apiKey}&image_type=photo&orientation=horizontal&per_page=12`
  );
  return await response.json();
};
