import { useNavigation } from "react-router-dom";

function Spinner (){
    const navigation = useNavigation();

    const spinner =
        navigation.state === "loading" ?
        <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
        </div>
        : <div></div>


    return spinner;
}

export default Spinner;