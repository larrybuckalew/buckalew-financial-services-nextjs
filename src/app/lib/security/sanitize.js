import DOMPurify from 'dompurify';
import { JSDOM } from 'jsdom';
const window = new JSDOM('').window;
const purify = DOMPurify(window);
export function sanitizeHtml(input) {
    return purify.sanitize(input, {
        ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'a'],
        ALLOWED_ATTR: ['href']
    });
}
export function sanitizeObject(obj) {
    return Object.entries(obj).reduce((acc, [key, value]) => {
        if (typeof value === 'string') {
            return { ...acc, [key]: sanitizeHtml(value) };
        }
        if (typeof value === 'object' && value !== null) {
            return { ...acc, [key]: sanitizeObject(value) };
        }
        return { ...acc, [key]: value };
    }, {});
}
