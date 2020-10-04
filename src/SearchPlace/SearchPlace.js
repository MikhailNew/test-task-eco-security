import React from 'react'
import FilmsList from '../FilmsList/FilmsList'
import List from '@material-ui/core/List'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import InputAdornment from '@material-ui/core/InputAdornment'
import OutlinedInput from '@material-ui/core/OutlinedInput'


function SearchPlace (props) { 
    return (
        <div style={{position: 'relative'}}>
            <FormControl fullWidth variant="outlined">
                <InputLabel htmlFor="outlined-adornment-amount">Search</InputLabel>
                <OutlinedInput
                    id="outlined-adornment-amount"
                    startAdornment={<InputAdornment position="start">&#128270;</InputAdornment>}
                    labelWidth={60}
                    onChange={props.onChange}
                    value={props.value}
                />
            </FormControl>
            {
                props.films.length > 0 && props.isOpen
                ?   <List component="nav" style={{position: 'absolute', zIndex: '100', background: '#CAC4B0', opacity: '1'}}>
                        <FilmsList films={props.films} />
                    </List>
                :   null
            }
        </div>
    )
}

export default SearchPlace