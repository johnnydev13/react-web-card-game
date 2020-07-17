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


export const moveSpin = (fromLeft, fromTop, toLeft, toTop) => {
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
};

const calcAnimationValueForIteration = (size, step, interation, interationsCount) => {
    let halfWay = interationsCount / 2;
    let newSize = interation < halfWay ? (size + (step * interation )) : (size + (step * (interationsCount - (interation + 1))));
    return newSize;
};

/*export const moveThrowOld = (fromLeft, fromTop, toLeft, toTop, width, height) => {
    let animation = getMoveFrames(fromLeft, fromTop, toLeft, toTop);
    let keyFrames = Object.keys(animation);
    let keysCount = keyFrames.length;

    const rotateTo = cardThrowConfig.rotateTo;
    const resizeRatio = cardThrowConfig.resizeRatio;
    let rotateStep = rotateTo / keysCount;

    let halfWay = (keysCount / 2);
    let widthDiff = (width * resizeRatio) - width;
    let widthStep = widthDiff / halfWay;
    let heightDiff = (height * resizeRatio) - height;
    let heightStep = heightDiff / halfWay;

    for (let i = 0; i < keysCount; i++) {
        let keyFrame = keyFrames[i];
        let newWidth = calcAnimationValueForIteration(width, widthStep, i, keysCount);
        let newHeight = calcAnimationValueForIteration(height, heightStep, i, keysCount);

        animation[keyFrame] = {
            ...animation[keyFrame],
            transform: 'rotate(' + (rotateStep * i)  + 'deg)',
            width: newWidth + 'px',
            height: newHeight + 'px',
        }
    }

    return getAnimation(animation, 'move');
};*/

export const moveThrow = (fromLeft, fromTop, toLeft, toTop) => {
    let animation = getMoveFrames(fromLeft, fromTop, toLeft, toTop);
    let keyFrames = Object.keys(animation);
    let keysCount = keyFrames.length;

    const rotateTo = cardThrowConfig.rotateTo;
    const scaleRatio = cardThrowConfig.resizeRatio;
    let rotateStep = rotateTo / keysCount;
    let scaleStep = (scaleRatio - 1) / (keysCount / 2);

    for (let i = 0; i < keysCount; i++) {
        let keyFrame = keyFrames[i];
        let scale = calcAnimationValueForIteration(1, scaleStep, i, keysCount);

        animation[keyFrame] = {
            ...animation[keyFrame],
            transform: 'rotate(' + (rotateStep * i)  + 'deg) scale(' + scale + ',' + scale + ')',
        }
    }

    return getAnimation(animation, 'move');
};

export const moveThrowStyles = (fromLeft, fromTop, toLeft, toTop, width, height) => {
    let moveThrowFrames = moveThrow(fromLeft, fromTop, toLeft, toTop, width, height);

    return {
        ...moveThrowFrames,
        transform: 'rotate(' + cardThrowConfig.rotateTo + 'deg)',
        position: 'absolute',
        left: toLeft + 'px',
        top: toTop + 'px',
    }
};
