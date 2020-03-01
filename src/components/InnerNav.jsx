import React, {useState, useCallback} from 'react'
import Nav from 'react-bootstrap/Nav'
import {ProductForm} from './ProductForm'
import {StoreComponent} from './StoreComponent'
import {CiastoForm} from './Ciasto';

export const InnerNav = ({name}) => {
    const [activeTab, setActiveTab] = useState('magazyn');
    const goToStore = useCallback(
        () => setActiveTab('magazyn'),
        [],
    )
    const productForm = name === 'Ciasto'
        ? <CiastoForm goToStore={goToStore}/>
        : <ProductForm name={name} goToStore={goToStore}/>;
    const content = activeTab === "magazyn"
        ? <StoreComponent name={name} goToStore={goToStore}/>
        : productForm;

    return (
        <>
            <Nav
                activeKey={activeTab}
                className="justify-content-center"
                variant="tabs"
                onSelect={setActiveTab}
            >
                <Nav.Item>
                    <Nav.Link eventKey={"magazyn"}>{`${name} - Stan magazynowy`}</Nav.Link>
                </Nav.Item>
                <Nav.Item >
                    <Nav.Link eventKey={"dostawa"}>{`${name} - Dostawa`}</Nav.Link>
                </Nav.Item>
            </Nav>
            {content}
        </>
    )
};
