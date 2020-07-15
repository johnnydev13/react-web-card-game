import { DRAG_AND_DROP_BEGIN_DRAG, DRAG_AND_DROP_END_DRAG } from '../actions/dragAndDrop';

const initialState = {
  isDragging: false,
  dragOrigins: [],
  dragNodes: [],
  dragCards: []
};

export default function dragAndDrop (state = initialState, action) {
  switch (action.type) {
    case DRAG_AND_DROP_BEGIN_DRAG: {
      let dragOrigins = action.origins.map((elem) => {
        return { x: elem.offsetLeft,
                 y: elem.offsetTop };
      });
      return {
        isDragging: true,
        dragOrigins,
        dragNodes: action.origins,
        dragCards: action.cards
      };
    }

    case DRAG_AND_DROP_END_DRAG: {
      return initialState;
    }
    default:
      return state;
  }
}
