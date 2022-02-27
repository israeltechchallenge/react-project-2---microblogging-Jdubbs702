import './Line.css';
export const Line = (props) => {
    return (
        <div className="Line" justify={props.between ? 'between':''} direction={props.column ? 'column':''} align={props.start ? 'flex-start':''}>
            {props.children}
        </div>
    );
}
 
export default Line; 