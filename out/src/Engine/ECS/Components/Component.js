var ComponentTypeEnum;
(function (ComponentTypeEnum) {
    ComponentTypeEnum[ComponentTypeEnum["ANIMATION"] = 0] = "ANIMATION";
    ComponentTypeEnum[ComponentTypeEnum["COLLISION"] = 1] = "COLLISION";
    ComponentTypeEnum[ComponentTypeEnum["GRAPHICS"] = 2] = "GRAPHICS";
    ComponentTypeEnum[ComponentTypeEnum["INPUT"] = 3] = "INPUT";
    ComponentTypeEnum[ComponentTypeEnum["MOVEMENT"] = 4] = "MOVEMENT";
    ComponentTypeEnum[ComponentTypeEnum["POSITION"] = 5] = "POSITION";
    ComponentTypeEnum[ComponentTypeEnum["MAPTILE"] = 6] = "MAPTILE";
    ComponentTypeEnum[ComponentTypeEnum["CAMERAFOCUS"] = 7] = "CAMERAFOCUS";
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