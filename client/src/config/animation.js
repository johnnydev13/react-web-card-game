export const cardThrow = {
    speed: .5, // seconds,
    frames: 50,
    resizeRatio: 1.4,
    rotateTo: 400, // degrees

    // positioning of card on a deal area
    // TODO expand config with more clear settings
    types: {
        first: 1,
        second: 2,
        third: 3,
        fourth: 4,
        fifth: 5,
    },
    rotateToByType: [],
    positionOffsetByType: [],
};
cardThrow.rotateToByType[cardThrow.types.first] = 100;
cardThrow.rotateToByType[cardThrow.types.second] = 360;
cardThrow.rotateToByType[cardThrow.types.third] = 240;
cardThrow.rotateToByType[cardThrow.types.fourth] = 120;
cardThrow.rotateToByType[cardThrow.types.fifth] = 400;

cardThrow.positionOffsetByType[cardThrow.types.first] = {left: 40, top: 20};
cardThrow.positionOffsetByType[cardThrow.types.second] = {left: -50, top: -20};
cardThrow.positionOffsetByType[cardThrow.types.third] = {left: 100, top: 80};
cardThrow.positionOffsetByType[cardThrow.types.fourth] = {left: 200, top: -40};
cardThrow.positionOffsetByType[cardThrow.types.fifth] = {left: 50, top: 100};

export const dealCardClearing = {
    speed: 2,
};

export const dealMessage = {
    disappearSpeed: 5,
    destroySpeed: 5, // fires after dissapearing
};

export const cardOnInit = {
    // not a real animation, just css transition,
    // so it will be initial margin to create 'animation'
    // of floating cards on game start
    margin: -100,
};
