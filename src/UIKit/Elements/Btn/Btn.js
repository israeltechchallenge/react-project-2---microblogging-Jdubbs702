import './Btn.css'
export const Btn = (props) => {
    return (
        <button className="Btn" onClick={props.onClick}>
            {props.children}
        </button>
    );
}
 
export default Btn;