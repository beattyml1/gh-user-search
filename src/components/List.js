import * as React from 'react';
import './List.css';
export const List = ({items, getItemProps, itemComponent}) => {
    let ItemComponent = itemComponent;
    getItemProps = getItemProps || (x => x);
    return (
        <ul className={"list"} role={"list"}>
            {items.map(item =>
                <div className={"list-item"} role={"listitem"}>
                    <ItemComponent {...getItemProps(item)} />
                </div>
            )}
        </ul>
    );
}