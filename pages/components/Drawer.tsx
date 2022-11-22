import { HierarchyPointNode } from "@visx/hierarchy/lib/types";
import React from "react";
import { TreeNode } from "../types";

const Drawer = ({ node }: { node?: HierarchyPointNode<TreeNode> | null }) => {
  if (!node) return null;

  return (
    <div className="h-screen fixed right-0 top-0 w-[30rem] bg-orange-50 z-10 p-4 flex flex-col gap-4 shadow-lg overflow-auto">
      <h1 className="text-3xl font-semibold">{node.data.name}</h1>
      <div>
        <p className="text-xl font-medium">
          Sub teams ({node.data.childrenCount})
        </p>
        <ul>
          {node.children?.map((d) => (
            <li key={d.data.id}>{d.data.name}</li>
          ))}
        </ul>
      </div>
      <div>
        <p className="text-xl font-medium mb-2">
          Members ({node.data.members.length})
        </p>
        <ul>
          {node.data.members?.map((d) => (
            <li key={d.email} className="capitalize flex justify-between my-2">
              <div>
                <p className="text-md font-medium mb-0">{d.name}</p>
                <p className="lowercase text-gray-800">{d.email}</p>
              </div>
              <span>{d.role}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Drawer;
