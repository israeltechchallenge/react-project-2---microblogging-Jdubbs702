import './Btn.css'
export const Btn = (props) => {
    return (
        <button disabled={props.disabled} className="Btn" onClick={props.onClick}>
            {props.children}
        </button>
    );
}
 
export default Btn;