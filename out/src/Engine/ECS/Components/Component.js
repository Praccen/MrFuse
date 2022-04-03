var ComponentTypeEnum;
(function (ComponentTypeEnum) {
    ComponentTypeEnum[ComponentTypeEnum["ANIMATION"] = 0] = "ANIMATION";
    ComponentTypeEnum[ComponentTypeEnum["COLLISION"] = 1] = "COLLISION";
    ComponentTypeEnum[ComponentTypeEnum["GRAPHICS"] = 2] = "GRAPHICS";
    ComponentTypeEnum[ComponentTypeEnum["INPUT"] = 3] = "INPUT";
    ComponentTypeEnum[ComponentTypeEnum["MOVEMENT"] = 4] = "MOVEMENT";
    ComponentTypeEnum[ComponentTypeEnum["PLAYER"] = 5] = "PLAYER";
    ComponentTypeEnum[ComponentTypeEnum["BOMB"] = 6] = "BOMB";
    ComponentTypeEnum[ComponentTypeEnum["POSITION"] = 7] = "POSITION";
    ComponentTypeEnum[ComponentTypeEnum["MAPTILE"] = 8] = "MAPTILE";
    ComponentTypeEnum[ComponentTypeEnum["CAMERAFOCUS"] = 9] = "CAMERAFOCUS";
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