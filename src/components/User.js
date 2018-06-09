import * as React from 'react';
import './User.css'
export const User = (user) =>
    <div className={"user"}>
        <a href={user.link}><img className={"avatar"} src={user.avatarUrl} /></a>
        <span className={"user-info"}>
            <h3>
                <a className={"user-login"} href={user.link}>{user.login}</a>
                <span className={"user-name"}>{user.name}</span>
            </h3>
            <div className={"location"}>{user.location}</div>
            <div className={"user-stats"}>
                <a className={"publicRepositories"} href={user.repositoriesLink}>
                    {user.publicRepositories} public repositories
                </a>
                <a className={"followers"} href={user.followersLink}>
                    {user.followers} followers
                </a>
                <a className={"following"} href={user.followingLink}>
                    {user.following} following
                </a>
            </div>
        </span>
    </div>