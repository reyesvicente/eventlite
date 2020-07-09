import React from 'react'
import Event from './Event'
import PropTypes from 'prop-types'

const EventsList = props => (
  <div>
    {props.events.map(function(event){
      return(
        <Event key={event.id} event={event} />
      )
    })}
  </div>
)

EventsList.propTypes = {
  events: PropTypes.array.isRequired
}

export default EventsList
