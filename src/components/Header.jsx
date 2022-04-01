import { AppBar, Toolbar, Grid, Button } from '@mui/material';
import { Link } from 'react-router-dom';


export default function Header() {
    return (
        <AppBar position="static">
            <Toolbar>
                User List
                <Grid container>
                    <Grid item xs={1}>
                        <Button >
                            <Link to="/users"> Users </Link>
                        </Button>
                    </Grid>
                </Grid>
            </Toolbar>
        </AppBar>
    )
}