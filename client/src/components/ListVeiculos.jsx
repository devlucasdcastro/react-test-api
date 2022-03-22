import { React, useState, useEffect, Fragment } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from '@mui/material/Button';
import Modal from "./Modal"

const Veiculos = (props) => {
    return props.veiculos.map(veiculo =>
        <div style={{display:'flex', justifyContent:'space-around', alignItems:'Center'}}>
            <div>
                {veiculo.nome}
            </div>
            <div>
                <Modal veiculo={veiculo} />
            </div>
        </div>
    )
}

const ListVeiculos = () => {

    const [isFilter, setIsFilter] = useState(false)
    const [veiculos, setVeiculos] = useState([])
    const [tipos, setTipos] = useState([])
    const [selectedType, setSelectedType] = useState(0)

    const filter = (tipo) => {
        setIsFilter(true);
        setVeiculos(veiculos.filter(veiculo => veiculo.tipo == tipo))

    }

    const getVeiculos = async () => {
        try {
            const response = await fetch("http://localhost:5000/veiculos");
            const jsonData = await response.json();
            setVeiculos(jsonData);
        } catch (error) {
            console.error(error.message)
        }
    }

    const getTipos = async () => {
        try {
            const response = await fetch("http://localhost:5000/tipos");
            const jsonData = await response.json();
            setTipos(jsonData);
        } catch (error) {
            console.error(error.message)
        }
    }

    useEffect(() => {
        getVeiculos();
        getTipos();
    }, [])

    const resetFilter = () => {
        setSelectedType(0)
    }

    return (
        <>
            <h1>Lista de Veiculos</h1>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <TableCell>{selectedType == 0 ? 'Tipo do Veiculo' : 'Veiculo'} </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {selectedType == 0 && tipos.map((tipo, index) => (
                            <TableRow
                                key={index}
                                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    <Button variant="text" onClick={() => setSelectedType(tipo.id)}> {tipo.descricao}</Button>
                                </TableCell>
                            </TableRow>
                        ))}

                        {selectedType != 0 &&
                            <Veiculos veiculos={veiculos.filter(veiculo => veiculo.tipo == selectedType)} />}
                    </TableBody>
                </Table>
            </TableContainer>

            {selectedType != 0 && (<Button onClick={resetFilter}>Resetar Filtro</Button>)}


        </>

    )
}

export default ListVeiculos