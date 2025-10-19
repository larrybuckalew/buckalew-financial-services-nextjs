'use client';

import React from 'react';

interface BlogContentRendererProps {
  content: string;
}

export default function BlogContentRenderer({ content }: BlogContentRendererProps) {
  const renderMarkdown = (text: string) => {
    const lines = text.split('\n');
    const elements: React.ReactNode[] = [];
    let currentList: string[] = [];
    let listType: 'ul' | 'ol' | null = null;
    
    const flushList = () => {
      if (currentList.length > 0) {
        const ListComponent = listType === 'ol' ? 'ol' : 'ul';
        elements.push(
          <ListComponent 
            key={elements.length} 
            className={listType === 'ol' ? "list-decimal pl-6 mb-6 space-y-2" : "list-disc pl-6 mb-6 space-y-2"}
          >
            {currentList.map((item, index) => (
              <li key={index} className="leading-relaxed">{renderInlineMarkdown(item)}</li>
            ))}
          </ListComponent>
        );
        currentList = [];
        listType = null;
      }
    };

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      
      if (!line) {
        flushList();
        continue;
      }

      // Headers
      if (line.startsWith('# ')) {
        flushList();
        elements.push(
          <h1 key={elements.length} className="text-4xl font-bold mt-12 mb-6 text-gray-900 first:mt-0">
            {renderInlineMarkdown(line.slice(2))}
          </h1>
        );
      } else if (line.startsWith('## ')) {
        flushList();
        elements.push(
          <h2 key={elements.length} className="text-3xl font-bold mt-10 mb-5 text-gray-900">
            {renderInlineMarkdown(line.slice(3))}
          </h2>
        );
      } else if (line.startsWith('### ')) {
        flushList();
        elements.push(
          <h3 key={elements.length} className="text-2xl font-semibold mt-8 mb-4 text-gray-900">
            {renderInlineMarkdown(line.slice(4))}
          </h3>
        );
      } else if (line.startsWith('#### ')) {
        flushList();
        elements.push(
          <h4 key={elements.length} className="text-xl font-semibold mt-6 mb-3 text-gray-900">
            {renderInlineMarkdown(line.slice(5))}
          </h4>
        );
      }
      // Unordered lists
      else if (line.startsWith('- ')) {
        if (listType !== 'ul') {
          flushList();
          listType = 'ul';
        }
        currentList.push(line.slice(2));
      }
      // Ordered lists
      else if (/^\d+\.\s/.test(line)) {
        if (listType !== 'ol') {
          flushList();
          listType = 'ol';
        }
        currentList.push(line.replace(/^\d+\.\s/, ''));
      }
      // Blockquotes
      else if (line.startsWith('>')) {
        flushList();
        elements.push(
          <blockquote key={elements.length} className="border-l-4 border-primary pl-6 italic text-gray-700 my-6 bg-gray-50 py-4">
            {renderInlineMarkdown(line.slice(1).trim())}
          </blockquote>
        );
      }
      // Code blocks (simple detection)
      else if (line.startsWith('```')) {
        flushList();
        // Find the closing ```
        const codeLines = [];
        i++; // Skip the opening ```
        while (i < lines.length && !lines[i].trim().startsWith('```')) {
          codeLines.push(lines[i]);
          i++;
        }
        elements.push(
          <pre key={elements.length} className="bg-gray-900 text-gray-100 p-6 rounded-lg overflow-x-auto my-6">
            <code>{codeLines.join('\n')}</code>
          </pre>
        );
      }
      // Regular paragraphs
      else {
        flushList();
        if (line.length > 0) {
          elements.push(
            <p key={elements.length} className="mb-6 leading-relaxed text-gray-700 text-lg">
              {renderInlineMarkdown(line)}
            </p>
          );
        }
      }
    }

    // Flush any remaining list items
    flushList();

    return elements;
  };

  const renderInlineMarkdown = (text: string) => {
    // Handle bold text **text**
    text = text.replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold">$1</strong>');
    
    // Handle italic text *text*
    text = text.replace(/\*(.*?)\*/g, '<em class="italic">$1</em>');
    
    // Handle inline code `code`
    text = text.replace(/`(.*?)`/g, '<code class="bg-gray-100 px-2 py-1 rounded font-mono text-sm">$1</code>');
    
    // Handle links [text](url)
    text = text.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" class="text-primary hover:underline font-medium">$1</a>');

    return <span dangerouslySetInnerHTML={{ __html: text }} />;
  };

  return (
    <div className="blog-content">
      {renderMarkdown(content)}
    </div>
  );
}