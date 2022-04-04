var ComponentTypeEnum;
(function (ComponentTypeEnum) {
    ComponentTypeEnum[ComponentTypeEnum["ANIMATION"] = 0] = "ANIMATION";
    ComponentTypeEnum[ComponentTypeEnum["COLLISION"] = 1] = "COLLISION";
    ComponentTypeEnum[ComponentTypeEnum["GRAPHICS"] = 2] = "GRAPHICS";
    ComponentTypeEnum[ComponentTypeEnum["INPUT"] = 3] = "INPUT";
    ComponentTypeEnum[ComponentTypeEnum["AUDIO"] = 4] = "AUDIO";
    ComponentTypeEnum[ComponentTypeEnum["MOVEMENT"] = 5] = "MOVEMENT";
    ComponentTypeEnum[ComponentTypeEnum["PLAYER"] = 6] = "PLAYER";
    ComponentTypeEnum[ComponentTypeEnum["BOMB"] = 7] = "BOMB";
    ComponentTypeEnum[ComponentTypeEnum["POSITION"] = 8] = "POSITION";
    ComponentTypeEnum[ComponentTypeEnum["MAPTILE"] = 9] = "MAPTILE";
    ComponentTypeEnum[ComponentTypeEnum["CAMERAFOCUS"] = 10] = "CAMERAFOCUS";
})(ComponentTypeEnum || (ComponentTypeEnum = {}));
class Component {
    constructor(type) {
        this._type = type;
    }
    get type() {
        return this._type;
    }
}
;
//# sourceMappingURL=Component.js.map