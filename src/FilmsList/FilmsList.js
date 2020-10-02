import React from 'react'
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Box from '@material-ui/core/Box';
import { NavLink } from 'react-router-dom';


export default props => ( 
   
    <ListItem button>
        <ListItemText>
            <NavLink to={"/" + props.id} style={{textDecoration: 'none', color: '#000000'}}>
                {props.film.Title}&nbsp;
                <Box fontSize={10} component="div">
                    {props.film.Year}
                </Box>
            </NavLink> 
        </ListItemText>
    </ListItem>
)