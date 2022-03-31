var ComponentTypeEnum;
(function (ComponentTypeEnum) {
    ComponentTypeEnum[ComponentTypeEnum["GRAPHICS"] = 0] = "GRAPHICS";
    ComponentTypeEnum[ComponentTypeEnum["MOVEMENT"] = 1] = "MOVEMENT";
    ComponentTypeEnum[ComponentTypeEnum["POSITION"] = 2] = "POSITION";
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