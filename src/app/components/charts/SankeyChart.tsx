import React from 'react';
import { ResponsiveContainer } from 'recharts';
import { ChartTheme, defaultTheme } from '@/lib/visualization';

interface SankeyNode {
  id: string;
  name: string;
  color?: string;
}

interface SankeyLink {
  source: string;
  target: string;
  value: number;
  color?: string;
}

interface SankeyChartProps {
  nodes: SankeyNode[];
  links: SankeyLink[];
  height?: number;
  theme?: ChartTheme;
  formatValue?: (value: number) => string;
  nodePadding?: number;
  nodeWidth?: number;
  showValues?: boolean;
}

interface ProcessedNode extends SankeyNode {
  x: number;
  y: number;
  height: number;
  sourceLinks: ProcessedLink[];
  targetLinks: ProcessedLink[];
}

interface ProcessedLink extends SankeyLink {
  width: number;
  path: string;
  sourceNode: ProcessedNode;
  targetNode: ProcessedNode;
}

export default function SankeyChart({
  nodes,
  links,
  height = 400,
  theme = defaultTheme,
  formatValue = (v) => v.toString(),
  nodePadding = 10,
  nodeWidth = 20,
  showValues = true,
}: SankeyChartProps) {
  // Process data to calculate positions
  const processData = (): { nodes: ProcessedNode[]; links: ProcessedLink[] } => {
    // Create node map for quick lookup
    const nodeMap = new Map<string, ProcessedNode>();
    
    // Initialize processed nodes with basic properties
    nodes.forEach(node => {
      nodeMap.set(node.id, {
        ...node,
        x: 0,
        y: 0,
        height: 0,
        sourceLinks: [],
        targetLinks: [],
      });
    });

    // Initialize processed links
    const processedLinks: ProcessedLink[] = links.map(link => ({
      ...link,
      width: 0,
      path: '',
      sourceNode: nodeMap.get(link.source)!,
      targetNode: nodeMap.get(link.target)!,
    }));

    // Calculate node columns
    let columns = new Map<string, number>();
    const visited = new Set<string>();

    // Find root nodes (nodes with no incoming links)
    const rootNodes = Array.from(nodeMap.values()).filter(
      node => !processedLinks.some(link => link.target === node.id)
    );

    // Assign columns using breadth-first traversal
    let currentColumn = 0;
    let currentNodes = rootNodes;

    while (currentNodes.length > 0) {
      const nextNodes = new Set<ProcessedNode>();

      currentNodes.forEach(node => {
        if (!visited.has(node.id)) {
          visited.add(node.id);
          columns.set(node.id, currentColumn);

          processedLinks
            .filter(link => link.source === node.id)
            .forEach(link => nextNodes.add(nodeMap.get(link.target)!));
        }
      });

      currentNodes = Array.from(nextNodes);
      currentColumn++;
    }

    // Calculate node positions
    const maxColumn = Math.max(...Array.from(columns.values()));
    const columnNodes = new Map<number, ProcessedNode[]>();

    // Group nodes by column
    nodeMap.forEach(node => {
      const column = columns.get(node.id)!;
      if (!columnNodes.has(column)) {
        columnNodes.set(column, []);
      }
      columnNodes.get(column)!.push(node);
    });

    // Calculate horizontal positions
    nodeMap.forEach(node => {
      const column = columns.get(node.id)!;
      node.x = (column * (100 - nodeWidth)) / maxColumn;
    });

    // Calculate node values and heights
    nodeMap.forEach(node => {
      const nodeLinks = processedLinks.filter(
        link => link.source === node.id || link.target === node.id
      );
      const totalValue = Math.max(
        nodeLinks.reduce((sum, link) => sum + link.value, 0)
      );
      node.height = totalValue;
    });

    // Calculate vertical positions
    columnNodes.forEach(nodes => {
      const totalHeight = nodes.reduce((sum, node) => sum + node.height, 0);
      const totalPadding = (nodes.length - 1) * nodePadding;
      const scale = (100 - totalPadding) / totalHeight;

      let currentY = 0;
      nodes.forEach(node => {
        node.y = currentY;
        node.height *= scale;
        currentY += node.height + nodePadding;
      });
    });

    // Generate link paths
    processedLinks.forEach(link => {
      const sourceNode = nodeMap.get(link.source)!;
      const targetNode = nodeMap.get(link.target)!;
      const sourceY = sourceNode.y + sourceNode.height / 2;
      const targetY = targetNode.y + targetNode.height / 2;

      link.path = `
        M ${sourceNode.x + nodeWidth} ${sourceY}
        C ${(sourceNode.x + targetNode.x + nodeWidth) / 2} ${sourceY},
          ${(sourceNode.x + targetNode.x + nodeWidth) / 2} ${targetY},
          ${targetNode.x} ${targetY}
      `;
      link.width = link.value * scale;
    });

    return {
      nodes: Array.from(nodeMap.values()),
      links: processedLinks,
    };
  };

  const { nodes: processedNodes, links: processedLinks } = processData();

  return (
    <div style={{ width: '100%', height }}>
      <ResponsiveContainer>
        <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
          {/* Links */}
          {processedLinks.map((link, index) => (
            <g key={`link-${index}`}>
              <path
                d={link.path}
                fill="none"
                stroke={link.color || theme.colors.primary}
                strokeWidth={link.width}
                strokeOpacity={0.5}
              />
              {showValues && (
                <text
                  x={(link.sourceNode.x + link.targetNode.x + nodeWidth) / 2}
                  y={(link.sourceNode.y + link.targetNode.y) / 2}
                  textAnchor="middle"
                  fill={theme.colors.text}
                  fontSize="2"
                  fontFamily={theme.fonts.base}
                >
                  {formatValue(link.value)}
                </text>
              )}
            </g>
          ))}

          {/* Nodes */}
          {processedNodes.map(node => (
            <g key={node.id}>
              <rect
                x={node.x}
                y={node.y}
                width={nodeWidth}
                height={node.height}
                fill={node.color || theme.colors.secondary}
                stroke={theme.colors.background}
                strokeWidth={0.5}
              />
              <text
                x={node.x + nodeWidth / 2}
                y={node.y + node.height / 2}
                textAnchor="middle"
                fill={theme.colors.background}
                fontSize="2.5"
                fontFamily={theme.fonts.base}
              >
                {node.name}
              </text>
            </g>
          ))}
        </svg>
      </ResponsiveContainer>
    </div>
  );
}
