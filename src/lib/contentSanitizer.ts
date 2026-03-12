export const sanitizeContent = (content: any): string => {
    if (!content || typeof content !== 'string') return '';

    // Remove specific corrupted base64 string from the end
    let cleaned = content
        .replace(/K47rSRD3I2JUeG9FFdGa4RzcT90ircnvxjoEx\/wDpqFJyKKKyP5M2fxHSUzkAaKKGCEPOmj\/20h8WFFFA\/Bp8MYiyC9MmsmcYnkA5Bz\+NFFWZvxxKMH5ZjBzoOx2oorKaxKUEjlRRQMVRqzknYbUAbGiigQho1kCiigD\/2Q=="><p><\/p>"$/g, '')
        .trim();

    // Check for block-level HTML tags (Structure)
    const hasBlockTags = /<(p|div|h[1-6]|ul|ol|li|section|article|blockquote)/i.test(cleaned);
    
    if (hasBlockTags) {
        // Content already has structure, return it but clean empty tags
        return cleaned.replace(/<p>\s*<\/p>/g, '');
    }

    // Content looks like plain text or incomplete HTML (e.g. only <b>)
    // We split by newlines and wrap for layout
    return cleaned
        .split(/\n+/) 
        .map(line => {
            const trimmed = line.trim();
            if (!trimmed) return '';
            
            // Detect headings: short lines, no ending period, or starts with a list number
            const looksLikeHeading = trimmed.length < 120 && 
                                   (!trimmed.endsWith('.') || /^[0-9]+\.\s/.test(trimmed)) && 
                                   !trimmed.includes('<br');

            if (looksLikeHeading) {
                return `<h3>${trimmed}</h3>`;
            }
            
            return `<p>${trimmed}</p>`;
        })
        .filter(Boolean)
        .join('\n');
};

export const createExcerpt = (content: any, maxLength = 150): string => {
    const sanitized = sanitizeContent(content);

    if (!sanitized) {
        return 'Discover insights and trends in technology and innovation...';
    }

    // Strip HTML tags for the excerpt
    const plainText = sanitized.replace(/<[^>]+>/g, '');

    if (plainText.length <= maxLength) {
        return plainText;
    }

    return plainText.substring(0, maxLength) + '...';
};