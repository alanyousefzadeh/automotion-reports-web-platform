import Card from 'react-bootstrap/Card';
import { useNavigate } from "react-router-dom";

function AdminCard(props) {

    const {title} = props;
    const urlParam = title.split(" ")[0]
    const nav = useNavigate();
    const clickHandler = async() => {
        nav(`${urlParam}`);
    }

    return (
        <button className="report-card__button" onClick={clickHandler}>
        <Card className="m-3" style={{ width: '15rem'}}>
            <Card.Body>
                <Card.Title>{title}</Card.Title>
            </Card.Body>
        </Card>
        </button>
    );
}

export default AdminCard;