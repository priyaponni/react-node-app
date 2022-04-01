
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { Button , TextField, Container, Grid, FormControl, InputLabel, Select, MenuItem, CircularProgress} from '@mui/material';
import { useReducer } from "react";

import userReducer from "../reducers/user.js";
const INITIAL_STATE = {
    user: {name: '', project: ''},
    originalUser: {},
    projects: [],
    error: ''
}

export default function UserDetails(props) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const { id } = useParams();

    const [state, dispatch] = useReducer(userReducer, INITIAL_STATE);

    const handleChange = (item, val) => {
        dispatch({type: 'EDIT_PROPERTY', payload: {item, val}})
    }

    const submit = async (e) => {
        e.preventDefault();
        console.log(state.user);
        setLoading(true);
        setTimeout(async () => {
            setLoading(false);
            const response = await fetch(`http://localhost:8000/api/user/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({name: state.user.name, project: state.user.project})
            });
            const responseObj = await response.json();
            if (response.ok) {
                dispatch({type: 'EDIT_USER', payload: responseObj.data});
            } else {
                setError('Error editing user');
            }
        }, 2000);
        
    }

    const getUserDetail = () => {
        return (
            <div> 
                {state.user && state.originalUser.name} 
                <form onSubmit={submit}>
                    <Button type="submit"> Edit</Button>
                </form>
            </div>
        )
    }

    useEffect(async () => {
        const response = await fetch(`http://localhost:8000/api/user/${id}`, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        });
        console.log(response);
        const responseObj = await response.json();
        console.log(responseObj);
        if(response.ok) {
            dispatch({type: 'EDIT_USER', payload: responseObj.data});
        } else {
            console.log('error');
        }
    }, [])

    return (
        <Container>
            {loading && <CircularProgress color="secondary" />}
            <Grid container spacing={3}>
                <Grid item md={12}>
                    <TextField type="text" value={state.user.name} label="Name"
                        onChange={(e) => handleChange('name', e.target.value)} />
                </Grid>
                <Grid item md={12}>
                <FormControl >
                    <InputLabel id="demo-simple-select-label">Age</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={state.user.project} 
                        label="Age"
                        onChange={(e) => handleChange('project', e.target.value)}
                    >
                        <MenuItem value={10}>Ten</MenuItem>
                        <MenuItem value={20}>Twenty</MenuItem>
                        <MenuItem value={30}>Thirty</MenuItem>
                    </Select>
                </FormControl>
                    <select value={state.user.project} 
                        onChange={(e) => handleChange('project', e.target.value)}>
                        <option value="Project A">Project A</option>
                        <option value="Project A">Project B</option>
                    </select>
                </Grid>
                <Grid item md={12}>
                    { getUserDetail() }
                </Grid>
            </Grid>
        </Container>
    )
}