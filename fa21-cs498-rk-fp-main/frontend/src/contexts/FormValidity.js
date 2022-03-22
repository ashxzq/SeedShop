export function handleInvalid(e, message) {
    e.target.setCustomValidity(message);
}

export function revertInvalid(e) {
    e.target.setCustomValidity("");
}