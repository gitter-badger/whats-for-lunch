import React from 'react';
import RestaurantDetails from './RestaurantDetails'
import { submitFormAsJson } from './App'

class Details extends React.Component {
  setMessagePositions() {
    const messageTwo = document.querySelector('.welcome-message-2')
    const messageThree = document.querySelector('.welcome-message-3')
    if(messageTwo && messageTwo.style.display !== 'none') {
      const searchMiddle = document.querySelector('.search-container > div:first-child').getBoundingClientRect().bottom;
      const messageTwoTop = messageTwo.getBoundingClientRect().top;
      messageTwo.style.paddingTop = searchMiddle - messageTwoTop - 20 + 'px';
    }
    if(messageThree && messageThree.style.display !== 'none') {
      const mapTop = document.querySelector('.map-container').getBoundingClientRect().top;
      const messageThreeTop = messageThree.getBoundingClientRect().top;
      messageThree.style.paddingTop = mapTop - messageThreeTop - 10 + 'px';
    }
  }

  submitForm(event) {
    event.preventDefault();
    submitFormAsJson(event.target);
  }

  componentDidMount() {
    this.setMessagePositions();
  }

  componentDidUpdate(){
    this.setMessagePositions()
  }

  render() {
    if (this.props.place !== undefined) {
      let photo = this.props.place.photo;
      if (this.props.place.photos) {
        photo = this.props.place.photos[0].getUrl();
      }
      return (
        <div className="google-details">
          <img key="detail-photo" className="photo" alt="Restaurant" src={photo} />
          <h2 key="detail-name">{this.props.place.name}</h2>
          <RestaurantDetails place={this.props.place} />
          <div key="detail-address" className="detail-item">
            <img className="detail-icon" alt="Address" src="//www.gstatic.com/images/icons/material/system_gm/2x/place_gm_blue_24dp.png" />
            <a className="address" target="_blank" rel="noopener noreferrer" href={this.props.place.url}>{this.props.place.formatted_address}</a>
          </div>
          {this.props.place.vote_count === undefined ?
            <form key="detail-form" className="location-form" action="location" onSubmit={this.submitForm}>
              <input type="hidden" name="name" value={this.props.place.name}></input>
              <input type="hidden" name="rating" value={this.props.place.rating}></input>
              <input type="hidden" name="user_ratings_total" value={this.props.place.user_ratings_total}></input>
              <input type="hidden" name="price_level" value={this.props.place.price_level}></input>
              <input type="hidden" name="url" value={this.props.place.url}></input>
              <input type="hidden" name="website" value={this.props.place.website}></input>
              <input type="hidden" name="formatted_address" value={this.props.place.formatted_address}></input>
              <input type="hidden" name="photo" value={photo}></input>
              <button className="detail-button">Add to Lunch Suggestions!</button>
            </form>
            :
            ""
          }
        </div>
      )
    } else {
      const messageOneStyle = {
        display: 'none',
      };
      if (document.querySelector('.suggestions-container').children.length > 0) {
        messageOneStyle.display = '';
      }
      const messageThreeStyle = {
        display: 'none',
      };
      if (document.querySelector('#results').children.length > 0) {
        messageThreeStyle.display = '';
      }
      return [
          <div key="welcome-message-1" className="details-welcome-div welcome-message-1" style={messageOneStyle}>
            <h3>🡠</h3>
            <h3>Vote for your preferred restaurant with the up and down arrows!</h3>
          </div>,
          <div key="welcome-message-2" className="details-welcome-div welcome-message-2">
            <h3>🡠</h3>
            <h3>Add a new restaurant or search for one!</h3>
          </div>,
          <div key="welcome-message-3" className="details-welcome-div welcome-message-3" style={messageThreeStyle}>
            <h3>🡠</h3>
            <h3>Click a listing in the table to see its details!</h3>
          </div>
      ]
    }
  }
}

export default Details;