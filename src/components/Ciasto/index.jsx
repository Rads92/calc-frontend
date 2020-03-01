import React, {useEffect, useState} from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import {get, post} from '../../axios';

// Usuwanie inputów
export const CiastoForm = ({goToStore}) => {
    useEffect(() => {
        get('stan')
            .then(res => {
                setCukier(res.data.cukier.filter(el => el.stan > 0))
                setSyrop(res.data.syrop.filter(el => el.stan > 0))
                setZiola(res.data.ziola.filter(el => el.stan > 0))
            });
    }, []);
    const NAMES = ['Cukier', 'Syrop', 'Zioła'];
    const [cukier, setCukier] = useState([])
    const [syrop, setSyrop] = useState([])
    const [ziola, setZiola] = useState([])
    const [selectedCukier, setSelectedCukier] = useState([])
    const [selectedSyrop, setSelectedSyrop] = useState([])
    const [selectedZiola, setSelectedZiola] = useState([])

    const [partia, setPartia] = useState('')


    const onSubmit = (e) => {
        e.preventDefault();
        post('ciasto', {
            partia,
            cukier: selectedCukier,
            syrop: selectedSyrop,
            ziola: selectedZiola,
        })
        .then(() => goToStore())
    }

    const onSelect = (event, name) => {
        const id = event.target.value;
        switch (name) {
            case 'Cukier':
                setSelectedCukier([...selectedCukier, {...cukier.find(c => +c.id === +id), zuzyte: 0}])
                setCukier(cukier.filter(c => +c.id !== +id))
                break;
            case 'Syrop':
                setSelectedSyrop([...selectedSyrop, {...syrop.find(c => +c.id === +id), zuzyte: 0}])
                setSyrop(syrop.filter(c => +c.id !== +id))
                break;
            case 'Zioła':
                setSelectedZiola([...selectedZiola, {...ziola.find(c => +c.id === +id), zuzyte: 0}])
                setZiola(ziola.filter(c => +c.id !== +id))
                break;
            default:
                break;
        }
    }

    const onChangeSelected = (name, index, value) => {
        switch (name) {
            case 'Cukier':
                const newCukier = [...selectedCukier];
                newCukier[index]['zuzyte'] = +value
                setSelectedCukier(newCukier)
                break;
            case 'Syrop':
                const newSyrop = [...selectedSyrop];
                newSyrop[index]['zuzyte'] = +value
                setSelectedSyrop(newSyrop)
                break;
            case 'Zioła':
                const newZiola = [...selectedZiola];
                newZiola[index]['zuzyte'] = +value
                setSelectedZiola(newZiola)
                break;

            default:
                break;
        }
    }
    const selection = [selectedCukier, selectedSyrop, selectedZiola];

    return (
        <Form onSubmit={onSubmit}>
            <Form.Group controlId="partia">
                <Form.Label>Partia</Form.Label>
                <Form.Control
                    value={partia}
                    required
                    onChange={e => setPartia(e.target.value)}
                />
            </Form.Group>
            {[cukier, syrop, ziola].map((el, index) => {
                const selected = selection[index];
                console.log(selection)
                if (el.length || selected.length) {
                    return (
                        <div key={index}>
                            {!!el.length &&(
                            <Form.Group controlId={NAMES[index]} key={NAMES[index]}>
                                <Form.Label>{NAMES[index]}</Form.Label>
                                <Form.Control as="select" onChange={(e) => onSelect(e, NAMES[index])}>
                                    <option>Wybierz z listy</option>
                                    {el.map(c => (
                                        <option key={c.id} value={c.id}>
                                            {c.dostawa}: Stan: {c.stan} kg - Cena - {c.cena} zł/kg
                                    </option>))}
                                </Form.Control>
                            </Form.Group>
                            )}
                            {!!selected.length && selected.map((s, i) => (
                                <Form.Group controlId={NAMES[index]} key={'choosen' + NAMES[index]}>
                                    <Form.Label>
                                        {s.dostawa}: Stan: {s.stan} kg - Cena - {s.cena} zł/kg
                                    </Form.Label>
                                    <Form.Control
                                        type="number"
                                        required
                                        value={s.zuzyte}
                                        onChange={e => onChangeSelected(
                                            NAMES[index],
                                            i,
                                            e.target.value,
                                        )}
                                        max={+s.stan}
                                        min={0}
                                        isInvalid={s.zuzyte > s.stan}
                                    />
                                </Form.Group>))
                            }
                        </div>
                    )
                }
            })}


            <Button variant="primary" type="submit">
                Wyślij
            </Button>
        </Form>
    )
}