
import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert, { AlertColor, AlertProps } from '@mui/material/Alert';

function Alert(props: AlertProps) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

interface SnackbarProps {
    open: boolean
    setOpen: (value: boolean) => void
    message: string
    severity: AlertColor
}

export default function CustomizedSnackbars(props: SnackbarProps) {
    const setSnackbarsState = props.setOpen;

    const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnackbarsState(false);
    };

    return (
        <Snackbar style={{zIndex:99999}} open={props.open} autoHideDuration={2000} onClose={handleClose}>
            <Alert onClose={handleClose} severity={props.severity}>
                {props.message}
            </Alert>
        </Snackbar>
    );
}