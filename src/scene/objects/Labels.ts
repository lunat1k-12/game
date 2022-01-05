import k from "../../kaboom";

const { add, origin, sprite, solid, body, area, pos, text, color } = k

export function drawLabels() {
    add([text("Welcome to\n Liquibase Dungeon", {size: 10, font: 'apl386'}), pos(172, 250), 'level-part'])
    add([text("What is\n Liquibase?", {size: 10, font: 'apl386'}), pos(475, 295), 'level-part'])
    add([text("Why do we\n need it?", {size: 10, font: 'apl386'}), pos(573, 250), 'level-part'])
    add([text("Problems of\n manual changes", {size: 10, font: 'apl386'}), pos(560, 330), 'level-part'])

    add([text("Liquibase major concepts", {size: 14, font: 'apl386'}), pos(550, 33), 'level-part'])
    add([text("Changelog file", {size: 10, font: 'apl386'}), pos(365, 50), 'level-part'])
    add([text("Liquibase changeset", {size: 10, font: 'apl386'}), pos(190, 50), 'level-part'])

    add([text("Preconditions", {size: 10, font: 'apl386'}), pos(20, 220), 'level-part'])

    add([text("Changeset context", {size: 10, font: 'apl386'}), pos(217, 545), 'level-part'])

    add([text("Tips and tricks", {size: 10, font: 'apl386'}), pos(540, 560), 'level-part'])
    add([text("Q/A", {size: 60, font: 'apl386'}), pos(805, 530), color(255, 1, 1), 'level-part'])
}

export default drawLabels