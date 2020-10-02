import React, { Component } from 'react'
import Loader from '../Loader/Loader'
import { NavLink } from 'react-router-dom';
import Container from '@material-ui/core/Container';
import Axios from 'axios'
import Box from '@material-ui/core/Box';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import ButtonBase from '@material-ui/core/ButtonBase';



class FilmItem extends Component {
    state = {
        loading: true,
        description: []
    }

    async componentDidMount () {
        try {
            const response = await Axios.get(`http://www.omdbapi.com/?apikey=a3b3f437&i=${this.props.match.params.id}`)
            const description = await response.data
            console.log(this.props.match)
            this.setState({
                description,
                loading: false
            })
        } catch (e) {
            console.log(e)
        }
    }

    renderFilmDesc () {
        return (
            <div style={{marginTop: '70px'}}>
                <Paper elevation={3}>
                    <Grid container spacing={2} style={{padding: '20px'}}>
                        <Grid item>
                            <ButtonBase>
                                <img alt="poster" src={this.state.description.Poster} />
                            </ButtonBase>
                        </Grid>
                        <Grid item xs={12} sm container>
                            <Grid item xs container direction="column" spacing={2}>
                                <Grid item xs>
                                    <Typography gutterBottom variant="subtitle1">
                                        Title: <strong>{this.state.description.Title}</strong>
                                    </Typography>
                                    <Typography variant="body2" gutterBottom>
                                        Year: <strong>{this.state.description.Year}</strong>
                                    </Typography>
                                    <Typography variant="body2" gutterBottom>
                                        Runtime: <strong>{this.state.description.Runtime}</strong>
                                    </Typography>
                                    <Typography variant="body2" gutterBottom>
                                        Genre: <strong>{this.state.description.Genre}</strong>
                                    </Typography>
                                    <Typography variant="body2" gutterBottom>
                                        Director: <strong>{this.state.description.Director}</strong>
                                    </Typography>
                                    <Typography variant="body2" gutterBottom>
                                        Writer: <strong>{this.state.description.Writer}</strong>
                                    </Typography>
                                    <Typography variant="body2" gutterBottom>
                                        Actors: <strong>{this.state.description.Actors}</strong>
                                    </Typography>
                                    <Typography variant="body2" gutterBottom>
                                        Description: <strong>{this.state.description.Plot}</strong>
                                    </Typography>
                                </Grid>
                                <Grid item>
                                    <Typography variant="body2" style={{ cursor: 'pointer' }}>
                                        <NavLink to={"/"}>
                                            Main menu
                                        </NavLink>
                                    </Typography>
                                </Grid>
                            </Grid>
                            <Grid item> 
                                <Typography variant="subtitle1">
                                    IMDB Rating: <strong>{this.state.description.imdbRating}</strong>
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                </Paper>
            </div>
        )
    }

    render () {
        return (
            <Container>
                <Typography component="div">
                    <FormControl fullWidth variant="outlined" style={{marginTop: '20px'}}>
                        <InputLabel htmlFor="outlined-adornment-amount">Search</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-amount"
                            startAdornment={<InputAdornment position="start">&#128270;</InputAdornment>}
                            labelWidth={60}
                            onChange={this.onChangeSearch}
                        />
                    </FormControl>
                    {
                        this.state.loading
                        ?   <Box textAlign="center" m={1}>
                                <Loader />
                            </Box>
                        :   <Box>{this.renderFilmDesc()}</Box>
                    }
                </Typography>
            </Container>
        )
    }
}

export default FilmItem