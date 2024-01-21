import React, { useRef, useEffect, useState } from 'react';
import Node from './Node'; // Import Node component
import updateGraph from '../utils/D3Utils';
import * as d3 from 'd3';
import './MindMap.css';

const MindMap = () => {
  const svgRef = useRef(null);
  const [nodes, setNodes] = useState([
    { constid: 1, x: 100, y: 100, label: 'Node 1', color: 'lightblue' },
    { constid: 2, x: 300, y: 100, label: 'Node 2', color: 'lightgreen' },
  ]);

  useEffect(() => {
    const svg = d3.select(svgRef.current);

    // Define drag behavior
    const drag = d3.drag().on('start', (event, d) => {
      d.vx = d.x;
      d.vy = d.y;
    });

    // Call the utility function to handle D3 logic
    updateGraph(svg, nodes, drag);
 
    svg.selectAll('.connection').remove();

    nodes.forEach((sourceNode) => {
      nodes.forEach((targetNode) => {
        if (sourceNode.constid !== targetNode.constid) {
          // Check if there is a connection between the nodes
          const isConnected = checkConnection(sourceNode.constid, targetNode.constid);
          
          if (isConnected) {
            svg
              .append('line')
              .attr('class', 'connection')
              .attr('x1', sourceNode.x)
              .attr('y1', sourceNode.y)
              .attr('x2', targetNode.x)
              .attr('y2', targetNode.y)
              .attr('stroke', 'gray');
          }
        }
      });
    });
  }, [nodes]);

  const checkConnection = (sourceNodeId, targetNodeId) => {
    // Assuming you have a links array representing connections
    const links = [
      { source: { constid: 1 }, target: { constid: 2 } },
      // Add more connections as needed
    ];
  
    return links.some((link) => (
      (link.source.constid === sourceNodeId && link.target.constid === targetNodeId) ||
      (link.source.constid === targetNodeId && link.target.constid === sourceNodeId)
    ));
  };

  const addNode = () => {
    const newNode = {
      constid: nodes.length + 1,
      x: Math.random() * 500,
      y: Math.random() * 300,
      label: `Node ${nodes.length + 1}`,
      color: getRandomColor(),
    };
    setNodes((prevNodes) => [...prevNodes, newNode]);
  };

  // Function to generate a random color
  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  return (
    <div>
      <button onClick={addNode}>Add Node</button>
      <svg ref={svgRef} width="100%" height="300">
        {nodes.map((node) => (
          <Node key={node.constid} node={node} drag={drag} />
        ))}
      </svg>
    </div>
  );
};

export default MindMap;

