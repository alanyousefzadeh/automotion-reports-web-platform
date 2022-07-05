import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { useNavigate } from "react-router-dom";

function ReportCard(props) {

    const {title} = props;
    const urlParam = title.split(" ")[0]
    const nav = useNavigate();
    const clickHandler = async() => {
        nav(`${urlParam}`);
    }

    return (
        <Card className="m-3" style={{ width: '15rem'}}>
            <Card.Body>
                <Card.Title>{title}</Card.Title>
                <Card.Text>
                Some quick example text to build on the card title and make up the bulk of
                the card's content.
                </Card.Text>
                <Button variant="primary" onClick={clickHandler}>See Report</Button>
            </Card.Body>
        </Card>
    );
}

export default ReportCard;