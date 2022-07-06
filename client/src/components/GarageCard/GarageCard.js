import axios from "axios";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { useNavigate } from "react-router-dom";

function GarageCard(props) {

    const {title, image} = props;
   
    const urlParam = title;//title.split(" ")[0];
    const nav = useNavigate();
    const clickHandler = () => {
        nav(`/reportSelect/${urlParam}`)
    }
    return (
        
        <Card className="m-3" style={{ width: '15rem'}}>
            <Card.Img variant="top" src={image} />
            <Card.Body>
                <Card.Title>{title}</Card.Title>
                <Card.Text>
                </Card.Text>
                <Button variant="primary" onClick={clickHandler}>Select Reports</Button>
            </Card.Body>
        </Card>
    );
}

export default GarageCard;