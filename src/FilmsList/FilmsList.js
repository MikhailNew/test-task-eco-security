import React from 'react'
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Box from '@material-ui/core/Box';
import { NavLink } from 'react-router-dom';


export default props => {
    return props.films.map((film) => {
        return (
        <ListItem button key={film.imdbID}>
            <ListItemText>
                <NavLink to={"/film/" + film.imdbID} style={{textDecoration: 'none', color: '#000000'}}>
                    {film.Title}&nbsp;
                    <Box fontSize={10} component="div">
                        {film.Year}
                    </Box>
                </NavLink>
            </ListItemText>
        </ListItem>
        )
    })
} 