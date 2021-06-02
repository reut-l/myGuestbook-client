import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchEvent } from '../../actions';

class EventEdit extends Component {
  componentDidMount() {
    this.props.fetchEvent(this.props.match.params.eventId);
  }

  renderEventCover = () => {
    const { event } = this.props;
    if (event) {
      if (event.imageCover) {
        return (
          <div>
            <img
              src={`http://127.0.0.1:3001/img/eventsCovers/${event.imageCover}`}
              alt="event_cover_image"
              style={{ width: '100%' }}
            />
          </div>
        );
      }
      return (
        <div
          style={{
            lineHeight: '300px',
            backgroundColor: 'grey',
            textAlign: 'center',
          }}
        >
          {event.name}
        </div>
      );
    }
  };

  render() {
    if (this.props.event) {
      return (
        <div>
          {this.renderEventCover()}
          <div>
            <Link
              to={`/events/${this.props.event._id}/edit/uploadImages`}
              className="ui primary button"
            >
              Upload Event Pictures
            </Link>
          </div>
        </div>
      );
    }
    return null;
  }
}

const mapStateToProps = (state) => {
  return { event: state.events.currentEvent };
};

export default connect(mapStateToProps, { fetchEvent })(EventEdit);
