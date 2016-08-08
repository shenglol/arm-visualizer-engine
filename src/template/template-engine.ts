import { Resource } from './resource';
import { Template } from './template';
import { ExpressionBuilder } from '../expressions';
import { ExpressionParser } from '../expressions';
import { ErrorManager } from '../shared';
import {
    MissingTemplatePropertyError,
    DependencyNotFoundError,
    DuplicateDependenciesError
} from '../shared';

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
    private _templateData: string;
    private _errorManager: ErrorManager;
    private parser: ExpressionParser;

    get template(): Template {
        return this._template;
    }

    get templateData(): string {
        if (this.template) {
            this._templateData = JSON.stringify(this.template, null, 2);
        }

        return this._templateData;
    }

    get errorManager(): ErrorManager {
        return this._errorManager;
    }

    constructor() {
        this.setTemplate(defaultTemplate);
        this._errorManager = new ErrorManager();
        this.parser = new ExpressionParser(new ExpressionBuilder(this));
    }

    loadTemplate(data: string) {
        this.errorManager.clearErrors();
        this.setTemplateData(data);
        this.parser.clearCache();

        try {
            let template: Template = JSON.parse(data);
            this.setTemplate(template);

            // TODO: validate template and try to get errors
            // 1. Resolve every expression in template
            // 2. Get dependencies of every resource

        } catch (error) {
            this.setTemplate(null);
            this.errorManager.addTemplateError(error);
        }
    }

    resolveExpression(source: string): string | Object | any[] {
        try {
            return this.parser.parse(source);
        } catch (error) {
            this.errorManager.addExpressionError(source, error);
            return source;
        }
    }

    resolveAllResources(): Resource[] {
        if (!this.template) {
            return [];
        }

        // TODO: copyIndex();
        let resources: Resource[] = [];

        for (let resource of this.template.resources) {
            resources.push(resource);
            resources = resources.concat(this.getDescendants(resource));
        }

        return resources;
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
            try {
                deps.push(this.getDependency(source, this.template.resources));
            } catch (error) {
                this.errorManager.addTemplateError(error);
            }
        }

        return deps;
    }

    private setTemplate(template: Template) {
        this._template = template;

        if (!template) {
            return;
        }

        if (!template.$schema && template.$schema !== '') {
            this.errorManager.addTemplateError(new MissingTemplatePropertyError('$schema'));
        }
        if (!template.contentVersion && template.contentVersion !== '') {
            this.errorManager.addTemplateError(new MissingTemplatePropertyError('contentVersion'));
        }
        if (!template.resources && template.resources !== []) {
            this.errorManager.addTemplateError(new MissingTemplatePropertyError('resources'));
        }
    }

    private setTemplateData(data: string) {
        this._templateData = data;
    }

    private getDescendants(resource: Resource): Resource[] {
        let descendants: Resource[] = [];

        for (let child of resource.resources || []) {
            descendants.push(child);
            descendants = descendants.concat(this.getDescendants(child));
        }

        return descendants;
    }

    private getDependency(source: string, resources: Resource[]): Resource {
        let depId = <string>this.resolveExpression(source);
        let deps = this.getDependencyHelper(depId, '', this.template.resources);

        if (deps.length < 1) {
            throw new DependencyNotFoundError(source);
        }
        if (deps.length > 1) {
            throw new DuplicateDependenciesError(source);
        }

        return deps[0];
    }

    private getDependencyHelper(depId: string, parentId: string, resources: Resource[]): Resource[] {
        let deps: Resource[] = [];

        for (let resource of resources) {
            let resourceId = parentId + resource.type + '/' + this.resolveExpression(resource.name);
            let index = depId.indexOf(resourceId);

            if (index > -1) {
                if (depId.substring(index + resourceId.length) === '') {
                    deps.push(resource);
                } else {
                    if (resource.resources) {
                        deps = deps.concat(this.getDependencyHelper(depId, resourceId + '/', resource.resources));
                    }
                }
            }
        }

        return deps;
    }
}
