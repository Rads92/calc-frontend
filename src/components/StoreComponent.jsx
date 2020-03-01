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
    const isCiasto = nameLowerCase !== 'ciasto';

    return products.length
        ? (
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Dostawa</th>
                        <th>Stan początkowy [kg]</th>
                        {isCiasto && <th>Zużyte [kg]</th>}
                        <th>Stan obecny [kg]</th>
                        <th>Cena [zł/kg]</th>
                        {isCiasto && <th />}
                    </tr>
                </thead>
                <tbody>
                    {products.map((prod, index) => (
                        <tr key={`key-${prod.id}`}>
                            <td>{index + 1}</td>
                            <td>{prod.dostawa || prod.partia}</td>
                            <td>{prod.ilosc}</td>
                            {isCiasto && <td>{prod.zuzyte}</td>}
                            <td>{prod.stan}</td>
                            <td>{prod.cena}</td>
                            <td>
                                {prod.stan === prod.ilosc && (
                                <Button variant="danger" onClick={() => deleteProduct(prod.id)}>
                                    Usuń
                                </Button>)}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        )
        : <h3>Nic tu nie ma...</h3>
};
