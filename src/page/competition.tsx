import Bottombar from "@/component/bottombar";
import NavBar from "@/component/navbar";
import { Box, Card, CardActionArea, CardContent, CardMedia, Typography } from "@mui/material";




export default function CompetitionInfo() {
    return (
        <>
            <NavBar></NavBar>
            <Box sx={{ width: '100%',pt: '150px',pb: '150px',display:'flex',justifyContent:'center' }}>
                
                <Card sx={{width:'60%',height:'600px'}}>
                    <CardActionArea>
                        <CardMedia
                            component="img"
                            height="140"
                            image="/static/images/cards/contemplative-reptile.jpg"
                            alt="green iguana"
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                Lizard
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Lizards are a widespread group of squamate reptiles, with over 6,000
                                species, ranging across all continents except Antarctica
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
            </Box>
            <Bottombar></Bottombar>
        </>
    )
}