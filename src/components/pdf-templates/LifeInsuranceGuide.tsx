'use client';

import React from 'react';
import { Document, Page, Text, View, StyleSheet, Font } from '@react-pdf/renderer';
import { marked } from 'marked';

// Register fonts
Font.register({
  family: 'Roboto',
  fonts: [
    { src: '/fonts/Roboto-Regular.ttf', fontWeight: 'normal' },
    { src: '/fonts/Roboto-Bold.ttf', fontWeight: 'bold' },
    { src: '/fonts/Roboto-Italic.ttf', fontStyle: 'italic' }
  ]
});

const styles = StyleSheet.create({
  page: {
    fontFamily: 'Roboto',
    padding: 40,
    fontSize: 10,
    lineHeight: 1.5
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center'
  },
  subtitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 15,
    marginBottom: 10
  },
  paragraph: {
    marginBottom: 10
  },
  listItem: {
    marginLeft: 15,
    marginBottom: 5
  },
  blockquote: {
    backgroundColor: '#F4F4F4',
    padding: 10,
    borderLeftWidth: 3,
    borderLeftColor: '#666',
    marginVertical: 10
  }
});

// Custom renderer for PDF
const createPDFRenderer = () => {
  const renderer = new marked.Renderer();

  renderer.heading = (text, level) => {
    return {
      type: 'heading',
      level,
      text
    };
  };

  renderer.paragraph = (text) => {
    return {
      type: 'paragraph',
      text
    };
  };

  renderer.list = (body, ordered) => {
    return {
      type: 'list',
      ordered,
      items: body.split('\n').filter(item => item.trim() !== '')
    };
  };

  renderer.listitem = (text) => {
    return {
      type: 'listitem',
      text
    };
  };

  renderer.blockquote = (quote) => {
    return {
      type: 'blockquote',
      text: quote
    };
  };

  return renderer;
};

// PDF Markdown Renderer Component
const MarkdownToPDF = ({ markdown }) => {
  const renderer = createPDFRenderer();
  const tokens = marked.lexer(markdown, { renderer });

  return (
    <View>
      {tokens.map((token, index) => {
        switch (token.type) {
          case 'heading':
            return (
              <Text 
                key={index} 
                style={token.level === 1 ? styles.title : styles.subtitle}
              >
                {token.text}
              </Text>
            );
          
          case 'paragraph':
            return (
              <Text key={index} style={styles.paragraph}>
                {token.text}
              </Text>
            );
          
          case 'list':
            return (
              <View key={index}>
                {token.items.map((item, itemIndex) => (
                  <Text key={itemIndex} style={styles.listItem}>
                    {token.ordered ? `${itemIndex + 1}. ` : '• '}
                    {item}
                  </Text>
                ))}
              </View>
            );
          
          case 'blockquote':
            return (
              <View key={index} style={styles.blockquote}>
                <Text>{token.text}</Text>
              </View>
            );
          
          default:
            return null;
        }
      })}
    </View>
  );
};

export const LifeInsuranceGuide = ({ content }) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <MarkdownToPDF markdown={content} />
      </Page>
    </Document>
  );
};