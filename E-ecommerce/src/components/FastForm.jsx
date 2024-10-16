import { useState } from "react";


export default function FastForm({ children, onSubmit, ...props }) {
    const [state, setState] = useState({});

    function _onChange(event) {
        console.log()
        state[event.target.name] = event.target.value
        setState(
            { ...state }
        );
        console.log(state);
    }

    function _onSubmit(event) {
        event.preventDefault();
        onSubmit(state);
    }

    return (<form onSubmit={_onSubmit}  {...props}>
        {children.map((child) => (
            <child.type onChange={_onChange} {...child.props} />
        ))}
    </form>
    );
}