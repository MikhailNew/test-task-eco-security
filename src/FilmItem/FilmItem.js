import React, { Component } from 'react'
import Loader from '../Loader/Loader'
import { NavLink } from 'react-router-dom'
import Container from '@material-ui/core/Container'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import ButtonBase from '@material-ui/core/ButtonBase'
import SearchPlace from '../SearchPlace/SearchPlace'
import { connect } from 'react-redux'
import fetchFilm, {fetchSearchFilm, changeSearchHandler, closeSearchHandler} from '../store/actions/filmItem'



class FilmItem extends Component {

    componentDidMount () {
        this.props.fetchFilm(this.props.match.params.id)
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.match.params.id !== prevProps.match.params.id) {
            this.props.fetchFilm(this.props.match.params.id)
        } else if (this.props.search !== prevProps.search && this.props.search.length >= 3) {
            this.props.fetchSearchFilm(this.props.search)
        }
    }

    renderFilmDesc () {
        return (
            <div style={{marginTop: '70px', zIndex: '1'}}>
                <Paper elevation={3}>
                    <Grid container spacing={2} style={{padding: '20px'}}>
                        <Grid item>
                            <ButtonBase>
                                <img alt="poster" src={this.props.description.Poster} />
                            </ButtonBase>
                        </Grid>
                        <Grid item xs={12} sm container>
                            <Grid item xs container direction="column" spacing={2}>
                                <Grid item xs>
                                    <Typography gutterBottom variant="subtitle1">
                                        Title: <strong>{this.props.description.Title}</strong>
                                    </Typography>
                                    <Typography variant="body2" gutterBottom>
                                        Year: <strong>{this.props.description.Year}</strong>
                                    </Typography>
                                    <Typography variant="body2" gutterBottom>
                                        Runtime: <strong>{this.props.description.Runtime}</strong>
                                    </Typography>
                                    <Typography variant="body2" gutterBottom>
                                        Genre: <strong>{this.props.description.Genre}</strong>
                                    </Typography>
                                    <Typography variant="body2" gutterBottom>
                                        Director: <strong>{this.props.description.Director}</strong>
                                    </Typography>
                                    <Typography variant="body2" gutterBottom>
                                        Writer: <strong>{this.props.description.Writer}</strong>
                                    </Typography>
                                    <Typography variant="body2" gutterBottom>
                                        Actors: <strong>{this.props.description.Actors}</strong>
                                    </Typography>
                                    <Typography variant="body2" gutterBottom>
                                        Description: <strong>{this.props.description.Plot}</strong>
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
                                    IMDB Rating: <strong>{this.props.description.imdbRating}</strong>
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
                <Typography component="div" onClick={this.props.closeSearchHandler}>
                    <SearchPlace 
                        onChange={this.props.changeSearchHandler} 
                        isOpen={this.props.isOpen} 
                        films={this.props.films}
                        value={this.props.search}
                    />
                    {
                        this.props.loading
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

function mapStateToProps (state) {
    return {
        loading: state.filmItem.loading,
        description: state.filmItem.description,
        isOpen: state.filmItem.isOpen,
        search: state.filmItem.search,
        films: state.filmItem.films
    }
}

function mapDispatchToProps (dispatch) {
    return {
        fetchFilm: film_id => dispatch(fetchFilm(film_id)),
        fetchSearchFilm: search => dispatch(fetchSearchFilm(search)),
        closeSearchHandler: event => dispatch(closeSearchHandler(event)),
        changeSearchHandler: event => dispatch(changeSearchHandler(event.target.value))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FilmItem)