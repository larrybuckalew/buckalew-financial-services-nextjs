import React from 'react';
import { render, screen } from '@testing-library/react';
import BlogContentRenderer from '../BlogContentRenderer';

describe('BlogContentRenderer', () => {
  it('should render plain text paragraphs', () => {
    const content = 'This is a simple paragraph.';
    render(<BlogContentRenderer content={content} />);
    
    expect(screen.getByText('This is a simple paragraph.')).toBeInTheDocument();
  });

  it('should render headers correctly', () => {
    const content = `
# Main Header
## Secondary Header
### Tertiary Header
#### Quaternary Header
    `.trim();
    
    render(<BlogContentRenderer content={content} />);
    
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Main Header');
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('Secondary Header');
    expect(screen.getByRole('heading', { level: 3 })).toHaveTextContent('Tertiary Header');
    expect(screen.getByRole('heading', { level: 4 })).toHaveTextContent('Quaternary Header');
  });

  it('should render unordered lists correctly', () => {
    const content = `
- First item
- Second item
- Third item
    `.trim();
    
    render(<BlogContentRenderer content={content} />);
    
    const list = screen.getByRole('list');
    expect(list.tagName).toBe('UL');
    
    const listItems = screen.getAllByRole('listitem');
    expect(listItems).toHaveLength(3);
    expect(listItems[0]).toHaveTextContent('First item');
    expect(listItems[1]).toHaveTextContent('Second item');
    expect(listItems[2]).toHaveTextContent('Third item');
  });

  it('should render ordered lists correctly', () => {
    const content = `
1. First item
2. Second item
3. Third item
    `.trim();
    
    render(<BlogContentRenderer content={content} />);
    
    const list = screen.getByRole('list');
    expect(list.tagName).toBe('OL');
    
    const listItems = screen.getAllByRole('listitem');
    expect(listItems).toHaveLength(3);
    expect(listItems[0]).toHaveTextContent('First item');
    expect(listItems[1]).toHaveTextContent('Second item');
    expect(listItems[2]).toHaveTextContent('Third item');
  });

  it('should render blockquotes correctly', () => {
    const content = '> This is a blockquote';
    render(<BlogContentRenderer content={content} />);
    
    const blockquote = screen.getByText('This is a blockquote').closest('blockquote');
    expect(blockquote).toBeInTheDocument();
    expect(blockquote).toHaveClass('border-l-4', 'border-primary', 'pl-6', 'italic');
  });

  it('should render code blocks correctly', () => {
    const content = `
\`\`\`
function test() {
  return 'Hello World';
}
\`\`\`
    `.trim();
    
    render(<BlogContentRenderer content={content} />);
    
    const codeBlock = screen.getByText(/function test\(\)/);
    expect(codeBlock.closest('pre')).toBeInTheDocument();
    expect(codeBlock.closest('pre')).toHaveClass('bg-gray-900', 'text-gray-100');
  });

  it('should render bold text correctly', () => {
    const content = 'This is **bold text** in a sentence.';
    render(<BlogContentRenderer content={content} />);
    
    const element = screen.getByText(/This is.*bold text.*in a sentence/);
    expect(element).toBeInTheDocument();
    expect(element.innerHTML).toContain('<strong class="font-bold">bold text</strong>');
  });

  it('should render italic text correctly', () => {
    const content = 'This is *italic text* in a sentence.';
    render(<BlogContentRenderer content={content} />);
    
    const element = screen.getByText(/This is.*italic text.*in a sentence/);
    expect(element).toBeInTheDocument();
    expect(element.innerHTML).toContain('<em class="italic">italic text</em>');
  });

  it('should render inline code correctly', () => {
    const content = 'Use the `console.log()` function.';
    render(<BlogContentRenderer content={content} />);
    
    const element = screen.getByText(/Use the.*console\.log\(\).*function/);
    expect(element).toBeInTheDocument();
    expect(element.innerHTML).toContain('<code class="bg-gray-100 px-2 py-1 rounded font-mono text-sm">console.log()</code>');
  });

  it('should render links correctly', () => {
    const content = 'Visit [our website](https://example.com) for more info.';
    render(<BlogContentRenderer content={content} />);
    
    const link = screen.getByRole('link', { name: 'our website' });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', 'https://example.com');
    expect(link).toHaveClass('text-primary', 'hover:underline', 'font-medium');
  });

  it('should handle empty content', () => {
    const content = '';
    const { container } = render(<BlogContentRenderer content={content} />);
    
    expect(container.firstChild).toHaveClass('blog-content');
    expect(container.firstChild?.childNodes).toHaveLength(0);
  });

  it('should handle content with only whitespace', () => {
    const content = '   \n\n   \n   ';
    const { container } = render(<BlogContentRenderer content={content} />);
    
    expect(container.firstChild).toHaveClass('blog-content');
  });

  it('should handle mixed content correctly', () => {
    const content = `
# Main Title

This is a paragraph with **bold** and *italic* text.

## Subtitle

Here's a list:
- Item one
- Item two with \`inline code\`
- Item three

> This is a blockquote with a [link](https://example.com).

Some more text after the blockquote.
    `.trim();
    
    render(<BlogContentRenderer content={content} />);
    
    // Check that all elements are rendered
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Main Title');
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('Subtitle');
    expect(screen.getByText(/This is a paragraph with.*bold.*and.*italic.*text/)).toBeInTheDocument();
    expect(screen.getByRole('list')).toBeInTheDocument();
    expect(screen.getAllByRole('listitem')).toHaveLength(3);
    expect(screen.getByText(/This is a blockquote/)).toBeInTheDocument();
    expect(screen.getByRole('link')).toHaveAttribute('href', 'https://example.com');
  });

  it('should separate different list types correctly', () => {
    const content = `
- Unordered item 1
- Unordered item 2

1. Ordered item 1
2. Ordered item 2

- Another unordered item
    `.trim();
    
    render(<BlogContentRenderer content={content} />);
    
    const lists = screen.getAllByRole('list');
    expect(lists).toHaveLength(3);
    
    // First list should be UL
    expect(lists[0].tagName).toBe('UL');
    // Second list should be OL
    expect(lists[1].tagName).toBe('OL');
    // Third list should be UL
    expect(lists[2].tagName).toBe('UL');
  });

  it('should apply proper CSS classes to headers', () => {
    const content = `
# H1 Header
## H2 Header
### H3 Header
#### H4 Header
    `.trim();
    
    render(<BlogContentRenderer content={content} />);
    
    const h1 = screen.getByRole('heading', { level: 1 });
    const h2 = screen.getByRole('heading', { level: 2 });
    const h3 = screen.getByRole('heading', { level: 3 });
    const h4 = screen.getByRole('heading', { level: 4 });
    
    expect(h1).toHaveClass('text-4xl', 'font-bold', 'mt-12', 'mb-6', 'text-gray-900', 'first:mt-0');
    expect(h2).toHaveClass('text-3xl', 'font-bold', 'mt-10', 'mb-5', 'text-gray-900');
    expect(h3).toHaveClass('text-2xl', 'font-semibold', 'mt-8', 'mb-4', 'text-gray-900');
    expect(h4).toHaveClass('text-xl', 'font-semibold', 'mt-6', 'mb-3', 'text-gray-900');
  });

  it('should apply proper CSS classes to lists', () => {
    const content = `
- Unordered item

1. Ordered item
    `.trim();
    
    render(<BlogContentRenderer content={content} />);
    
    const lists = screen.getAllByRole('list');
    const ulList = lists.find(list => list.tagName === 'UL');
    const olList = lists.find(list => list.tagName === 'OL');
    
    expect(ulList).toHaveClass('list-disc', 'pl-6', 'mb-6', 'space-y-2');
    expect(olList).toHaveClass('list-decimal', 'pl-6', 'mb-6', 'space-y-2');
  });

  it('should apply proper CSS classes to paragraphs', () => {
    const content = 'This is a test paragraph.';
    render(<BlogContentRenderer content={content} />);
    
    const paragraph = screen.getByText('This is a test paragraph.');
    expect(paragraph.closest('p')).toHaveClass('mb-6', 'leading-relaxed', 'text-gray-700', 'text-lg');
  });

  it('should handle complex nested formatting', () => {
    const content = 'This has **bold with *italic inside* text** and more.';
    render(<BlogContentRenderer content={content} />);
    
    const element = screen.getByText(/This has.*bold with.*italic inside.*text.*and more/);
    expect(element).toBeInTheDocument();
  });
});