export const preventDefault = action => e => {
    action(e);
    e.preventDefault();
    return false;
}