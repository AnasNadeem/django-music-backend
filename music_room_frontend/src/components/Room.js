import React , { Component } from 'react';
import { Grid, Button, Typography } from "@material-ui/core";

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
    this.leaveButtonPressed= this.leaveButtonPressed.bind(this);
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

  leaveButtonPressed(){
    const requestOptions = {
      method:"POST",
      headers:{"Content-Type": "application/json"},
    };
    fetch("/api/leave-room", requestOptions).then((_response) => {
      this.props.history.push("/")
    })
  }

  render(){
    return(
      <Grid container spacing={3}>
        <Grid item xs={12} align="center">
          <Typography variant="h2" compact="h2">
            Room Code {this.roomCode}
          </Typography>
        </Grid>
        <Grid item xs={12} align="center">
          <Typography variant="h3" compact="h3">
            Votes to skip {this.state.votesToSkip}
          </Typography>
        </Grid>
        <Grid item xs={12} align="center">
          <Typography variant="h3" compact="h3">
            Guest can pause {this.state.guestCanPause.toString()}
          </Typography>
        </Grid>
        <Grid item xs={12} align="center">
          <Typography variant="h3" compact="h3">
            Host {this.state.host.toString()}
          </Typography>
        </Grid>
        <Grid item xs={12} align="center">
        <Button color="secondary" variant="contained">
          Leave Room
        </Button>
        </Grid>
      </Grid>
    );
  }

}

/*
<div>
  <h4>Room Code : {this.roomCode}</h4>
  <p>Votes skipped : {this.state.votesToSkip}</p>
  <p>Guest Can Pause : {this.state.guestCanPause.toString()}</p>
  <p>Host : {this.state.host.toString()}</p>
</div>
*/