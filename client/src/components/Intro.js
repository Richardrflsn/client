import { Container, Row, Col, Button } from 'react-bootstrap'

const Intro = () => {
    return (
        <div className="border intro d-flex text-center justify-content-center align-items-center">
            <Container className="d-flex justify-content-center
            align-item-center">
                <Row>
                    <Col>
                        <div className="title">KnapSack Problem</div>
                        <div className="subTitle">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin quis ligula quis sapien laoreet eleifend at et elit.
                            Pellentesque sed nisi quis arcu lacinia luctus. Quisque elementum a arcu eget convallis. Donec convallis, neque</div>
                        <div className="introButton mt-2">
                            <Button>Start</Button>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default Intro