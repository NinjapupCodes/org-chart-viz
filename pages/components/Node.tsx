import { HierarchyNode } from "../types";
import cn from "classnames";
import { motion } from "framer-motion";
import { Text } from "@visx/text";
import {
  FiChevronUp as ChevDown,
  FiChevronDown as ChevUp,
} from "react-icons/fi";

import Members from "./Members";

/**
 * @param node: The node data structure
 * @description: Component to render a node in a tree
 */
const Node = ({
  node,
  highlight,
  onClick,
  isHorizontal,
  dimension,
}: {
  node: HierarchyNode;
  highlight?: boolean;
  onClick: VoidFunction;
  index: number;
  dimension: number[];
  isHorizontal: boolean;
}) => {
  const [dWidth, dHeight] = dimension;
  const scaleFactor = 0.8;
  const [width, height] = [scaleFactor * dWidth, scaleFactor * dHeight];

  const [centerX, centerY] = [-width / 2, -height / 2];

  const isRoot = node.depth == 0;
  const isParent = !!node.data.childrenCount;

  return (
    <motion.g
      variants={{
        enter: {
          opacity: 0,
        },
        animate: {
          opacity: 1,
          x: isHorizontal ? node.y : node.x,
          y: isHorizontal ? node.x : node.y,
        },
        exit: {
          opacity: 0,
        },
      }}
      style={{
        x: isHorizontal ? node.y : node.x,
        y: isHorizontal ? node.x : node.y,
      }}
      exit="exit"
      initial="enter"
      animate="animate"
      className={cn(
        "group cursor-pointer hover:drop-shadow-md",
        node.data.isExpanded ? "cursor-zoom-in" : "cursor-zoom-out"
      )}
      onClick={onClick}
    >
      <rect
        height={height}
        width={width}
        y={centerY}
        x={centerX}
        ry={4}
        className={cn(
          isRoot
            ? "fill-green-300"
            : isParent
            ? "fill-gray-300"
            : "fill-gray-100",
          "transition-colors",
          highlight && "!fill-orange-200"
        )}
      />
      {node.data.childrenCount > 0 && (
        <g>
          {node.data.isExpanded ? (
            <ChevDown
              x={centerX + 4}
              y={centerY + 4}
              size="12"
              className="stroke-gray-400"
            />
          ) : (
            <ChevUp
              x={centerX + 4}
              y={centerY + 4}
              size="12"
              className="stroke-gray-400"
            />
          )}
        </g>
      )}

      <Text
        dx="-3em"
        dy="-1.66em"
        fontSize={12}
        fontFamily="Arial"
        verticalAnchor="start"
        textAnchor="start"
        width={width * 0.8}
        className="fill-gray-800"
      >
        {node.data.name?.replaceAll("-", " ")}
      </Text>
      <Text
        dy="-1.5em"
        dx="4.4em"
        fontSize={10}
        fontFamily="Arial"
        textAnchor="end"
        width={width - 14 * 9}
        className="fill-gray-600"
      >
        {node.data.childrenCount}
      </Text>
      <motion.g style={{ x: -14 * 3, y: 16 }}>
        <Members members={node.data.members} />
      </motion.g>
    </motion.g>
  );
};

export default Node;
