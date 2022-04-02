enum ComponentTypeEnum {
    ANIMATION,
    COLLISION,
    GRAPHICS,
    INPUT,
    MOVEMENT,
    POSITION,
    MAPTILE,
    CAMERAFOCUS,
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