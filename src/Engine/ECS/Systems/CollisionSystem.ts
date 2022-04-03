class CollisionSystem extends System {
    constructor() {
        super([ComponentTypeEnum.COLLISION, ComponentTypeEnum.POSITION]);

    }

    update(dt: number) {
        // Update positions of shapes
        for (let entity of this.entities) {
            let colComp = <CollisionComponent>entity.getComponent(ComponentTypeEnum.COLLISION);
            let posComp = <PositionComponent>entity.getComponent(ComponentTypeEnum.POSITION);

            let tempMatrix = new Matrix4(null);
            posComp.calculateMatrix(tempMatrix);
            colComp.shape.setTransformMatrix(tempMatrix);
            colComp.currentCollisionEntities.clear(); 
        }

        for (let e of this.entities) {
            let c = <CollisionComponent>e.getComponent(ComponentTypeEnum.COLLISION);
            let p = <PositionComponent>e.getComponent(ComponentTypeEnum.POSITION);
            let m = <MovementComponent>e.getComponent(ComponentTypeEnum.MOVEMENT);
            // Don't check against others if this is constraint or doesn't have movement component
            if (c.isConstraint || !m) {
                continue;
            }

            //Reset drag to 'air-drag'
            m.drag = m.defaultDrag;

            // Collide with other entities
            for (let e2 of this.entities) {
                if (e.id == e2.id) {
                    // Don't collide with self
                    continue;
                }

                let c2 = <CollisionComponent>e2.getComponent(ComponentTypeEnum.COLLISION);
                let m2 = <MovementComponent>e2.getComponent(ComponentTypeEnum.MOVEMENT);
                let p2 = <PositionComponent>e2.getComponent(ComponentTypeEnum.POSITION);


                let tempIntersectionAxis = new Vec2(0.0, 0.0);
                let tempIntersectionDepth = { depth: 0.0 };

                if (SAT.prototype.getIntersection(c.shape, c2.shape, tempIntersectionAxis, tempIntersectionDepth)) {
                    if (c2.effectMovement) {
                        if (tempIntersectionAxis.length2() > 0.0001) {

                            // Climbing ontop of things / being pushed down
                            let reverse = { value: false };
                            let verticalIntersectionDepth = SAT.prototype.getOverlap(new Vec2(0.0, 1.0), c.shape.getTransformedVertices(), c2.shape.getTransformedVertices(), reverse);
                            if (verticalIntersectionDepth <= c.allowedClimbing) {
                                tempIntersectionAxis.x = 0.0; tempIntersectionAxis.y = 1.0;
                                if (reverse.value) {
                                    tempIntersectionAxis.y = -1.0;
                                }
                                tempIntersectionDepth.depth = verticalIntersectionDepth;
                            }

                            let moveOutVec = new Vec2(tempIntersectionAxis.x, tempIntersectionAxis.y);
                            moveOutVec.multiply(tempIntersectionDepth.depth);
                            p.position.xy.add(moveOutVec);
                            let normalizedIntersectionAxis = new Vec2(tempIntersectionAxis.x, tempIntersectionAxis.y);
                            normalizedIntersectionAxis.normalize();

                            let dotProd = normalizedIntersectionAxis.dot(m.velocity.xy);
                        
                            if (dotProd < 0.0) {
                                let tempVec = new Vec2(normalizedIntersectionAxis.x, normalizedIntersectionAxis.y);
                                m.velocity.xy.add(tempVec.multiply(-dotProd * (1.0 + c.bounceFactor)));
                            }
                                
                            // Allow jumping if standing on ground pointing upwards
                            if (normalizedIntersectionAxis.y > 0.6) {
                                m.jumpAllowed = true;
                            }

                            // Update shape
                            let finalMatrix = new Matrix4(null);
                            p.calculateMatrix(finalMatrix);
                            c.shape.setTransformMatrix(finalMatrix);
                        }
                    }
                    c.currentCollisionEntities.add(e2); // Save collision
                    c2.currentCollisionEntities.add(e); // Add to other entity that it has been hit
                    

                    //set drag to 'ground-drag'
                    m.drag = c2.dragFactor;
                }
            }
        }
    }
};