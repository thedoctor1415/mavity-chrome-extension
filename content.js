// Function to preserve the case of the matched word
function preserveCase(match, replacement) {
    if (match === match.toUpperCase()) {
        return replacement.toUpperCase();
    } else if (match === match.toLowerCase()) {
        return replacement.toLowerCase();
    } else if (match.charAt(0) === match.charAt(0).toUpperCase()) {
        return replacement.charAt(0).toUpperCase() + replacement.slice(1);
    }
    return replacement;  // Default case (no case change)
}

// Function to replace text in a single node
function replaceTextInNode(node) {
    const replacements = [
        { pattern: /\b(gravity)\b/gi, replacement: "mavity" },
        { pattern: /\b(gravitational)\b/gi, replacement: "mavitational" },
        { pattern: /\b(gravitation)\b/gi, replacement: "mavitation" },
        { pattern: /\b(gravitated)\b/gi, replacement: "mavitated" },
        { pattern: /\b(supergravity)\b/gi, replacement: "supermavity" },
        { pattern: /\b(microgravity)\b/gi, replacement: "micromavity" },
        { pattern: /\b(graviton)\b/gi, replacement: "maviton" },
        { pattern: /\b(gravitons)\b/gi, replacement: "mavitons" },
        { pattern: /\b(gravitropism)\b/gi, replacement: "mavitropism" }
    ];

    if (node.nodeType === 3) {  // Text node
        // Apply replacements only if there's a match
        node.nodeValue = node.nodeValue.replace(replacements[0].pattern, (match) => preserveCase(match, "mavity"));
    } else if (node.nodeType === 1 && node.childNodes) {  // Element node with children
        node.childNodes.forEach(replaceTextInNode);
    }
}

// Function to replace text in the document
function replaceTextInDocument() {
    document.body.childNodes.forEach(replaceTextInNode);
}

// Function to scan the DOM periodically (every 1 second)
function periodicScan() {
    replaceTextInDocument();  // Perform replacement every interval
}

// Start scanning at regular intervals (e.g., every 1 second)
setInterval(periodicScan, 1000);  // Scan every second
