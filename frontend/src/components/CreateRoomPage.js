import React, {Component} from "react";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import { Link } from "react-router-dom";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";

export default class CreateRoomPage extends Component{
    defaultVotes = 2;
    constructor(props){
        super(props);
        this.state ={
            guestCanPause: true,
            votesToSkip: this.defaultVotes,
        };
        //binds method to the class
        this.handleVotesChange=this.handleVotesChange.bind(this);
        this.handleGuestCanPauseChange=this.handleGuestCanPauseChange.bind(this);
        this.handleRoomButtonPressed = this.handleRoomButtonPressed.bind(this);
    }

    handleVotesChange(e){
        //modify state in react
        this.setState({
            votesToSkip: e.target.value,
        });
    }

    handleGuestCanPauseChange(e){
        this.setState({
            guestCanPause: e.target.value === "true" ? true : false
        });
    }


    handleRoomButtonPressed(){
        const requestOptions={
            method:'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({
                "votes_to_skip": this.state.votesToSkip,
                "guest_can_pause": this.state.guestCanPause
            }),
        };
        fetch('/api/create-room',requestOptions).then((response) =>
        response.json()).then((data) => console.log(data))
        .catch((error) => console.log(error));
    }

    render(){
        return (
        <Grid container spacing={1}>
            <Grid item xs={12} align="center">
                <Typography componet ="h4" variant="h4">
                    Create A Room
                    </Typography>
                </Grid>
                <Grid item xs={12} align="center">
                    <FormControl component="fieldset">
                        <FormHelperText component="span">
                            <div align="center">Guest Control of Playback State</div>
                        </FormHelperText>
                        <RadioGroup
                            row defaultValue='true'
                            onChange={this.handleGuestCanPauseChange}>
                            <FormControlLabel value='true'
                                    control={<Radio color="primary"/>}
                                    label = "Play/Pause"
                                    labelPlacement="bottom"/>
                            <FormControlLabel value='false'
                                    control={<Radio color="secondary"/>}
                                    label = "No Control"
                                    labelPlacement="bottom"/>
                        </RadioGroup>
                    </FormControl>
                </Grid>
                <Grid item xs={12} align="center">
                    <FormControl>
                        <TextField required={true}
                            type="number"
                            onChange={this.handleVotesChange}
                            defaultValue={this.defaultVotes}
                            inputProps={{ min:1, style:{textAlign:"center"} }}/>
                            <FormHelperText component = 'span'>
                                <div align="center">Votes Required to Skip song</div>
                                </FormHelperText>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} align="center">
                            <Button
                                color="primary"
                                variant="contained"
                                onClick={this.handleRoomButtonPressed}>
                                Create A Room
                            </Button>
                        </Grid>
                        <Grid item xs={12} align="center">
                            <Button color="secondary" variant="contained" to="/" component={Link}>
                            Back
                            </Button>
                        </Grid>
                    </Grid>
                );
            }
}
