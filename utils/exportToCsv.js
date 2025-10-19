export function downloadCSV(content, filename) {
    const blob = new Blob([content], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}
export function generateCSV(data, fields) {
    const replacer = (key, value) => value === null ? '' : value;
    const header = fields.join(',');
    const csv = data.map(row => fields.map(field => {
        // Handle nested fields (e.g., 'author.name')
        const value = field.split('.').reduce((obj, key) => obj?.[key], row);
        return JSON.stringify(value, replacer);
    }).join(','));
    csv.unshift(header);
    return csv.join('\r\n');
}
export function exportUsers(users) {
    const fields = ['name', 'email', 'role', 'isEmailVerified', 'createdAt'];
    const csv = generateCSV(users, fields);
    downloadCSV(csv, `users-export-${new Date().toISOString().split('T')[0]}.csv`);
}
export function exportPosts(posts) {
    const fields = ['title', 'slug', 'isPublished', 'publishedAt', 'author.name'];
    const csv = generateCSV(posts, fields);
    downloadCSV(csv, `posts-export-${new Date().toISOString().split('T')[0]}.csv`);
}
