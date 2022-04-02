class Vec2 {
    x: number;
    y: number;

    constructor(x: number, y:number) {
        this.x = x;
        this.y = y;
    }

    length(): number {
        return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
    }

    length2(): number {
        return Math.pow(this.x, 2) + Math.pow(this.y, 2);
    }

    normalize(): Vec2 {
        const length = this.length();
        if (length > 0.0) {
            this.x /= length;
            this.y /= length;
        }
        return this;
    }

    dot(otherVec: Vec2): number {
        return this.x * otherVec.x + this.y * otherVec.y;
    }

    flip(): Vec2 {
        this.x *= -1.0;
        this.y *= -1.0;
        return this;
    }

    add(vec: Vec2): Vec2 {
        this.x += vec.x;
        this.y += vec.y;
        return this;
    }

    subtract(vec: Vec2) : Vec2 {
        this.x -= vec.x;
        this.y -= vec.y;
        return this;
    }

    multiply(mult: number): Vec2 {
        this.x *= mult;
        this.y *= mult;
        return this;
    }

    min(vec: Vec2): Vec2 {
        this.x = Math.min(this.x, vec.x);
        this.y = Math.min(this.y, vec.y);
        return this;
    }

    max(vec: Vec2): Vec2 {
        this.x = Math.max(this.x, vec.x);
        this.y = Math.max(this.y, vec.y);
        return this;
    }
};