// Utility function to preserve capitalization of the original word
function preserveCase(original, replacement) {
    if (original === original.toUpperCase()) {
        return replacement.toUpperCase(); // All uppercase
    } else if (original === original.toLowerCase()) {
        return replacement.toLowerCase(); // All lowercase
    } else if (original[0] === original[0].toUpperCase()) {
        return replacement[0].toUpperCase() + replacement.slice(1).toLowerCase(); // Title case
    } else {
        return replacement; // Default case
    }
}

// Function to replace text in the given node
function replaceText(node) {
    if (node.nodeType === Node.TEXT_NODE) {
        // Replace "gravity" and "gravitational" in text content
        node.nodeValue = node.nodeValue
            .replace(/\b(gravity)\b/gi, (match) => preserveCase(match, "mavity"))
            .replace(/\b(gravitational)\b/gi, (match) => preserveCase(match, "mavitational"));
    } else {
        // Recursively process child nodes
        for (const child of node.childNodes) {
            replaceText(child);
        }
    }
}

// Run text replacement on the entire document body initially
replaceText(document.body);

// Observe changes to the DOM to handle dynamically loaded content
const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
        for (const addedNode of mutation.addedNodes) {
            replaceText(addedNode);
        }
    }
});

// Start observing the document for added nodes
observer.observe(document.body, { childList: true, subtree: true });
