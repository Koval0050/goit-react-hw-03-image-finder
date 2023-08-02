import React, { PureComponent } from 'react';

export default class Searchbar extends PureComponent {
  state = {
    value: '',
  };

  handleValue = event => {
    this.setState({ value: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.props.handleQueryOnSubmit(this.state.value); // Передаємо значення інпута в обробник handleQueryOnSubmit
    this.setState({value:''})
  };

  render() {
    return (
      <header className="Searchbar">
        <form className="SearchForm" onSubmit={this.handleSubmit}>
          <button type="submit" className="SearchForm-button">
            <span className="button-label">Search</span>
          </button>

          <input
            onChange={this.handleValue}
            value={this.state.value}
            className="SearchForm-input"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}
