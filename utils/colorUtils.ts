
export interface RGBColor { r: number; g: number; b: number; }
export interface HSLColor { h: number; s: number; l: number; }

export const hexToRgb = (hex: string): RGBColor | null => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
        ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16),
        }
        : null;
};

export const rgbToHex = (r: number, g: number, b: number): string => {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toLowerCase();
};

export const rgbToHsl = (r: number, g: number, b: number): HSLColor => {
    r /= 255; g /= 255; b /= 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h = 0, s = 0, l = (max + min) / 2;

    if (max !== min) {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }
    return { h: h * 360, s, l };
};

export const hslToRgb = (h: number, s: number, l: number): RGBColor => {
    let r, g, b;
    if (s === 0) {
        r = g = b = l; // achromatic
    } else {
        const hue2rgb = (p: number, q: number, t: number) => {
            if (t < 0) t += 1;
            if (t > 1) t -= 1;
            if (t < 1 / 6) return p + (q - p) * 6 * t;
            if (t < 1 / 2) return q;
            if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
            return p;
        };
        const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        const p = 2 * l - q;
        const hNormalized = h / 360;
        r = hue2rgb(p, q, hNormalized + 1 / 3);
        g = hue2rgb(p, q, hNormalized);
        b = hue2rgb(p, q, hNormalized - 1 / 3);
    }
    return { r: Math.round(r * 255), g: Math.round(g * 255), b: Math.round(b * 255) };
};

const getLuminance = (r: number, g: number, b: number): number => {
  const a = [r, g, b].map(v => {
    v /= 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });
  return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
};

export const getContrastColor = (r: number, g: number, b: number): string => {
    return getLuminance(r, g, b) > 0.5 ? '#000000' : '#FFFFFF';
};

// Fix: A spread argument must either have a tuple type or be passed to a rest parameter.
// The calls to rgbToHex were using a spread operator on the result of Object.values,
// which is not type-safe. The fix is to call hslToRgb, get the r, g, b properties,
// and pass them to rgbToHex directly. This helper function makes the code cleaner.
export const generateHarmonies = ({ h, s, l }: HSLColor) => {
    const harmonies: { [key: string]: string[] } = {};

    const toHex = (hue: number, saturation: number, lightness: number) => {
        const { r, g, b } = hslToRgb(hue, saturation, lightness);
        return rgbToHex(r, g, b);
    };

    // Monochromatic
    harmonies.monochromatic = [
        toHex(h, s, Math.max(0, l - 0.2)),
        toHex(h, s, Math.max(0, l - 0.1)),
        toHex(h, s, l),
        toHex(h, s, Math.min(1, l + 0.1)),
        toHex(h, s, Math.min(1, l + 0.2)),
    ];

    // Analogous
    harmonies.analogous = [
        toHex((h + 330) % 360, s, l),
        toHex(h, s, l),
        toHex((h + 30) % 360, s, l),
    ];

    // Complementary
    harmonies.complementary = [
        toHex(h, s, l),
        toHex((h + 180) % 360, s, l),
    ];

    // Split Complementary
    harmonies.splitComplementary = [
        toHex(h, s, l),
        toHex((h + 150) % 360, s, l),
        toHex((h + 210) % 360, s, l),
    ];

    // Triadic
    harmonies.triadic = [
        toHex(h, s, l),
        toHex((h + 120) % 360, s, l),
        toHex((h + 240) % 360, s, l),
    ];

    return harmonies;
};
