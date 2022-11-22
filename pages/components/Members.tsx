import { Member } from "../types/index";
import React, { useMemo } from "react";
import { Text } from "@visx/text";
import { motion } from "framer-motion";
import classNames from "classnames";
import { FiStar } from "react-icons/fi";

const Members = ({ members }: { members: Member[] }) => {
  const truncatedList = useMemo(() => {
    members.sort((a, b) => {
      const values = {
        superadmin: 4,
        admin: 3,
        manager: 2,
        member: 1,
      };
      return values[b.role] - values[a.role];
    });

    return members.filter((_, i) => i < 5);
  }, [members]);
  const remainder = members.length - truncatedList.length;
  return (
    <>
      {[
        ...truncatedList.map((mem, i) => {
          return (
            <motion.g key={mem.email} style={{ x: i * 14.5 }}>
              <circle
                className={classNames(
                  mem.role === "member" && "fill-gray-200",
                  mem.role === "manager" && "fill-green-200",
                  ["superadmin", "admin"].includes(mem.role) &&
                    "fill-orange-400"
                )}
                r={7}
              />
              <Text
                fontSize={10}
                fontFamily="Arial"
                textAnchor="middle"
                verticalAnchor="middle"
                className="fill-gray-800"
              >
                {mem.name[0].toUpperCase()}
              </Text>
              {["superadmin", "admin", "manager"].includes(mem.role) && (
                <FiStar
                  className="stroke-yellow-500 fill-yellow-200"
                  fontSize={8}
                  dx="-1em"
                  dy="1em"
                />
              )}
            </motion.g>
          );
        }),
        remainder ? (
          <motion.g key={"additional"} style={{ x: 5.5 * 14.5 }}>
            <circle className={"fill-slate-500"} r={9} cx={5} />
            <circle className={"fill-slate-300"} r={9} />
            <Text
              fontSize={8}
              className="fill-gray-500"
              textAnchor="middle"
              fontWeight={600}
              dy="0.35em"
            >
              {`${remainder}+`}
            </Text>
          </motion.g>
        ) : null,
      ]}
    </>
  );
};

export default Members;
