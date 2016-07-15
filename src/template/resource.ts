export interface Resource {
    apiVersion: string;
    type: string;
    name: string;
    location?: string;
    tags?: Object;
    comments?: string | Object;
    dependsOn?: string | string[];
    properties?: Object;
    resources?: Resource[];
}
