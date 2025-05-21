async function test ()
{

    // Create new style
    const newStyle = await webflow.createStyle('ssssss');

    // Set properties for the style
    newStyle.setProperties({
        "background-color": "blue",
        "font-size": "16px",
        "font-weight": "bold",
    });

    // Get Selected Element
    const selectedElement = await webflow.getSelectedElement()

    if (selectedElement?.styles) {

        // Apply style to selected element
        const yes = await selectedElement.setStyles([newStyle])

    } else {
        console.log("No element selected")
    }


}