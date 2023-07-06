import { Box, Button, Card, CardActionArea, CardContent, CardMedia, Grid, Typography } from "@mui/material";
import NavBar from "../../component/navbar";
import Bottombar from "../../component/footer";

import { Carousel } from 'antd';

import React, { useState } from "react";
import { competitionApi } from "@/http/http_api";

import './home.css'

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

export function ItemCard(item: ItemInfo) {
    return (
        <Card style={{
            margin: 12,
            borderRadius: 10,
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.8)',
            overflow: 'hidden',
            backgroundColor: 'rgba(255, 255, 255, 0.08)', // 设置背景颜色的透明度
        }}>
            <CardActionArea>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <img style={{ maxWidth: 345, height: 200 }} src={item.image} alt="" />
                </div>
                <CardContent>
                    <Typography sx={{ color: 'white' }} gutterBottom variant="h5" component="h2">
                        {item.name}
                    </Typography>
                    <Typography sx={{ color: 'rgba(244, 244, 244, 0.8)' }} variant="body2" color="textSecondary" component="p">
                        {item.description}
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
    const items: any = [];

    const numEveryColumn: number = width > breakpoint1 ? 5 :
        width > breakpoint2 ? 4 :
            width > breakpoint3 ? 3 : 2

    for (let idx = 0; idx < area.items.length; idx += numEveryColumn) {
        const end: number = idx + numEveryColumn > area.items.length ? area.items.length : idx + numEveryColumn;
        //console.log(area.items[idx].image)
        items.push(
            <Grid container>
                {
                    area.items.slice(idx, end).map((item) => {
                        return (
                            <Grid xs={12 / numEveryColumn} sx={{ display: 'flex', alignItems: 'center' }}>
                                <ItemCard name={item.name} id={item.id} image={item.image} staffName={item.staffName} description={item.description}></ItemCard>
                            </Grid>
                        )
                    })
                }
            </Grid>
        )
    }
    return (
        <Card className="background-area" sx={{ bgcolor: '#121212' }}>
            {/* <Box sx={{ width: '100%' }}> */}
            <CardContent>
                <Box sx={{ mb: 3 }}>
                    <Typography sx={{ m: '0', fontSize: 20, fontWeight: 600, color: 'white' }}>
                        {area.name}Lastest featured games
                    </Typography>
                </Box>
                <Box sx={{}}>
                    {items}
                </Box>
            </CardContent>
            {/* </Box> */}
        </Card>
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

    React.useEffect(() => {
        competitionApi.getStartCompetitionList(undefined).then((req) => {
            const temp: ItemInfo[] = [];
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
        }).catch((err) => {
            console.log(err);
        })
        competitionApi.getSignupCompetitionList(undefined).then((req) => {
            const temp: ItemInfo[] = [];
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
            const temp: ItemInfo[] = [];
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
    }, [])


    return (
        <>
            <NavBar></NavBar>
            <Swiper ></Swiper>
            <Box sx={{
                backgroundColor: 'black',
                px: '200px',
                py: '50px',

            }}>
                <ItemShowArea name='start competition' items={startCompetitions as ItemInfo[]}></ItemShowArea>
                <ItemShowArea name='sign up competition' items={signUpCompetitions as ItemInfo[]}></ItemShowArea>
                <ItemShowArea name='end competition' items={endCompetitions as ItemInfo[]}></ItemShowArea>
                {/* <ItemShowArea name='test' items={items}></ItemShowArea> */}
            </Box>
            <Bottombar></Bottombar>
        </>
    )
}