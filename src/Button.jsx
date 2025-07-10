import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';

export default function Button(){

    return (
        <div>
            <Button variant="contained" endIcon={<SendIcon />}>
                Send
            </Button>
        </div>
    );
}