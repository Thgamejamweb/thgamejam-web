import { Box, Link } from "@mui/material";


export default function Bottombar() {

    return (
        <Box fontSize={20} fontWeight={500} sx={{ height: 150 ,bgcolor: '#F4F4F4', pt: '60px' }}>
            <Box sx={{ width: '100%', height: '40px', display: 'flex', flexDirection: 'row', justifyContent: 'center', lineHeight: '40px' }}>
                <Link sx={{ px: '12px' }} href="#" underline="none">
                    about
                </Link>
                <Link sx={{ px: '12px' }} href="#" underline="none">
                    about
                </Link>
                <Link sx={{ px: '12px' }} href="#" underline="none">
                    about
                </Link>
            </Box>
            <Box  sx={{ width: '100%', height: '40px', display: 'flex', flexDirection: 'row', justifyContent: 'center', lineHeight: '40px' }}>
                <Link sx={{ px: '12px' }} href="#" underline="none">
                    about
                </Link>
                <Link sx={{ px: '12px' }} href="#" underline="none">
                    about
                </Link>
            </Box>
        </Box>
    )
}