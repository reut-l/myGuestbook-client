import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchEvent } from '../../actions';

class EventCover extends Component {
  componentDidMount() {
    const { eventId } = this.props;
    this.props.fetchEvent(eventId);
  }
  render() {
    if (this.props.currentEvent) {
      const { currentEvent } = this.props;
      const imageCover = currentEvent.imageCover.name;
      const eventName = currentEvent.name;
      if (imageCover) {
        return (
          <section>
            <div className="inner-block" id="section-0">
              <h1>{eventName}</h1>
              <img
                src={`http://127.0.0.1:3001/img/events/${imageCover}`}
                alt="event_image_cover"
              />
            </div>
          </section>
        );
      }

      return (
        <section>
          <div className="inner-block" id="section-0">
            <div style={{ height: '200px', textAlign: 'center' }}>
              {eventName}
            </div>
          </div>
        </section>
      );
    }
    return null;
  }
}

const mapStateToProps = (state) => {
  return { currentEvent: state.events.currentEvent };
};
export default connect(mapStateToProps, { fetchEvent })(EventCover);
