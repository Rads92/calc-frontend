import React, {useEffect, useState} from 'react'
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'
import {get, remove} from '../axios';

export const StoreComponent = ({name}) => {
    const nameLowerCase = name.toLowerCase();
    const [products, setProducts] = useState([])
    useEffect(() => {
        get(nameLowerCase)
            .then(res => setProducts(res.data[nameLowerCase]))
    }, [name]);

    const deleteProduct = id => {
        remove(`${nameLowerCase}/${id}`)
            .then(res => setProducts(res.data[nameLowerCase]))
    }

    return products.length
        ? (
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Dostawa</th>
                        <th>Stan początkowy [kg]</th>
                        <th>Stan obecny [kg]</th>
                        <th>Cena [zł/kg]</th>
                        <th />
                    </tr>
                </thead>
                <tbody>
                    {products.map((prod, index) => (
                        <tr key={`key-${prod.id}`}>
                            <td>{index + 1}</td>
                            <td>{prod.dostawa}</td>
                            <td>{prod.ilosc}</td>
                            <td>{prod.stan}</td>
                            <td>{prod.cena}</td>
                            <td>
                                <Button variant="danger" onClick={() => deleteProduct(prod.id)}>
                                    Usuń
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        )
        : <h3>Nic tu nie ma...</h3>
};
