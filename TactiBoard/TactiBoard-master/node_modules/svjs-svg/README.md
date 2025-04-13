# svjs-svg
  
A simple SVG-tool, which can render SVG elements and load sprites from external files. 
Removes transformations from the sprite-elements, deletes unnecessary and maybe duplicate ids.
Written as "vanilla" ES6-Module. 

**It is fast, small (< 100 lines of code) and has no runtime dependencies.**

Demo: [http://shaack.com/projekte/svjs-svg/](http://shaack.com/projekte/svjs-svg/)

## Examples

The syntax is all standard: [SVG element reference](https://developer.mozilla.org/en-US/docs/Web/SVG/Element).

`Svg.addElement(svg, "rect", {x: 10, y: 10, width: 50, height: 50, fill: "red"});`

transforms to

`<rect x="10" y="10" width="50" height="50" fill="red"></rect>`

### Draw a simple rect

```
Svg.addElement(svg, "rect", {x: 10, y: 10, width: 50, height: 50, fill: "red"});
```

### Draw Elements from Sprite (sprite.svg)

```
Svg.loadSprite("./assets/sprite.svg", ["star", "circle", "triangle", "smiley"]);
Svg.addElement(svg2, "use", {href: "#triangle", x: 10, y: 10});
Svg.addElement(svg2, "use", {href: "#smiley", x: 100, y: 10});
Svg.addElement(svg2, "use", {href: "#smiley", transform: "translate(200,10) scale(0.5)"});
```

### Animate Elements from Sprite

```
Svg.addElement(star, "animateTransform", {
    attributeName: "transform", type: "rotate",
    values: "0 0 0; 360 0 0", additive: "sum", dur: "6s", repeatCount: "indefinite"
});
Svg.addElement(star, "animateMotion", {dur: "10s", values: "0,0; 250,0; 0,0", repeatCount: "indefinite"});
```
