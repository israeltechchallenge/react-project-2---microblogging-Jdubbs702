import './Icon.css'
export const Icon = (props) => {
    return (
        <div className={`${props.i}`}>
        <i className={`fas fa-${props.i}`}></i>
        </div>
    );
}
 
export default Icon;