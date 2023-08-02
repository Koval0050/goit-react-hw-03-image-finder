// ImageGallery.js
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Notify } from 'notiflix';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import { fetchImages } from 'api';
import Button from 'components/Button/Button';
import Loader from 'components/Loader/Loader';
import Modal from 'components/Modal/Modal';
class ImageGallery extends PureComponent {
  state = {
    images: [],
    currentPage: 1,
    isFirstSearch: true, // Додали стан для відстеження першого пошуку
    loading: false,
    showModal: false,
    imageUrl: '',
  };

  componentDidMount() {
    this.fetchImagesByQuery(this.props.searchQuery);
  }

  componentDidUpdate(prevProps) {
    if (this.props.searchQuery !== prevProps.searchQuery) {
      this.fetchImagesByQuery(this.props.searchQuery);
    }
  }

  fetchImagesByQuery = (query, page = 1) => {
    if (query.trim() === '') {
      this.setState({ images: [], currentPage: 1, isFirstSearch: true });
    } else {
      this.setState({ loading: true });
      fetchImages(query, page)
        .then(data => {
          if (data.length === 0) {
            this.setState({
              isFirstSearch: true,
              loading: false,
            });
            throw new Error();
          }
          this.setState(prevState => ({
            images: page === 1 ? data : [...prevState.images, ...data], // Add fetched images to state based on the page value
            currentPage: page, // Set the currentPage to the current page value
            isFirstSearch: false,
            loading: false,
          }));
        })
        .catch(error => {
          setTimeout(() => {
            Notify.failure(
              'Упс, схоже, зображень з таким запитом не знайдено.'
            );
            this.setState({ loading: false });
          }, 1500);
        });
    }
  };

  handleLoadMore = () => {
    const { searchQuery } = this.props;
    const { currentPage } = this.state;
    this.fetchImagesByQuery(searchQuery, currentPage + 1); // Increment currentPage to fetch the next page
  };

  toggleModal = (imageUrl = '') => {
    this.setState(prevState => ({
      showModal: !prevState.showModal,
      imageUrl: imageUrl, // Set the imageUrl state to the passed imageUrl
    }));
  };

  render() {
    const { images, isFirstSearch, loading, showModal } = this.state;
    return (
      <div>
        <ul className="ImageGallery">
          {images.map(image => (
            <ImageGalleryItem
              key={image.id}
              onClick={() => this.toggleModal(image.webformatURL)}
              imageUrl={image.webformatURL}
            />
          ))}
        </ul>
        {!isFirstSearch ? (
          loading ? (
            <Loader /> // Відображаємо Loader під час завантаження
          ) : (
            <Button onClick={this.handleLoadMore} />
          )
        ) : (
          ''
        )}
        {showModal && (
          <Modal
            imageUrl={this.state.imageUrl}
            onClose={() => this.toggleModal()}
          /> // Pass the toggleModal function as onClose
        )}
      </div>
    );
  }
}

ImageGallery.propTypes = {
  searchQuery: PropTypes.string.isRequired,
};

export default ImageGallery;
