import { pulse } from 'react-animations';
import Radium from 'radium';

import { cardThrow as cardThrowConfig } from '../config/animation';

const getAnimation = (animation, animationName, ...styles) => ({...{
        animation: `x ${cardThrowConfig.speed}s`,
        animationName: Radium.keyframes(animation, animationName)
    }, ...styles});

export const pulseAnimation = () => {
    return getAnimation(pulse, 'pulse');
};

const getMoveFrames = (fromLeft, fromTop, toLeft, toTop) => {
    let step = 100 / cardThrowConfig.frames;
    let leftDiff =  toLeft - fromLeft;
    let leftStep = leftDiff === 0 ? 0 : leftDiff / cardThrowConfig.frames;
    let topDiff =  toTop - fromTop;
    let topStep = topDiff === 0 ? 0 : topDiff / cardThrowConfig.frames;

    let animation = {};

    for (let i = 0; i <= cardThrowConfig.frames; i++) {
        let keyFrame = (step * i) + '%';
        let j = i + 1;
        let left = (fromLeft + leftStep * j);
        let top = (fromTop + topStep * j);

        animation[keyFrame] = {
            left: Math.floor(left) + 'px',
            top: Math.floor(top) + 'px',
        };
    }

    return animation;
};

export const move = (fromLeft, fromTop, toLeft, toTop) => {
    return getAnimation(getMoveFrames(fromLeft, fromTop, toLeft, toTop), 'move');
};

/*export const moveSpin = (fromLeft, fromTop, toLeft, toTop) => {
    let animation = getMoveFrames(fromLeft, fromTop, toLeft, toTop);
    let keyFrames = Object.keys(animation);
    let keysCount = keyFrames.length;

    const rotateTo = cardThrowConfig.rotateTo;
    let rotateStep = rotateTo / keysCount;

    for (let i = 0; i < keysCount; i++) {
        let keyFrame = keyFrames[i];
        animation[keyFrame] = {...animation[keyFrame], transform: 'rotate(' + (rotateStep * i)  + 'deg)'}
    }

    return getAnimation(animation, 'move');
};*/

const calcAnimationValueForIteration = (size, step, interation, interationsCount) => {
    let halfWay = interationsCount / 2;
    let newSize = interation < halfWay ? (size + (step * interation )) : (size + (step * (interationsCount - (interation + 1))));
    return newSize;
};

export const moveThrow = (fromLeft, fromTop, toLeft, toTop, throwType) => {
    let animation = getMoveFrames(fromLeft, fromTop, toLeft, toTop, throwType);
    let keyFrames = Object.keys(animation);
    let keysCount = keyFrames.length;

    const rotateTo = cardThrowConfig.rotateToByType[throwType];
    const scaleRatio = cardThrowConfig.resizeRatio;


    let rotateStep = rotateTo / keysCount;
    let scaleStep = (scaleRatio - 1) / (keysCount / 2);

    for (let i = 0; i < keysCount; i++) {
        let keyFrame = keyFrames[i];
        let scale = calcAnimationValueForIteration(1, scaleStep, i, keysCount);

        animation[keyFrame] = {
            ...animation[keyFrame],
            transform: 'rotate(' + (rotateStep * i)  + 'deg) scale(' + scale + ',' + scale + ')',
            zIndex: throwType,
        }
    }

    return getAnimation(animation, 'move');
};

export const getPositionOffsetByType = (left, top, throwType) => {
    const offsets = cardThrowConfig.positionOffsetByType[throwType];

    return {
        left: left + offsets.left,
        top: top + offsets.top,
    }
};
export const getEndStyles = (toLeft, toTop, throwType) => {
    let { left, top } = getPositionOffsetByType(toLeft, toTop, throwType);

    return {
        transform: 'rotate(' + cardThrowConfig.rotateToByType[throwType] + 'deg)',
        position: 'absolute',
        left: left + 'px',
        top: top + 'px',
        zIndex: throwType,
        marginLeft: '0',
    };
};
export const moveThrowStyles = (fromLeft, fromTop, toLeft, toTop, throwType) => {
    let { left, top } = getPositionOffsetByType(toLeft, toTop, throwType);

    let moveThrowFrames = moveThrow(fromLeft, fromTop, left, top, throwType);

    return {
        ...moveThrowFrames,
        ...getEndStyles(toLeft, toTop, throwType)
    }
};

export const throwFromNowhereStyles = (fromLeft, fromTop, toLeft, toTop, throwType) => {
    /* TODO make fading out animation here*/

    return moveThrowStyles(fromLeft, fromTop, toLeft, toTop, throwType);
};

export const throwToNowhereStyles = (fromLeft, fromTop, toLeft, toTop, throwType) => {
    /* TODO make fading out animation here*/

    return moveThrowStyles(fromLeft, fromTop, toLeft, toTop, throwType);
};

export const getAreaThrowPoint = (areaBounds, throwType) => {
    let { left, top } = getPositionOffsetByType(areaBounds.width / 2 + areaBounds.left, areaBounds.top, throwType);

    return {
        top,
        left
    }
};

const rand = (max) => {
    return Math.ceil(Math.random() * Math.floor(max))
};

export const getRandomOutsidePosition = (elementWith, elementHeight) => {
    let toLeft, toTop;
    let isLeftRandom = rand(2) === 2;
    let gap = 300;

    switch (Math.ceil(Math.random() * Math.floor(2))) {
        case 1:
            toLeft = isLeftRandom ? rand(elementWith) : gap * -1;
            toTop  = !isLeftRandom ? rand(elementHeight) : gap * -1;
            break;
        default:
            toLeft = isLeftRandom ? rand(elementWith) : elementWith + gap;
            toTop  = !isLeftRandom ? rand(elementHeight) : elementHeight + gap;
            break;

    }

    return { toLeft, toTop };
};

/*export const getThrowTypeByPlayersCount = (currentPlayerIndex, playersCount) => {
    /*
     * the point is to make fixed animation types depending on players count
     * whis is not supposed to be here
     *
     * TODO: make it not here!!
     */
    /*let throwType;

    if (currentPlayerIndex === 0) {
        throwType = cardThrowConfig.types.first;
    } else {
        switch (playersCount) {
            case 2:
                throwType = cardThrowConfig.types.third;
                break;
            case 3:
                throwType = currentPlayerIndex === 1 ? cardThrowConfig.types.second : cardThrowConfig.types.fifth;
                break;
            case 4:
                throwType = currentPlayerIndex === 1 ? cardThrowConfig.types.second : (currentPlayerIndex === 2 ? cardThrowConfig.types.third : cardThrowConfig.types.fifth);
                break;
            case 5:
                throwType = cardThrowConfig.types[Object.keys(cardThrowConfig.types)[currentPlayerIndex]];
                break;
            default:
                throwType = cardThrowConfig.types.first;
                break;
        }
    }

    return throwType;
};*/
