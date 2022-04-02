enum ComponentTypeEnum {
    ANIMATION,
    GRAPHICS,
    INPUT,
    MOVEMENT,
    POSITION,
}

class Component {
    private _type: ComponentTypeEnum;

    constructor(type: ComponentTypeEnum) {
        this._type = type;
    }

    get type(): ComponentTypeEnum {
        return this._type;
    }
};