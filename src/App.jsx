import React from 'react';

import { Searchbar, ImageGallery, Modal, Button, Loader } from './components';
import { fetchImages } from 'services/api';

class App extends React.Component {
  state = {
    images: [],
    currentPage: 1,
    searchTerm: '',
    error: '',
    isFetching: false,
    modal: { isOpen: false, src: '', alt: '' },
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.currentPage !== this.state.currentPage ||
      prevState.searchTerm !== this.state.searchTerm
    ) {
      this.requestImages(this.state.searchTerm, this.state.currentPage);
    }
  }

  requestImages = async (searchTerm, currentPage) => {
    try {
      this.setState(() => ({ isFetching: true }));

      const { hits } = await fetchImages(searchTerm, currentPage);
      if (currentPage === 1) {
        this.setState(() => ({ images: hits }));
      } else {
        this.setState(prevState => ({
          images: [...prevState.images, ...hits],
        }));
      }
    } catch (err) {
      this.setState(() => ({ error: err.message }));
    } finally {
      this.setState(() => ({ isFetching: false }));
    }
  };

  handleSubmitSearchTerm = searchTerm => {
    if (searchTerm.trim() === '') {
      return;
    }
    this.setState(() => ({ searchTerm, currentPage: 1 }));
  };

  handleLoadMore = () => {
    this.setState(prevState => ({ currentPage: prevState.currentPage + 1 }));
  };

  handleOpenModal = (src, alt) => {
    this.setState(() => ({ modal: { isOpen: true, src, alt } }));
  };

  handleCloseModal = () => {
    this.setState(() => ({ modal: { isOpen: false, src: '', alt: '' } }));
  };

  render() {
    const {
      images,
      error,
      isFetching,
      modal: { isOpen, src, alt },
    } = this.state;

    const showLoadMoreBtn = images.length > 0 && !isFetching;
    return (
      <div className="app">
        <Searchbar onSubmit={this.handleSubmitSearchTerm} />
        {isFetching ? <Loader /> : ''}
        <ImageGallery
          error={error}
          isFetching={isFetching}
          images={images}
          openFullScreenMode={this.handleOpenModal}
        />
        {showLoadMoreBtn && <Button onClick={this.handleLoadMore} />}
        {isOpen && (
          <Modal closeModal={this.handleCloseModal}>
            <img className="modalImg" src={src} alt={alt} />
          </Modal>
        )}
      </div>
    );
  }
}

export default App;
