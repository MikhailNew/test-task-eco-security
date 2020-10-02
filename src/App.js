import React, { Component } from 'react'
import Loader from './Loader/Loader'
import Container from '@material-ui/core/Container';
import axios from 'axios'
import FilmsList from './FilmsList/FilmsList'
import Pagination from '@material-ui/lab/Pagination';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import List from '@material-ui/core/List';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import OutlinedInput from '@material-ui/core/OutlinedInput';



class App extends Component {

    state = {
        isLoading: true,
        page: 1,
        search: 'film',
        totalResults: 0,
        films: []
    }

    renderFilms () {
        return this.state.films.map((film) => {
          return (
            <FilmsList key={film.imdbID} id={film.imdbID} film={film} />
          )
        })
    }

    pageChangeHandler = (event, page) => {
        this.state.page === page 
        ?   null
        :   this.setState({
                page,
                isLoading: true
            })
    }

    onChangeSearch = event => {
        event.target.value.length > 3
        ?   this.setState({
                search: event.target.value,
                isLoading: true
            })
        :   null
    }
    
    async componentDidMount () {
        try {
            const response = await axios.get(`http://www.omdbapi.com/?apikey=a3b3f437&type=movie&s=${this.state.search}&page=${this.state.page}`)
            let films = []
            let totalResults = +response.data.totalResults 
            response.data.Search.map(item => {
                films.push(item)
            })
            this.setState({
                films,
                isLoading: false,
                totalResults
            })
        } catch (e) {
            console.log(e)
        }
    }

    async componentDidUpdate(prevProps, prevState) {
        if (this.state.page !== prevState.page) {
            try {
                const response = await axios.get(`http://www.omdbapi.com/?apikey=a3b3f437&type=movie&s=${this.state.search}&page=${this.state.page}`)
                let films = []
                response.data.Search.map(item => {
                    films.push(item)
                })
                this.setState({
                    films,
                    isLoading: false
                })
            } catch (e) {
                console.log(e)
            }
        } else if (this.state.search !== prevState.search) {
            try {
                const response = await axios.get(`http://www.omdbapi.com/?apikey=a3b3f437&type=movie&s=${this.state.search}&page=${this.state.page}`)
                let films = []
                let totalResults = +response.data.totalResults 
                response.data.Search.map(item => {
                    films.push(item)
                })
                this.setState({
                    films,
                    page: 1,
                    isLoading: false,
                    totalResults
                })
            } catch (e) {
                console.log(e)
            }
        }
    }

    render () {
        return (
            <Container>
                <Typography component="div">
                    <Box textAlign="center" fontSize="h3.fontSize" m={1}>Films list!</Box>
                    <FormControl fullWidth variant="outlined">
                        <InputLabel htmlFor="outlined-adornment-amount">Search</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-amount"
                            startAdornment={<InputAdornment position="start">&#128270;</InputAdornment>}
                            labelWidth={60}
                            onChange={this.onChangeSearch}
                        />
                    </FormControl>
                    {
                        this.state.isLoading
                        ?   <Box textAlign="center" m={1}>
                                <Loader />
                            </Box>
                        :   <> 
                                <List component="nav" className="films__list">
                                    {this.renderFilms()}
                                </List>
                                {
                                    this.state.totalResults > 10
                                    ?   <Pagination 
                                            count={this.state.totalResults % 10 === 0 ? this.state.totalResults / 10 : Math.ceil(this.state.totalResults / 10)} 
                                            onChange={this.pageChangeHandler}
                                            page={this.state.page}
                                        />
                                    :   null
                                }
                            </>
                    }
                </Typography>
            </Container>
        )
    }
}

export default App