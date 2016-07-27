import * as TemplateErrors from '../constants/template-errors';
import { ExpressionParser } from '../expressions/expression-parser';
import { Parameters } from './Parameters';
import { Variables } from './Variables';
import { Resource } from './Resource';
import { Outputs } from './Outputs';

export interface Template {
    $schema: string;
    contentVersion: string;
    parameters?: Parameters;
    variables?: Variables;
    resources: Resource[];
    outputs?: Outputs;
}

export class ARMTemplate implements Template {
    private _$schema: string;
    private _contentVersion: string;
    private _parameters: Parameters;
    private _variables: Variables;
    private _resources: Resource[];
    private _outputs: Outputs;
    private _parser: ExpressionParser;

    get $schema(): string {
        return this._$schema;
    }

    get contentVersion(): string {
        return this._contentVersion;
    }

    get parameters(): Parameters {
        return this._parameters;
    }

    get variables(): Variables {
        return this._variables;
    }

    get resources(): Resource[] {
        return this._resources;
    }

    get outputs(): Outputs {
        return this._outputs;
    }

    load(data: string) {
        this.setContent(data);
        this._parser = new ExpressionParser(this);
    }

    toString(): string {
        let template: Template = {
            $schema: this._$schema,
            contentVersion: this._contentVersion,
            parameters: this._parameters,
            variables: this._variables,
            resources: this._resources,
            outputs: this._outputs
        };

        return JSON.stringify(template, null, 2);
    }

    resolveName(resource: Resource): string {
        return <string>this._parser.parse(resource.name);
    }

    resolveDependencies(resource: Resource): Resource[] {
        if (!resource.dependsOn) {
            return [];
        }

        let dependencies: Resource[] = [];
        let sources: string[] = [];

        sources.push.apply(sources, resource.dependsOn);
        for (let source of sources) {
            dependencies.push.apply(dependencies, this.findDependencies(source, this._resources));
        }

        return dependencies;
    }

    private setContent(data: string) {
        let template: Template = JSON.parse(data);

        if (!template.$schema && template.$schema !== '') {
            throw new Error(TemplateErrors.MISSING_$SCHEMA);
        }
        if (!template.contentVersion && template.$schema !== '') {
            throw new Error(TemplateErrors.MISSING_CONTENT_VERSION);
        }
        if (!template.resources && template.resources !== []) {
            throw new Error(TemplateErrors.MISSING_RESOURCES);
        }

        this._$schema = template.$schema;
        this._contentVersion = template.contentVersion;
        this._parameters = template.parameters;
        this._variables = template.variables;
        this._resources = template.resources;
        this._outputs = template.outputs;
    }

    private findDependencies(source: string, resources: Resource[]): Resource[] {
        let dependencies: Resource[] = [];
        let dependencyId = <string>this._parser.parse(source);

        for (let resource of resources) {
            let dependentId = resource.type + '/' + this._parser.parse(resource.name);

            if (dependencyId.indexOf(dependentId) > -1) {
                dependencies.push(resource);
            }

            if (resource.resources) {
                dependencies.push.apply(dependencies, this.findDependencies(source, resource.resources));
            }
        }

        if (dependencies.length === 0) {
            throw new Error(TemplateErrors.UNABLE_TO_FIND_DEPENDENCIES);
        }

        return dependencies;
    }
}
