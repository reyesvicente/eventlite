import React from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'

import EventsList from './EventList'
import EventForm from './EventForm'

class Eventlite extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      events: this.props.events,
      title: '',
      start_datetime: '',
      location: ''
    };
  }

  handleInput = e => {
    e.preventDefault()
    const name = e.target.name
    const newState = {}
    newState[name] = e.target.value
    this.setState(newState)
  }

  handleSubmit = e => {
    e.preventDefault()
    axios({
      method: 'POST',
      url: '/events',
      data: { event: this.state },
      headers: {
        'X-CSRF-Token': document.querySelector("meta[name=csrf-token]").content
      }
    })
    .then(function (response) {
      this.addNewEvent(response.data)
    }.bind(this))
    .catch(function (error) {
      console.log(error)
    })
  }

  addNewEvent = (event) => {
    const events = [...this.state.events].sort(function(a, b) {
      return new Date(a.start_datetime) - new Date(b.start_datetime);
    });
    this.setState({ events: events });
  };

  render() {
    return (
      <div>
        <EventForm handleSubmit={this.handleSubmit}
          handleInput = {this.handleInput}
          title = {this.state.title}
          start_datetime = {this.state.start_datetime}
          location = {this.state.location} />
        <EventsList events={this.state.events} />
      </div>
    );
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const node = document.getElementById('events_data')
  const data = JSON.parse(node.getAttribute('data'))
  ReactDOM.render(
    <Eventlite events={data} />,
    document.body.appendChild(document.createElement('div')),
  )
})
