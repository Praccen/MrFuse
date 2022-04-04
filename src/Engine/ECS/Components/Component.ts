enum ComponentTypeEnum {
    ANIMATION,
    COLLISION,
    GRAPHICS,
    INPUT,
    AUDIO,
    MOVEMENT,
    PLAYER,
    BOMB,
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