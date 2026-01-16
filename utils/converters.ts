// A CSV to JSON converter that handles quoted fields.
export const csvToJson = (csv: string): object[] => {
    const lines = csv.trim().replace(/\r/g, '').split('\n');
    if (lines.length < 1) throw new Error("CSV data is empty.");
    if (lines[0].trim() === '') throw new Error("CSV header is missing.");

    const headers = lines.shift()!.split(',').map(h => h.trim());
    if (headers.length === 1 && headers[0] === '') throw new Error("Invalid CSV header.");
    
    return lines.map(line => {
        if (line.trim() === '') return null;
        
        // This regex handles commas inside of double quoted fields.
        // It does not handle escaped quotes within fields.
        const values = (line.match(/(".*?"|[^",]+)(?=\s*,|\s*$)/g) || [])
            .map(v => v.trim())
            .map(v => (v.startsWith('"') && v.endsWith('"')) ? v.slice(1, -1) : v);

        const obj: { [key: string]: string } = {};
        headers.forEach((header, i) => {
            obj[header] = values[i] || '';
        });
        return obj;
    }).filter(item => item !== null) as object[];
};

// A recursive function to convert a DOM node to a JSON object.
function domToJson(node: Node): any {
    // Base case: if it's a text node, return its trimmed content, or null if empty.
    if (node.nodeType === 3) { // 3 is a text node
        const text = node.nodeValue?.trim();
        return text || null;
    }
    
    // If it's not an element node, ignore it (e.g., comments, processing instructions).
    if (node.nodeType !== 1) { // 1 is an element node
        return null;
    }

    const element = node as Element;
    const obj: any = {};

    // Convert attributes
    if (element.attributes.length > 0) {
        obj["@attributes"] = {};
        for (let i = 0; i < element.attributes.length; i++) {
            const attr = element.attributes[i];
            obj["@attributes"][attr.name] = attr.value;
        }
    }
    
    const childNodes = Array.from(element.childNodes);
    // If the element has only one child and it's a text node, the value of the element is the text.
    if (childNodes.length === 1 && childNodes[0].nodeType === 3) {
        const textContent = childNodes[0].nodeValue?.trim();
        if (Object.keys(obj).length === 0) return textContent || null; // <tag>text</tag>
        if (textContent) obj["#text"] = textContent; // <tag attr="1">text</tag>
        return obj;
    }

    // Convert child nodes
    if (childNodes.length > 0) {
        childNodes.forEach(child => {
            const childJson = domToJson(child);
            if (childJson === null) return; // Skip empty text nodes etc.

            const nodeName = child.nodeName;

            // If the property doesn't exist yet, create it.
            if (typeof obj[nodeName] === 'undefined') {
                obj[nodeName] = childJson;
            } 
            // If the property exists, convert it to an array if it's not one already.
            else {
                if (!Array.isArray(obj[nodeName])) {
                    obj[nodeName] = [obj[nodeName]];
                }
                obj[nodeName].push(childJson);
            }
        });
    }

    return obj;
}

// Converts an XML string to a JSON object.
export const xmlToJson = (xml: string): object => {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xml.trim(), "application/xml");

    const parserError = xmlDoc.querySelector("parsererror");
    if (parserError) {
        throw new Error("Invalid XML: " + parserError.textContent?.split('\n')[0]);
    }

    const rootElement = xmlDoc.documentElement;
    return { [rootElement.nodeName]: domToJson(rootElement) };
};