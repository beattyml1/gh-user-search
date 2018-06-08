// props: { onSearch: function, label, onValueChange }
import * as React from "react";
export function SearchBox(props) {
    let id = props.id || "search";
    let onValueChange = props.onValueChange || (() => {});

    return (
        <form role={"search"} onSubmit={props.onSearch}>
            <input type={"search"} role={"search"} placeholder={props.label} aria-label={props.label}
                   onChange={props.onValueChange} autoFocus={true} spellCheck="false"/>
            <button type={"submit"}>Search</button>
        </form>
    );
}