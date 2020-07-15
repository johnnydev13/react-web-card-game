import ReactDOM from 'react-dom';

export const DRAG_AND_DROP_BEGIN_DRAG = 'DRAG_AND_DROP_BEGIN_DRAG';
export const DRAG_AND_DROP_END_DRAG   = 'DRAG_AND_DROP_END_DRAG';

export function beginDrag (cards) {
    let origins = cards.map((elem) => {
        return ReactDOM.findDOMNode(elem);
    });

    return {
        type: DRAG_AND_DROP_BEGIN_DRAG,
        cards,
        origins
    };
}

export function endDrag () {
    return {
        type: DRAG_AND_DROP_END_DRAG
    };
}
