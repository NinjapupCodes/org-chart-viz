import { HierarchyNode } from "@visx/hierarchy/lib/types";
import { TreeNode } from "../types";
type Node = HierarchyNode<TreeNode>;
type ReturnType = { node: Node; path: TreeNode["id"][] } | null;

import randW from "random-words";

export function findNode(
  root: Node,
  comparator: (node: Node) => boolean
): ReturnType {
  const dfs = (node: Node | null, path: string[]): ReturnType => {
    if (!node) {
      return null;
    }
    if (comparator(node)) {
      return { node, path: [...path, node.data.id] };
    }

    for (let child of node.children ?? []) {
      const res = dfs(child, [...path, node.data.id]);
      if (res) return res;
    }

    return null;
  };

  return dfs(root, []);
}

export const springConfig = {
  type: "spring",
  stiffness: 400,
  damping: 40,
};

export const commonVariants = (inject: Record<string, any> = {}) => ({
  exit: {
    ...inject,
    opacity: 0,
    transition: {
      when: "afterChildren",
      staggerChildren: 0.1,
    },
  },
  enter: {
    ...inject,
    opacity: 0,
    transition: {
      staggerChildren: 0.1,
    },
  },
  animate: {
    ...inject,
    opacity: 1,
  },
});

export const genRandomData = (branchingRate = 0.7, maxDepth = 10): TreeNode => {
  let i = 1;
  const buildTree = (node: TreeNode, depth = 0): TreeNode | null => {
    if (depth >= maxDepth || i > 300) {
      console.log("Terminated due to exceeding max depth");
      return null;
    }
    if (!node.children) {
      node.children = [];
    }
    if (!node.members) {
      node.members = [];
    }
    let m = Math.random();
    while (m <= branchingRate) {
      const teamName = randW(3).join("-");
      const newNode = {
        id: i.toString(),
        name: teamName,
        children: [],
        members: [],
        childrenCount: 0,
      } as TreeNode;
      i++;

      while (Math.random() < branchingRate) {
        let name = randW(2).join(" ");
        node.members.push({
          email: (name + "co.com").replace(" ", "."),
          name: name,
          role: Math.random() > 0.3 ? "member" : "manager",
        });
      }

      const transformed = buildTree(newNode, depth + 1);
      if (transformed) {
        node.children.push(transformed);
      }
      m = Math.random();
    }

    node.childrenCount = node.children.length;
    return node;
  };

  return buildTree({
    id: "0",
    members: [{ name: "Thanh", email: "thanh@co.com", role: "superadmin" }],
  } as TreeNode)!;
};
