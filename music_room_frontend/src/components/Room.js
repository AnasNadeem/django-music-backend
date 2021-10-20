import React , { Component } from 'react';
export default class Room extends Component{
  constructor(props){
    super(props);
    this.state = {
      votesToSkip:2,
      guestCanPause:4,
      host:false,
    };
    this.roomCode = this.props.match.params.roomCode;
    this.getRoomDetails();
  }

  getRoomDetails(){
    fetch("/api/get-room" + "?code=" + this.roomCode).then((response) => response.json()).then((data) => {
      this.setState({
        votesToSkip: data.votes_to_skip,
        guestCanPause: data.guest_can_pause,
        isHost: data.is_host
      })
    })
  }

  render(){
    return(
      <div>
      <h4>Room Code : {this.roomCode}</h4>
        <p>Votes skipped : {this.state.votesToSkip}</p>
        <p>Guest Can Pause : {this.state.guestCanPause.toString()}</p>
        <p>Host : {this.state.host.toString()}</p>
      </div>
    )
  }

}