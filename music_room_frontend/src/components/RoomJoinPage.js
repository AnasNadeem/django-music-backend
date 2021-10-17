import React , { Component } from "react";
import { render } from "react-dom";
import { Button, Grid, Typography, TextField, FormHelperText, FormControl, Radio, RadioGroup, FormControlLabel } from "@material-ui/core";
import { Link } from "react-router-dom";

export default class RoomJoinPage extends Component{
  defaultVotes = 2;

  constructor(props){
    super(props);
  }

  render(){
    return(
      <Grid container spacing={1}>
        <Grid item xs={12} align="center">
          <Typography component="h4" variant="h4">
            Join a Room 
          </Typography>
        </Grid>
        <Grid item xs={12} align="center">
          <FormControl component="fieldset">
            <FormHelperText>
              <div align="center">Guest control of playback state</div>
            </FormHelperText>
            <RadioGroup row defaultValue="true">
              <FormControlLabel value="true" control={<Radio color="primary" />} label="Play/Pause" labelPlacement="bottom" />
              <FormControlLabel value="false" control={<Radio color="secondary" />} label="No Control" labelPlacement="bottom" />
            </RadioGroup>
          </FormControl>
        </Grid>
        <Grid item xs={12} align="center">
          <FormControl>
            <TextField required={true} type="number" defaultValue={this.defaultValue} inputProps={{ min:1, style:{ textAlign:"center" }}} />
            <FormHelperText>
              <div align="center"> Votes required to skip song </div>
            </FormHelperText>
          </FormControl>
        </Grid>
        <Grid item xs={12} align="center">
          <Button color="secondary" variant="contained" >Create a Room </Button>
        </Grid>
        <Grid item xs={12} align="center">
          <Button color="primary" variant="contained" to="/" component={Link}> Back </Button>
        </Grid>
      </Grid>
    );
  }
}