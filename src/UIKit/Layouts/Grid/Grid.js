import './Grid.css'
export const Grid = (props) => {
    return (
        <div className="Grid">
            {props.children}
        </div>
    );
}
 
export default Grid;