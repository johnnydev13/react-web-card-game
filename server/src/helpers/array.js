export const sortByIntValue = (a, b) => {
    let an = parseInt(a);
    let bn = parseInt(b);
    if (an < bn) { return 1; }
    if (an > bn) { return -1; }
    return 0;
};
export const sortByIntValueAsc = (a, b) => {
    let an = parseInt(a);
    let bn = parseInt(b);
    if (an < bn) { return -1; }
    if (an > bn) { return 1; }
    return 0;
};
