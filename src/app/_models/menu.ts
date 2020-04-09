export interface MainMenuItem {
    name: string;
    title?: string;
    type: string;
    path?: string;
    href?: string;
    icon?: string;
    children?: Array<ChildrenItems>
}
export interface ChildrenItems {
    name: string;
    title?: string;
    path?: string;
    href?: string;
    child?: Array<any>
}

