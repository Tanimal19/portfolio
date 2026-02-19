export type ChildNav = {
  title: string;
  url: string;
};

export type ChildNavSetter = (navs: ChildNav[]) => () => void;

export const childNavsContext = Symbol("child-navs-context");
