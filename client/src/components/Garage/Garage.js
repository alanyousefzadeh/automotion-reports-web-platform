import axios from "axios";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

function Garage(props) {
    const {title, image} = props;
    return (
        <Card className="m-3" style={{ width: '15rem'}}>
            <Card.Img variant="top" src={image} />
            <Card.Body>
                <Card.Title>{title}</Card.Title>
                <Card.Text>
                Some quick example text to build on the card title and make up the bulk of
                the card's content.
                </Card.Text>
                <Button variant="primary">See Report</Button>
            </Card.Body>
        </Card>
    );
}

export default Garage;