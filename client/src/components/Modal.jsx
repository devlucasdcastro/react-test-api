import React, { useState } from "react"
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import DialogContent from '@mui/material/DialogContent'



const Modal = (props) => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    console.log(props.props)
    return (
        <>
            <Button variant="contained" onClick={handleOpen}>Detalhes</Button>

            <Dialog fullWidth={true} maxWidth={'md'} onClose={handleClose} style={{display:'flex', justifyContent:'center'}} open={open}>
                <DialogTitle>Descrição: {props.veiculo.descricao}</DialogTitle>
                <DialogContent >{props.veiculo.img ? <img src={`http://localhost:5000/${props.veiculo.img}`}/> : 'O Veículo não possui imagem'}</DialogContent>                   
            </Dialog>
        </>
    )

}

export default Modal