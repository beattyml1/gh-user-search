import * as React from 'react';
import './List.css';
export const List = ({items, getItemProps, itemComponent, getKey}) => {
    let ItemComponent = itemComponent;
    getItemProps = getItemProps || (x => x);
    return (
        <ul className={"list"}>
            {items.map(item =>
                <div className={"list-item"} role={"listitem"} key={getKey ? getKey(item) : item}>
                    <ItemComponent {...getItemProps(item)} />
                </div>
            )}
        </ul>
    );
}