import React, { Component } from 'react'
import Loader from './Loader/Loader'
import Container from '@material-ui/core/Container'
import FilmsList from './FilmsList/FilmsList'
import Pagination from '@material-ui/lab/Pagination'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import List from '@material-ui/core/List'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import InputAdornment from '@material-ui/core/InputAdornment'
import OutlinedInput from '@material-ui/core/OutlinedInput'
import { connect } from 'react-redux'
import fetchFilms, {pageChangeClick, searchHandler} from './store/actions/films'



class App extends Component {
    
    componentDidMount () {
        this.props.fetchFilms(this.props.search, this.props.page, false)
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.page !== prevProps.page) {
            this.props.fetchFilms(this.props.search, this.props.page, false)
        } else if (this.props.search !== prevProps.search) {
            this.props.fetchFilms(this.props.search, this.props.page, true)
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
                            onChange={this.props.searchHandler}
                        />
                    </FormControl>
                    {
                        this.props.isLoading
                        ?   <Box textAlign="center" m={1}>
                                <Loader />
                            </Box>
                        :   <> 
                                <List component="nav">
                                    <FilmsList films={this.props.films} />
                                </List>
                                {
                                    this.props.totalResults > 10
                                    ?   <Pagination 
                                            count={this.props.totalResults % 10 === 0 ? this.props.totalResults / 10 : Math.ceil(this.props.totalResults / 10)} 
                                            onChange={this.props.pageChangeClick}
                                            page={this.props.page}
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

function mapStateToProps (state) {
    return {
        isLoading: state.films.isLoading,
        page: state.films.page,
        search: state.films.search,
        totalResults: state.films.totalResults,
        films: state.films.films
    }
}

function mapDispatchToProps (dispatch) {
    return {
        fetchFilms: (search, page, isChangeSearch) => dispatch(fetchFilms(search, page, isChangeSearch)),
        pageChangeClick: (event, page) => dispatch(pageChangeClick(event, page)),
        searchHandler: event => dispatch(searchHandler(event))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)