import { ComponentType, LazyExoticComponent } from 'react';

export interface IAppRoute {
  path: string;
  element: any;
  // element: LazyExoticComponent<ComponentType<any>>;
  protected?: boolean;
}
