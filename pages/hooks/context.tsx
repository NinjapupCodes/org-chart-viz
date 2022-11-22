import React, { ReactNode, useCallback, useContext, useState } from "react";

const Context = React.createContext({});

export const DataContextProvider = ({
  value,
  children,
}: {
  value: Record<string, any>;
  children: ReactNode;
}) => {
  const [state, setState] = useState(value);

  const set = useCallback(
    (key: string, value: any) => {
      setState({ ...state, [key]: value });
    },
    [state]
  );

  return (
    <Context.Provider value={{ data: state, update: setState, set }}>
      {children}
    </Context.Provider>
  );
};

// eslint-disable-next-line react-hooks/rules-of-hooks
export const useData = () => useContext(Context);
