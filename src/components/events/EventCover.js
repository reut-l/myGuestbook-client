import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchEvent } from '../../actions';

class EventCover extends Component {
  componentDidMount() {
    const { eventId } = this.props;
    this.props.fetchEvent(eventId);
  }

  render() {
    const { currentEvent } = this.props;
    if (currentEvent) {
      const eventName = currentEvent.name;

      if (currentEvent.imageCover) {
        const { imageCover } = currentEvent;

        if (imageCover)
          return (
            <section>
              <div className="inner-block" id="section-0">
                <h1>{eventName}</h1>
                <img
                  src={`http://127.0.0.1:3001/img/eventsCovers/${imageCover}`}
                  alt="event_image_cover"
                />
              </div>
            </section>
          );
      }
      return (
        <section>
          <div className="inner-block" id="section-0">
            <div style={{ height: '70px', textAlign: 'center' }}>
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
