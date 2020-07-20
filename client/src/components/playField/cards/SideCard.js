import React from 'react';
import EnemyCard from './EnemyCard';

export default class SideCard extends React.PureComponent {
    state =  {
        isInit: true,
    };

    render() {
        return (
            <EnemyCard className={'side-card'} floatDirecton={'side'}/>
        );
    }
}

