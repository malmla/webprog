import { useParams } from "react-router-dom";
import inventory from "./inventory.mjs";

function ViewIngredient(props) {
    const params = useParams();
    const ingredient = params.name;
    const info = {...inventory[ingredient]};
    
    return (
        <div className="m-3" id="ingredient-details">
            <h4>{ingredient} har följande egenskaper:</h4>
            <p>Pris: {info['price']} kr.</p>
            <p>Vegansk: {info['vegan'] ? ('Ja') : ('Nej')}.</p>
            <p>Innehåller laktos: {info['lactose'] ? ('Ja') : ('Nej')}.</p>
            <p>Innehåller gluten: {info['gluten'] ? ('Ja') : ('Nej')}.</p>
        </div>
    );
}

export default ViewIngredient;