// DrawRectangle.js
function main() {
    // Retrieve <canvas> element <- (1)
    var canvas = document.getElementById('canvas');
    if (!canvas) {
        console.log('Failed to retrieve the <canvas> element');
        return;
    }
    const drawButton = document.getElementById("drawButton");
    if (!drawButton) {
        console.log('Failed to retrieve the draw button element');
        return;
    }
    drawButton.addEventListener("click", handleDrawEvent);

    const opDrawButton = document.getElementById("opDrawButton");
    if (!opDrawButton) {
        console.log('Failed to retrieve the operation draw button element');
        return;
    }
    opDrawButton.addEventListener("click", handleDrawOperationEvent);

    // Get the rendering context for 2DCG <- (2)
    var ctx = canvas.getContext('2d');
    // Draw a blue rectangle <- (3)
    ctx.fillStyle = 'rgba(0, 0, 0, 1.0)'; // Set a blue color
    ctx.fillRect(0, 0, canvas.width, canvas.height); // Fill a rectangle with the color
} 

function drawVector(v, color) {
    // Retrieve <canvas> element <- (1)
    var canvas = document.getElementById('canvas');
    if (!canvas) {
        console.log('Failed to retrieve the <canvas> element');
        return;
    }
    origin = new Vector3([canvas.width / 2, canvas.height / 2, 0]);
    // Get the rendering context for 2DCG <- (2)
    var ctx = canvas.getContext('2d');
    // Draw a vector
    ctx.strokeStyle = color; // Set a red color
    ctx.beginPath(); // Start a new path
    ctx.moveTo(origin.elements[0], origin.elements[1]); // Move the pen to origin
    ctx.lineTo(origin.elements[0] + 20 * v.elements[0], origin.elements[1] - 20 * v.elements[1]); // Draw a line to (50, 50)
    ctx.stroke(); // Render the path
}

function handleDrawEvent() {
    // Retrieve <canvas> element <- (1)
    var canvas = document.getElementById('canvas');
    if (!canvas) {
        console.log('Failed to retrieve the <canvas> element');
        return;
    }
    
    // Get the rendering context for 2DCG <- (2)
    var ctx = canvas.getContext('2d');
    // Draw a blue rectangle <- (3)
    ctx.fillStyle = 'rgba(0, 0, 0, 1.0)'; // Set a black color
    ctx.fillRect(0, 0, canvas.width, canvas.height); // Fill canvas w/ black
    
    const x1 = document.getElementById("x1Input").value;
    if (!x1) {
        console.log('Failed to retrieve the X1 value input');
        return;
    }
    const y1 = document.getElementById("y1Input").value;
    if (!y1) {
        console.log('Failed to retrieve the Y1 value input');
        return;
    }
    const x2 = document.getElementById("x2Input").value;
    if (!x2) {
        console.log('Failed to retrieve the X2 value input');
        return;
    }
    const y2 = document.getElementById("y2Input").value;
    if (!y2) {
        console.log('Failed to retrieve the Y2 value input');
        return;
    }

    var v1 = new Vector3([x1, y1, 0]);
    var v2 = new Vector3([x2, y2, 0]);
    drawVector(v1, "red");
    drawVector(v2, "blue");
}

function handleDrawOperationEvent() {
    // Retrieve <canvas> element <- (1)
    var canvas = document.getElementById('canvas');
    if (!canvas) {
        console.log('Failed to retrieve the <canvas> element');
        return;
    }
    
    // Get the rendering context for 2DCG <- (2)
    var ctx = getWebGLContext(canvas);
    // Set the color for clearing <canvas>
    ctx.clearColor(0.0, 0.0, 0.0, 1.0);

    // Clear <canvas>
    ctx.clear(gl.COLOR_BUFFER_BIT);
    
    const x1 = document.getElementById("x1Input").value;
    if (!x1) {
        console.log('Failed to retrieve the X1 value input');
        return;
    }
    const y1 = document.getElementById("y1Input").value;
    if (!y1) {
        console.log('Failed to retrieve the Y1 value input');
        return;
    }
    const x2 = document.getElementById("x2Input").value;
    if (!x2) {
        console.log('Failed to retrieve the X2 value input');
        return;
    }
    const y2 = document.getElementById("y2Input").value;
    if (!y2) {
        console.log('Failed to retrieve the Y2 value input');
        return;
    }
    const operation = document.getElementById("operationSelect").value;
    if (!operation) {
        console.log('Failed to retrieve the operation from selector');
        return;
    }
    const scalar = document.getElementById("scalarInput").value;
    if (!scalar) {
        console.log('Failed to retrieve the scalar input');
        return;
    }

    var v1 = new Vector3([x1, y1, 0]);
    var v2 = new Vector3([x2, y2, 0]);
    drawVector(v1, "red");
    drawVector(v2, "blue");

    if (operation == "Add")
    {
        drawVector(v1.add(v2), "green");
    }
    else if (operation == "Subtract")
    {
        drawVector(v1.sub(v2), "green");
    }
    else if (operation == "Multiply")
    {
        drawVector(v1.mul(scalar), "green");
        drawVector(v2.mul(scalar), "green");
    }
    else if (operation == "Divide")
    {
        drawVector(v1.div(scalar), "green");
        drawVector(v2.div(scalar), "green");
    }
    else if (operation == "Magnitude")
    {
        console.log("Magnitude: " + (v1.magnitude()).toString());
        console.log("Magnitude: " + (v2.magnitude()).toString());
    }
    else if (operation == "Normalize")
    {
        drawVector(v1.normalize(), "green");
        drawVector(v2.normalize(), "green");
    }
    else if (operation == "Angle Between")
    {
        console.log("Angle: " + angleBetween(v1,v2).toString());
    }
    else if (operation == "Area")
    {
        console.log("Area of the Triangle: " + areaTriangle(v1,v2).toString());
    }
    else 
    {
        console.log('Operation does not exist');
    }
}

function angleBetween(v1, v2) {
    return Math.acos(Vector3.dot(v1, v2) / (v1.magnitude() * v2.magnitude())) * (180 / Math.PI);
}

function areaTriangle(v1, v2) {
    return Vector3.cross(v1, v2).magnitude() / 2;
}
