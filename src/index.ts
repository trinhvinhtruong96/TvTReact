import React from "react";

declare global {
  type StringWithSuggestion<Suggestion extends string> =
    | Suggestion
    | (string & {});

  type ParentProps = {
    children?: React.ReactNode;
  };

  type StyledProps = {
    className?: string;
    style?: React.CSSProperties;
  };

  type IndexProps = {
    index?: number;
  };
}

export {}; // This line is necessary to ensure the file is treated as a module.
