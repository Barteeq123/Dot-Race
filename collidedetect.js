export function collidedetect(rect1, rect2) {
    if (!(rect1.x > rect2.x + rect2.radius ||
        rect1.x + rect1.width < rect2.x ||
        rect1.y > rect2.y + rect2.radius ||
        rect1.y + rect1.height < rect2.y
    )) {
        return true;
    } else {
        return false;
    }
}