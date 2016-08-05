import { TemplateErrors } from '../constants';
import { Resource } from './resource';
import { Template } from './template';
import { ExpressionBuilder } from '../expressions';
import { ExpressionParser } from '../expressions';

const defaultTemplate: Template = {
   $schema: "http://schema.management.azure.com/schemas/2015-01-01/deploymentTemplate.json#",
   contentVersion: "",
   parameters: {},
   variables: {},
   resources: [],
   outputs: {}
};

export class TemplateEngine {
    private _template: Template;
    private _resolveErrors: string[];
    private parser: ExpressionParser;

    get template(): Template {
        return this._template;
    }

    get templateData(): string {
        return JSON.stringify(this._template, null, 2);
    }

    get templateResources(): Resource[] {
        // TODO: copyIndex();
        let resources: Resource[] = [];

        for (let resource of this._template.resources) {
            resources.push(resource);
            resources = resources.concat(this.getDescendants(resource));
        }

        return resources;
    }

    get resolveErrors(): string[] {
        return this._resolveErrors;
    }

    constructor() {
        this._template = defaultTemplate;
        this.parser = new ExpressionParser(new ExpressionBuilder(this));
    }

    loadTemplate(data: string) {
        let template: Template = JSON.parse(data);

        if (!template.$schema && template.$schema !== '') {
            throw new Error(TemplateErrors.MISSING_$SCHEMA);
        }
        if (!template.contentVersion && template.contentVersion !== '') {
            throw new Error(TemplateErrors.MISSING_CONTENT_VERSION);
        }
        if (!template.resources && template.resources !== []) {
            throw new Error(TemplateErrors.MISSING_RESOURCES);
        }

        this._template = template;
        this.parser.clearCache();
    }

    resolveExpression(source: string): string | Object | any[] {
        try {
            return this.parser.parse(source);
        } catch (error) {
            console.log(TemplateErrors.UNABLE_TO_RESOLVE_EXPRESSION);
            return source;
        }
    }

    resolveDependencies(resource: Resource): Resource[] {
        if (!resource.dependsOn) {
            return [];
        }

        let deps: Resource[] = [];
        let sources: string[] = typeof resource.dependsOn === 'string'
            ? [<string>resource.dependsOn]
            : <string[]>resource.dependsOn;

        for (let source of sources) {
            let depId = <string>this.resolveExpression(source);
            deps = deps.concat(this.getDependencies(depId, '', this.template.resources));
        }

        return deps;
    }

    clearResolveErrors() {
        this._resolveErrors = [];
    }

    private getDescendants(resource: Resource): Resource[] {
        let descendants: Resource[] = [];

        for (let child of resource.resources || []) {
            descendants.push(child);
            descendants = descendants.concat(this.getDescendants(child));
        }

        return descendants;
    }

    private getDependencies(depId: string, parentId: string, resources: Resource[]): Resource[] {
        let deps: Resource[] = [];

        for (let resource of resources) {
            let resourceId = parentId + resource.type + '/' + this.resolveExpression(resource.name);
            let index = depId.indexOf(resourceId);

            if (index > -1) {
                if (depId.substring(index + resourceId.length) === '') {
                    deps.push(resource);
                } else {
                    if (resource.resources) {
                        deps = deps.concat(this.getDependencies(depId, resourceId + '/', resource.resources));
                    }
                }
            }
        }

        if (deps.length === 0) {
            console.error(TemplateErrors.UNABLE_TO_FIND_DEPENDENCIES);
        }
        if (deps.length > 1) {
            console.error(TemplateErrors.FOUND_MORE_THAN_ONE_DEPENDENCY);
        }

        return deps;
    }
}
