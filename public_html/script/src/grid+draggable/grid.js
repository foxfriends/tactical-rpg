'use strict';

import {Rect, Point, Size} from '../graphical-util';

export const Grid = class {
    constructor(frame, cellSize, cellSpacing = 5) {
        if (!(frame instanceof Rect) || !(cellSize instanceof Size)) {
            throw new TypeError(
                'Grid is being passed bad types to its constructor',
                'util.js'
            );
        }
        this.frame = frame;
        this.cellSize = cellSize;
        this.cellSpacing = cellSpacing; //the spacing in between different cells
                                        //and in between cells and the grid edges
    }

    frameForPoint(pt, minDist = 1000000000) {
        //returns an object containing the frame and its distance from pt
        let initialX = this.frame.x + this.cellSpacing;
        let xIncrement = this.cellSize.width + this.cellSpacing;
        let initialY = this.frame.y + this.cellSpacing;
        let yIncrement = this.cellSize.height + this.cellSpacing;
        let curPoint;
        for (let x = initialX; x < this.frame.right; x += xIncrement) {
            for (let y = initialY; y < this.frame.bottom; y += yIncrement) {
                let cent = (new Rect(x, y, this.cellSize.width, this.cellSize.height)).center;
                let dist =  (pt.x - cent.x) * (pt.x - cent.x) +
                            (pt.y - cent.y) * (pt.y - cent.y);
                if (dist <= minDist) {
                    minDist = dist;
                    curPoint = cent;
                }
            }
        }
        if (curPoint !== undefined) {
            let retFrame = new Rect(0, 0, this.cellSize.width, this.cellSize.height);
            retFrame.center = curPoint;
            return {frame: retFrame, dist: minDist};
        }
    }
};

export default Grid;
