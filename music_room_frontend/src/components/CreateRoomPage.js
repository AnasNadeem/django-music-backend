import React , { Component } from "react";
import { render } from "react-dom";
import { Alert, Button, Collapse, Grid, Typography, TextField, FormHelperText, FormControl, FormControlLabel, Radio, RadioGroup } from "@material-ui/core";
import { Link } from "react-router-dom";

class CreateRoomPage extends Component{
  static defaultProps = {
    votesToSkip: 2,
    guestCanPause: true,
    update: false,
    roomCode: null,
    updateCallback: () => {},
  };

  constructor(props){
    super(props);
    this.state = {
      guestCanPause: true,
      votesToSkip: this.defaultVotes,
      successMsg:"",
      errorMsg:"",
    };
    this.handleRoomBtnPress = this.handleRoomBtnPress.bind(this);
    this.handleVotesChange = this.handleVotesChange.bind(this);
    this.handleGuestCanPauseChange = this.handleGuestCanPauseChange.bind(this);
    // this.renderCreateButtons = this.renderCreateButtons.bind(this);
    // this.renderUpdateButtons = this.renderUpdateButtons.bind(this);
    this.handleUpdateRoomBtnPress = this.handleUpdateRoomBtnPress.bind(this);
  }

  handleVotesChange(e){
    this.setState({
      votesToSkip: e.target.value,
    });
  }

  handleGuestCanPauseChange(e){
    this.setState({
      guestCanPause: e.target.value === "true" ? true : false,
    });
  }

  handleRoomBtnPress(){
    const requestOptions = {
      method: "POST",
      headers: {"Content-type": "application/json"},
      body: JSON.stringify({
        votes_to_skip: this.state.votesToSkip,
        guest_can_pause: this.state.guestCanPause,
      }),
    };
    fetch("/api/create-room", requestOptions).then((response) => response.json()).then((data) => this.props.history.push("/room/" + data.code));
  }

  handleUpdateRoomBtnPress(){
    const requestOptions = {
      method: "PATCH",
      headers: {"Content-type": "application/json"},
      body: JSON.stringify({
        votes_to_skip: this.state.votesToSkip,
        guest_can_pause: this.state.guestCanPause,
        code: this.props.roomCode,
      }),
    };
    fetch("/api/update-room", requestOptions).then((response) => {
      if(response.ok){
        this.setState({
          successMsg:"Room has been updated.",
        })
      }else{
        this.setState({
          errorMsg:"Error while updating room.",
        });
      }
      this.props.updateCallback();
    });
  }

  renderCreateButtons(){
    render(
      <Grid container>
        <Grid item xs={12} align="center">
          <Button color="primary" variant="contained" onClick={this.handleRoomBtnPress} >
            Create a Room 
          </Button>
        </Grid>
        <Grid item xs={12} align="center">
          <Button color="secondary" variant="contained" to="/" component={Link}> Back </Button>
        </Grid>
      </Grid>
    );
  }

  renderUpdateButtons(){
    render(
        <Grid item xs={12} align="center">
          <Button color="primary" variant="contained" onClick={this.handleUpdateRoomBtnPress} >
            Update Room 
          </Button>
        </Grid>
    );
  }

  render(){
    const title = this.props.update ? "Update Room" : "Create a Room";

    return(
      <Grid container spacing={1}>
        <Grid item xs={12} align="center">
          <Collapse in={ this.state.errorMsg != "" || this.state.successMsg != "" } >
            {this.state.errorMsg != "" ? this.state.errorMsg : this.state.successMsg }
          </Collapse>
        </Grid>
        <Grid item xs={12} align="center">
          <Typography component="h4" variant="h4">
            { title }
          </Typography>
        </Grid>
        <Grid item xs={12} align="center">
          <FormControl component="fieldset">
            <FormHelperText>
              <div align="center">Guest control of playback state</div>
            </FormHelperText>
            <RadioGroup row defaultValue={ this.props.guestCanPause.toString() } onChange={this.handleGuestCanPauseChange}>
              <FormControlLabel value="true" control={<Radio color="primary" />} label="Play/Pause" labelPlacement="bottom" />
              <FormControlLabel value="false" control={<Radio color="secondary" />} label="No Control" labelPlacement="bottom" />
            </RadioGroup>
          </FormControl>
        </Grid>
        <Grid item xs={12} align="center">
          <FormControl>
            <TextField required={true} type="number" defaultValue={this.defaultValue} onChange={this.handleVotesChange} inputProps={{ min:1, style:{ textAlign:"center" }}} />
            <FormHelperText>
              <div align="center"> Votes required to skip song </div>
            </FormHelperText>
          </FormControl>
        </Grid>
        {this.props.update ? this.renderUpdateButtons() : this.renderCreateButtons() }
      </Grid>
    );
  }
}

export default CreateRoomPage;