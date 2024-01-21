
import React from 'react';

const Node = ({ node, drag }) => {
  return (
    <g className="node" transform={`translate(${node.x},${node.y})`} onClick={() => drag && drag.subject(event, node)}>
      <circle r={30} fill={node.color} stroke="white" strokeWidth={2} />
      <text textAnchor="middle" dy="0.3em" fill="black">
        {node.label}
      </text>
    </g>
  );
};

export default Node;
