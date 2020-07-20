export const cardThrow = {
    speed: .5, // seconds,
    frames: 50,
    resizeRatio: 1.4,

    // throw types for each player
    // expanded settings below
    types: {
        first: 1,
        second: 2,
        third: 3,
        fourth: 4,
        fifth: 5,
    },
    rotateToByType: [],
    positionOffsetByType: [],

    /*
     * this is quick fix for blinking cards on render
     * when a card stoped floating to a deal area
     * the card deletes from player hand and renders on the deal area
     * and makes annoying blink
     * following timeout prevents it, because deleting from
     * players hand processes after creating a card on the deal area
     *
     * if enabled it makes short delay after rendering the card
     * on the deal area and before deleting it from players hands
     * so it looks seamless (obviously depends on PC specs)
     * */
    isBlinkFixEnabled: true,
};

/* rotations of card when thrown on a deal area*/
cardThrow.rotateToByType[cardThrow.types.first] = 100;
cardThrow.rotateToByType[cardThrow.types.second] = 360;
cardThrow.rotateToByType[cardThrow.types.third] = 240;
cardThrow.rotateToByType[cardThrow.types.fourth] = 120;
cardThrow.rotateToByType[cardThrow.types.fifth] = 400;

/* offsets of card when thrown on a deal area*/
cardThrow.positionOffsetByType[cardThrow.types.first] = {left: 40, top: 20};
cardThrow.positionOffsetByType[cardThrow.types.second] = {left: -50, top: -20};
cardThrow.positionOffsetByType[cardThrow.types.third] = {left: 60, top: 80};
cardThrow.positionOffsetByType[cardThrow.types.fourth] = {left: -100, top: -40};
cardThrow.positionOffsetByType[cardThrow.types.fifth] = {left: 50, top: 100};

/* on deal ending need to clear a deal area with animation */
export const dealCardClearing = {
    speed: 2,
};

/* fires after each deal */
export const dealMessage = {
    disappearSpeed: 5,
    destroySpeed: 5, // fires after dissapearing
};

export const cardOnInit = {
    // not a real animation, just css transition,
    // so it will be initial margin to create 'animation'
    // of floating cards on game start
    margin: -100,
    speed: 1, // seconds
};
