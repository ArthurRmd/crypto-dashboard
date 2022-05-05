import React from 'react';

export interface ProfileProps {
    isLogged: boolean;
}

export default function Profile({isLogged}: ProfileProps) {

    const loggedTemplate = (<p>Logged</p>);
    const notLoggedTemplate = (<p>Not logged</p>);


    return isLogged ? loggedTemplate : notLoggedTemplate;
}
