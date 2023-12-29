import { Navbar, Container, Nav } from "react-bootstrap"

const NavigationBar = () => {
    return (
        <div>
        <Navbar variant="light">
            <Container>
                <Navbar.Brand>Richardrflsn</Navbar.Brand>
                <Nav>
                    <Nav.Link>Introduction</Nav.Link>
                    <Nav.Link>Main Program</Nav.Link>
                </Nav>
            </Container>
        </Navbar>
        </div>
    )
}

export default NavigationBar