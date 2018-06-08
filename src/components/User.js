import * as React from 'react';
import './User.css'
export const User = (user) =>
    <div className={"user"}>
        <img className={"avatar"} src={user.avatarUrl} />
        <span className={"user-info"}>
            <h3>
                <a className={"user-login"} href={user.link}>{user.login}</a>
                <span className={"user-name"}>{user.name}</span>
            </h3>
            <div>
                <span className={"followers"}>{user.followers} followers</span>
                <span className={"location"}>{user.location}</span>
            </div>
        </span>
    </div>