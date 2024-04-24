export interface IAppRoute {
  path: string;
  element: () => JSX.Element;
  protected?: boolean;
}
