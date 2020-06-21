import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const Home: React.FC = () => (
    <Grid container spacing={3} justify="space-between">
        <Grid item>
            <Typography variant="h5">Homepage</Typography>
        </Grid>
    </Grid>
);

export default Home;
