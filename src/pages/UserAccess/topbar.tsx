import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export default function Topbar() {
    return (
        <Box sx={{ width: '100%', height: 70, display: 'flex', alignItems: 'center' ,justifyContent:'center'}}>
            <Typography sx={{ m: '0', fontSize: 35, fontWeight: 500, color: '#434343' }} color="text.secondary" gutterBottom>
                itch
            </Typography>
        </Box>
    )
}