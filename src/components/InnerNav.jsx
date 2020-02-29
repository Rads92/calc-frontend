import React, {useState, useCallback} from 'react'
import Nav from 'react-bootstrap/Nav'
import {ProductForm} from './ProductForm'
import {StoreComponent} from './StoreComponent'

export const InnerNav = ({name}) => {
    const [activeTab, setActiveTab] = useState('magazyn');
    const gotToStore = useCallback(
        () => setActiveTab('magazyn'),
        [],
    )
    const content = activeTab === "magazyn"
        ? <StoreComponent name={name} />
        : <ProductForm name={name} goToStore={gotToStore}/>;

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
