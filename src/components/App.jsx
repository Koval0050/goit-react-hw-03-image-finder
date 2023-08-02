import React, { PureComponent } from 'react';
import './styles.css'
import { fetchImages } from 'api';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Loader from './Loader/Loader';


export default class App extends PureComponent {
  state = {
    query: '',
    loading: false,
  };

  handleQueryOnSubmit = query => {
    this.setState({ query, loading: true }); // Встановлюємо loading у true перед початком завантаження зображень
    fetchImages(query)
      .then(data => {
        this.setState({ images: data }); // Зберігаємо зображення в стані
      })
      .catch(error => {
        console.error('Error fetching images:', error);
        this.setState({ images: [] }); // Обробка помилки та очищення стану images у разі неуспішного запиту
      })
      .finally(() => {
        this.setState({ loading: false }); // Встановлюємо loading у false після завершення завантаження
      });
  };

  render() {
    const { query, loading } = this.state;
    return (
      <div className="App">
        <Searchbar handleQueryOnSubmit={this.handleQueryOnSubmit} />
        {loading ? ( // Перевірка стану loading для відображення лоадера або зображень
          <Loader /> // Відображення лоадера, якщо loading === true
        ) : (
          <ImageGallery searchQuery={query} /> // Відображення зображень, якщо loading === false
        )}
      </div>
    );
  }
}
