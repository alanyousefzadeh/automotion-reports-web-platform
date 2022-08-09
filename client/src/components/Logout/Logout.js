import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/esm/Button";

function Logout(){
    
    
    const nav = useNavigate();
    const handleLogout = () => {
        sessionStorage.removeItem("token");
        nav('/login');
        
    };

    return (
        <Button onClick={handleLogout}>logout</Button>
    )


}

export default Logout

