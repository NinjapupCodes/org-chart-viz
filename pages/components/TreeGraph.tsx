import { hierarchy, Tree } from "@visx/hierarchy";
import { LinkHorizontal, LinkVertical } from "@visx/shape";
import { ReactComponentElement, useMemo, useState } from "react";
import { Zoom } from "@visx/zoom";
import { TreeNode } from "../../types";
import { Group } from "@visx/group";
import Node from "./Node";
import cn from "classnames";
import { findNode } from "../../hooks/utils";
import { useFormContext } from "react-hook-form";
import ZoomReaction from "./ZoomReaction";
import useForceUpdate from "../../hooks/forceUpdate";
import { AnimatePresence } from "framer-motion";
import Link from "./Link";
import { ParentSize } from "@visx/responsive";
import treeData from "../mock/treeData.json";
import Drawer from "./Drawer";
import { HierarchyPointNode } from "@visx/hierarchy/lib/types";

const rawTree: TreeNode = treeData as unknown as TreeNode;

const chooseLinkComponent = (isHorizontal: boolean) =>
  //@ts-ignore
  !isHorizontal ? LinkVertical : LinkHorizontal;

const conditionalReverse = (arr: any[], cond: boolean) => {
  return cond ? [...arr].reverse() : arr;
};

const TreeGraph = ({
  layout = "vertical",
}: {
  layout: "vertical" | "horizontal";
  collapseThreshold?: number;
}) => {
  const [_, forceUpdate] = useForceUpdate();
  const [selected, setSelected] = useState<HierarchyPointNode<TreeNode> | null>(
    null
  );

  const data = useMemo(() => {
    return hierarchy(rawTree, (d) => {
      return d.isExpanded ? null : d.children;
    });
  }, [_]);

  const { watch } = useFormContext();
  const [highlight, isHorizontal] = watch(["highlight", "horizontalMode"]);

  const { node: foundNode, path: highlightPath } = useMemo(() => {
    return (
      findNode(
        data,
        (node) =>
          node.data.name === highlight ||
          !!node.data.members.find((d) => d.name === highlight)
      ) ?? {
        node: null,
        path: [] as string[],
      }
    );
  }, [data, highlight]);

  const initialTransform = {
    scaleX: 1,
    scaleY: 1,
    translateX: 0,
    translateY: 0,
    skewX: 0,
    skewY: 0,
  };

  const nodeSize = [14 * 10, 14 * 5];

  const LinkComponent = useMemo(
    () => chooseLinkComponent(isHorizontal),
    [isHorizontal]
  );

  return (
    <>
      <ParentSize>
        {(parent) => {
          const [width, height, margin] = [
            parent.width,
            parent.height,
            { top: 14 * 4, bottom: 14 * 2, left: 14 * 2, right: 14 * 2 },
          ];
          const yMax = height - margin.top - margin.bottom;
          const xMax = width - margin.left - margin.right;

          return (
            <Zoom<SVGSVGElement>
              width={width}
              height={height}
              scaleXMin={1}
              scaleXMax={1}
              scaleYMin={1}
              scaleYMax={1}
              initialTransformMatrix={initialTransform}
            >
              {(zoom) => (
                <svg
                  width={width}
                  height={height}
                  className="mx-auto border rounded-md"
                  style={{
                    touchAction: "none",
                  }}
                  ref={zoom.containerRef}
                >
                  <Tree<TreeNode>
                    root={data}
                    nodeSize={
                      conditionalReverse(nodeSize, isHorizontal) as [
                        number,
                        number
                      ]
                    }
                  >
                    {(tree) => {
                      return (
                        <Group
                          top={!isHorizontal ? margin.top : margin.left}
                          left={!isHorizontal ? margin.left : margin.top}
                          transform={zoom.toString()}
                        >
                          <ZoomReaction
                            zoom={zoom}
                            origin={
                              isHorizontal
                                ? { x: xMax / 2, y: yMax / 2 }
                                : { x: yMax / 2, y: xMax / 2 }
                            }
                            centeredAt={{
                              x: isHorizontal
                                ? //@ts-ignore
                                  foundNode?.y ?? 0
                                : //@ts-ignore
                                  foundNode?.x ?? 0,
                              //@ts-ignore
                              y: isHorizontal
                                ? //@ts-ignore
                                  foundNode?.x ?? 0
                                : //@ts-ignore
                                  foundNode?.y ?? 0,
                            }}
                          />

                          <AnimatePresence>
                            {tree.links().map((link, i) => {
                              const highlighted = highlightPath.includes(
                                link.target.data.id ?? ""
                              );
                              return (
                                <LinkComponent
                                  key={`link-${link.source.data.id}-${link.target.data.id}`}
                                  data={link}
                                >
                                  {({ path }) => (
                                    <Link
                                      path={path(link) ?? ""}
                                      index={i}
                                      className={cn(
                                        "stroke-gray-200 stroke-1 fill-none transition-colors",
                                        highlighted && "stroke-orange-400"
                                      )}
                                    />
                                  )}
                                </LinkComponent>
                              );
                            })}
                          </AnimatePresence>
                          <AnimatePresence>
                            {tree.descendants().map((node, i) => (
                              <Node
                                key={`node-${node.data.id}`}
                                node={node}
                                highlight={highlightPath.includes(node.data.id)}
                                index={i}
                                isHorizontal={isHorizontal}
                                onClick={() => {
                                  node.data.isExpanded = !node.data.isExpanded;
                                  setSelected(node);
                                  //@ts-ignore
                                  forceUpdate();
                                }}
                                dimension={nodeSize}
                              />
                            ))}
                          </AnimatePresence>
                        </Group>
                      );
                    }}
                  </Tree>
                </svg>
              )}
            </Zoom>
          );
        }}
      </ParentSize>
      <Drawer node={selected} />
    </>
  );
};

export default TreeGraph;
