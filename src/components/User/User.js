import * as React from 'react';
import './User.css'
import {thingCountLabel} from "../../services/Pluralization";
export const User = (user) =>
    <div className={"user"}>
        <a href={user.link}>
            <img className={"avatar"} src={user.avatarUrl} alt={`@${user.login} Avatar`} />
        </a>
        <span className={"user-info"}>
            <h3>
                <a className={"user-login"} href={user.link}>{user.login}</a>
                <span className={"user-name"}>{user.name}</span>
            </h3>
            <div className={"location"}>{user.location}</div>
            <div className={"user-stats"}>
                <a className={"publicRepositories"} href={user.repositoriesLink}>
                    {thingCountLabel(user.publicRepositories, 'public repository')}
                </a>
                <a className={"followers"} href={user.followersLink}>
                    {thingCountLabel(user.followers, 'follower')}
                </a>
                <a className={"following"} href={user.followingLink}>
                    {thingCountLabel(user.following, 'following')}
                </a>
                <a className={"starred"} href={user.starredLink}>
                    {thingCountLabel(user.starred, 'starred')}
                </a>
            </div>
        </span>
    </div>