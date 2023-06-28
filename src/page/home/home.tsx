import { Box, Button, Card, CardActionArea, CardContent, CardMedia, Grid, Typography } from "@mui/material";
import NavBar from "../../component/navbar";
import Bottombar from "../../component/bottombar";

import { Carousel } from 'antd';

import React, { useState } from "react";
import { competitionApi } from "@/http/http_api";





interface ItemInfo {
    description?: string,
    staffName?: string,
    id: number,
    name: string,
    image: string,
}
interface AreaInfo {
    name: string,
    items: ItemInfo[],
}
interface SwiperItemInfo {
    item: ItemInfo,
    alt: string,
}

function ItemCard(item: ItemInfo) {
    return (
        <Card sx={{ height: '250px', width: '250px', mb: 5, bgcolor: '#F4F4F4' }}>
            <CardActionArea sx={{ p: 0, m: 0 }}>
                <CardMedia
                    component="img"
                    height="150px"
                    src={item.image}
                    alt="green iguana"
                />
                {/* <Box
                    component='img'
                    src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&w=350&dpr=2"
                    height='150px'
                    >

                </Box> */}
                <CardContent sx={{ height: "100px", pl: 1.5, py: 0, pr: 0 }}>
                    <Typography gutterBottom variant="h5" component="div">
                        {item.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Lizards adadadadadadadad
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>

    )
}

function ItemShowArea(area: AreaInfo) {

    const [width, setWidth] = React.useState(window.innerWidth);

    React.useEffect(() => {
        const handleWindowResize = () => setWidth(window.innerWidth);
        window.addEventListener("resize", handleWindowResize);
        return () => window.removeEventListener("resize", handleWindowResize);
    }, []);

    const breakpoint1 = 1680;
    const breakpoint2 = 1460;
    const breakpoint3 = 1200;
    var items: any = [];

    var numEveryColumn: number = width > breakpoint1 ? 5 :
        width > breakpoint2 ? 4 :
            width > breakpoint3 ? 3 : 2

    for (var idx = 0; idx < area.items.length; idx += numEveryColumn) {
        var end: number = idx + numEveryColumn > area.items.length ? area.items.length : idx + numEveryColumn;
        console.log(area.items[idx].image)
        items.push(
            <Grid container>
                {
                    area.items.slice(idx, end).map((item) => {
                        return (
                            <Grid xs={12 / numEveryColumn} sx={{ display: 'flex', justifyContent: 'center' }}>
                                <ItemCard name={item.name} image={item.image} description={item.description} id={item.id}></ItemCard>
                            </Grid>
                        )
                    })
                }
            </Grid>
        )
    }
    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ px: '200px', mb: 3 }}>
                <Typography sx={{ m: '0', fontSize: 20, fontWeight: 900, color: '#434343' }}>
                    {area.name}Lastest featured games
                </Typography>
            </Box>
            <Box sx={{ px: '200px' }}>
                {items}
            </Box>
        </Box>
    )
}

function Swiper() {


    const onChange = (currentSlide: number) => {
        console.log(currentSlide);
    };
    return (
        <Box sx={{ width: '100%', height: '400px', bgcolor: 'black' }}>
            <Carousel afterChange={onChange}>
                <SwiperContent></SwiperContent>
                <SwiperContent></SwiperContent>
                <SwiperContent></SwiperContent>
            </Carousel>
        </Box>
    )
}
function SwiperContent() {
    return (
        <Box sx={{ height: '400px', bgcolor: 'grey', mx: '200px', my: 0 }}>
            <Grid container sx={{ height: '100%' }}>
                <Grid xs={6} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                    <Box
                        component='img'
                        src='https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&w=350&dpr=2'
                        height='80%'
                        width='80%'
                    >
                    </Box>
                </Grid>
                <Grid xs={6} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
                    <Box sx={{ height: '80%', width: '80%' }}>
                        <Box sx={{ height: '20%' }}>
                            <Typography sx={{ m: 0, fontSize: 50, fontWeight: 900, color: '#434343' }}>
                                TestGame
                            </Typography>
                        </Box>
                        <Box sx={{ height: '60%' }}>
                            <Typography sx={{ m: '0', fontSize: 25, fontWeight: 500, color: '#434343' }}>
                                TestGameadadadadadadadad
                                adadadawdadadada
                                dawdaddddddddddddddddddddddddddddddddddd
                                adadadadadadadada
                            </Typography>
                        </Box>
                        <Box sx={{ height: '20%' }}>
                            <Button sx={{ border: '2px solid', borderColor: 'white', borderRadius: '6px', fontSize: 25, fontWeight: 500, color: 'black' }}>Play this</Button>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    )
}


export default function Home() {

    const [startCompetitions, setStartCompetitions] = useState<ItemInfo[]>([]);
    const [signUpCompetitions, setSignUpCompetitions] = useState<ItemInfo[]>([]);
    const [endCompetitions, setEndCompetitions] = useState<ItemInfo[]>([]);

    competitionApi.getStartCompetitionList(undefined).then((req) => {
        var temp: ItemInfo[] = [];
        req.list.map((competition) => {
            temp.push({
                id: competition.id,
                name: competition.name,
                staffName: competition.staffName,
                image: competition.headerImageURL,
                description: competition.description
            })
        })
        setStartCompetitions(temp);
    }).catch((err)=>{
        console.log(err);
    })
    competitionApi.getSignupCompetitionList(undefined).then((req) => {
        var temp: ItemInfo[] = [];
        req.list.map((competition) => {
            temp.push({
                id: competition.id,
                name: competition.name,
                staffName: competition.staffName,
                image: competition.headerImageURL,
                description: competition.description
            })
        })
        setSignUpCompetitions(temp);
    })
    competitionApi.getEndCompetitionList(undefined).then((req) => {
        var temp: ItemInfo[] = [];
        req.list.map((competition) => {
            temp.push({
                id: competition.id,
                name: competition.name,
                staffName: competition.staffName,
                image: competition.headerImageURL,
                description: competition.description
            })
        })
        setEndCompetitions(temp);
    })

    return (
        <>
            <NavBar></NavBar>
            <Swiper ></Swiper>
            <Box >
                <ItemShowArea name='start competition' items={startCompetitions as ItemInfo[]}></ItemShowArea>
                <ItemShowArea name='sign up competition' items={signUpCompetitions as ItemInfo[]}></ItemShowArea>
                <ItemShowArea name='end competition' items={endCompetitions as ItemInfo[]}></ItemShowArea>
                {/* <ItemShowArea name='test' items={items}></ItemShowArea> */}
            </Box>
            <Bottombar></Bottombar>
        </>
    )
}