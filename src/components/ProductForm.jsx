import React, {useState} from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { post } from '../axios';

export const ProductForm = ({name, goToStore}) => {
    const [dostawa, setDostawa] = useState('')
    const [ilosc, setIlosc] = useState('')
    const [cena, setCena] = useState('')

    const onSubmit = (e) => {
        e.preventDefault();
        post(name.toLowerCase(), {
            dostawa,
            ilosc,
            cena
        })
        .then(() => {
            goToStore();
        });
    }
    return (
        <Form onSubmit={onSubmit}>
            <Form.Group controlId="dostawa">
                <Form.Label>Dostawa</Form.Label>
                <Form.Control
                    value={dostawa}
                    required
                    onChange={e => setDostawa(e.target.value)}
                />
            </Form.Group>
            <Form.Group controlId="ilosc">
                <Form.Label>Ilość</Form.Label>
                <Form.Control
                    required
                    type="number"
                    value={ilosc}
                    onChange={e => setIlosc(e.target.value)}
                />
            </Form.Group>
            <Form.Group controlId="cena">
                <Form.Label>Cena</Form.Label>
                <Form.Control
                    type="number"
                    required
                    value={cena}
                    onChange={e => setCena(e.target.value)}
                />
            </Form.Group>
            <Button variant="primary" type="submit">
                Wyślij
            </Button>
        </Form>
    )
}