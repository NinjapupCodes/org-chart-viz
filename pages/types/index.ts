import { HierarchyPointNode } from "@visx/hierarchy/lib/types";

export interface Member {
  name: string;
  email: string;
  role: "manager" | "admin" | "superadmin" | "member";
}
export interface TreeNode {
  id: string;
  name: string;
  members: Member[];
  isExpanded?: boolean;
  children?: this[];
  childrenCount: number;
}

export type HierarchyNode = HierarchyPointNode<TreeNode>;
