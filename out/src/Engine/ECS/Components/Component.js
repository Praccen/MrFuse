var ComponentTypeEnum;
(function (ComponentTypeEnum) {
    ComponentTypeEnum[ComponentTypeEnum["ANIMATION"] = 0] = "ANIMATION";
    ComponentTypeEnum[ComponentTypeEnum["GRAPHICS"] = 1] = "GRAPHICS";
    ComponentTypeEnum[ComponentTypeEnum["INPUT"] = 2] = "INPUT";
    ComponentTypeEnum[ComponentTypeEnum["MOVEMENT"] = 3] = "MOVEMENT";
    ComponentTypeEnum[ComponentTypeEnum["POSITION"] = 4] = "POSITION";
    ComponentTypeEnum[ComponentTypeEnum["CAMERAFOCUS"] = 5] = "CAMERAFOCUS";
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