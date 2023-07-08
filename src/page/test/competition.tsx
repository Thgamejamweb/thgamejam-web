import Bottombar from "@/component/footer";
import NavBar from "@/component/navbar";
import { competitionApi } from "@/http/http_api";
import { Box, Button, Card, CardActionArea, CardContent, CardMedia, Grid, Typography } from "@mui/material";
import { Divider } from "antd";
import  React,{ useState } from "react";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import { ItemCard } from "./home/home";



interface CompetitionDetial {
    startSignUp: string,
    endSignUp: string,
    start: string,
    end: string,
    startScore: string,
    endScore: string,
    content: string,
}
interface WorkInfo{
    teamId:number,
    teamName:string,
    workName:string,
    image:string,
    description:string,
}

function CompetitionIntro(info: CompetitionDetial) {

    const startSignUpDate: Date = new Date(info.startSignUp);
    const endSignUpDate: Date = new Date(info.endSignUp);
    const startDate: Date = new Date(info.start);
    const endDate: Date = new Date(info.end);
    const scoreStartDate: Date = new Date(info.startScore);
    const scoreEndDate: Date = new Date(info.endScore);

    const now = new Date().getTime();

    const signUp: boolean = now > startSignUpDate.getTime() && now < endSignUpDate.getTime();

    const preparation: boolean = now > endSignUpDate.getTime() && now < startDate.getTime();
    const started: boolean = now > startDate.getTime() && now < endDate.getTime();
    const scorePreparation: boolean = now > endDate.getTime() && now < scoreStartDate.getTime();
    const score: boolean = now > scoreStartDate.getTime() && now < scoreEndDate.getTime();
    const a = "dad"
    const end: boolean = now > scoreEndDate.getTime();
    return (
        <Box sx={{ width: '100%', pt: '150px', pb: '150px', display: 'flex', justifyContent: 'center' }}>
            <Card sx={{ width: '60%', bgcolor: '#9EBCF0' }}>
                <CardContent >
                    <Box sx={{ height: '100px' }}>
                        <Typography variant="h2" sx={{ pt: '10px' }}>
                            adadadadada
                        </Typography>
                        <Typography variant="h6">
                            hosted by
                        </Typography>
                    </Box>
                    <Divider ></Divider>
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <Box sx={{
                            width: '70%', height: '130px',
                            borderRadius: '8px', overflow: 'auto', border: '1px solid white',
                            color: 'black'
                        }}>
                            <Box sx={{
                                height: '40%',
                                display: 'flex', justifyContent: 'center', alignItems: 'center',
                                borderBottom: '1px solid white'
                            }}>
                                {signUp ? 'sign up period' : preparation ? 'preparation time' :
                                    started ? 'jaming' : score ? ' scoring' :
                                        end ? 'end' : ''}

                            </Box>
                            <Box sx={{
                                height: '59%',
                                display: 'flex', justifyContent: 'center', alignItems: 'center',
                            }}>
                                <Grid container sx={{ height: '100%' }}>
                                    <Grid xs={signUp ? 8 : 12} sx={{
                                        display: 'flex', justifyContent: 'center', alignItems: 'center',
                                        borderRight: '1px solid white'
                                    }} >
                                        From {
                                            signUp ? info.startSignUp : preparation ? info.endSignUp :
                                                started ? info.start : score ? info.startScore :
                                                    end ? info.endScore : ''} {" "}
                                        To {
                                            signUp ? info.endSignUp : preparation ? info.start :
                                                started ? info.end : score ? info.endScore :
                                                    end ? ' ' : ''

                                        }
                                    </Grid>
                                    <Grid xs={4} sx={{ display: signUp ? 'flex' : 'none', justifyContent: 'center', alignItems: 'center' }}  >
                                        <Button sx={{ color: 'white', bgcolor: 'black' }}>Join Jam</Button>
                                    </Grid>
                                </Grid>
                            </Box>
                        </Box>
                    </Box>
                    <Divider></Divider>
                    <Box >
                        <ReactMarkdown>
                            {info.content}
                        </ReactMarkdown>
                    </Box>
                </CardContent>
            </Card>
        </Box >
    )
}


function WorkCommitedShowArea() {

    const worksCommited:WorkInfo[] = [{
        teamId:1,
        teamName:'ada',
        workName:'adad',
        image:'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&w=350&dpr=2',
        description:'adad'
    },{
        teamId:1,
        teamName:'ada',
        workName:'adad',
        image:'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&w=350&dpr=2',
        description:'adad'
    },{
        teamId:1,
        teamName:'ada',
        workName:'adad',
        image:'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&w=350&dpr=2',
        description:'adad'
    },{
        teamId:1,
        teamName:'ada',
        workName:'adad',
        image:'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&w=350&dpr=2',
        description:'adad'
    },{
        teamId:1,
        teamName:'ada',
        workName:'adad',
        image:'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&w=350&dpr=2',
        description:'adad'
    },{
        teamId:1,
        teamName:'ada',
        workName:'adad',
        image:'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&w=350&dpr=2',
        description:'adad'
    }];
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

    for (let idx = 0; idx < worksCommited.length; idx += numEveryColumn) {
        const end: number = idx + numEveryColumn > worksCommited.length ? worksCommited.length : idx + numEveryColumn;
        //console.log(area.items[idx].image)
        items.push(
            <Grid container>
                {
                    worksCommited.slice(idx, end).map((work) => {
                        return (
                            <Grid xs={12 / numEveryColumn} sx={{ display: 'flex', alignItems: 'center' }}>
                               <ItemCard id={work.teamId} description={work.description} name={work.teamName} image={work.image} ></ItemCard>
                            </Grid>
                        )
                    })
                }
            </Grid>
        )
    }
    return (
        <Box sx={{ bgcolor: '#9EBCF0' ,px:'30px'}}>
            <Box sx={{height:'100px',display:'flex',alignItems:'center',color:'white'}}>
                <Typography variant="h2">Submitted so far</Typography>
            </Box>
            <Divider style={{marginTop:0}}></Divider>
            <Box>
                {items}
            </Box>
        </Box>
    )
}

export default function CompetitionPage() {

    const info: CompetitionDetial = {
        startSignUp: "2023-06-28 02:44:14",
        endSignUp: "2023-06-29 02:44:14",
        start: "2023-06-30 02:44:14",
        end: "2023-07-28 02:44:14",
        startScore: "2023-07-29 02:44:14",
        endScore: "2023-07-30 02:44:14",
        content: "# Hello, *world*!",
    }
    return (
        <>
            <NavBar></NavBar>

            <CompetitionIntro
                startSignUp={info.startSignUp}
                endSignUp={info.endSignUp}
                start={info.start}
                end={info.end}
                startScore={info.startScore}
                endScore={info.endScore}
                content={info.content}
            />
            <WorkCommitedShowArea></WorkCommitedShowArea>
            <Bottombar></Bottombar>
        </>
    )
}

