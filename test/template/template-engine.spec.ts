import { expect } from 'chai';

import { TemplateEngine } from '../../src';

describe('TemplateEngine', () => {
    let engine: TemplateEngine;

    beforeEach(() => {
        engine = new TemplateEngine();
    });

    it('should set default engine', () => {
        expect(engine.template.$schema).to.equal(
            'http://schema.management.azure.com/schemas/2015-01-01/deploymentTemplate.json#');
        expect(engine.template.contentVersion).to.equal('');
        expect(engine.template.parameters).to.eql({});
        expect(engine.template.variables).to.eql({});
        expect(engine.template.resources).to.eql([]);
        expect(engine.template.outputs).to.eql({});
    });

    describe('loadTemplate()', () => {
        it('should add MissingTemplatePropertyError when necessary properties not present', () => {
            let data = `{}`;

            engine.loadTemplate(data);

            expect(engine.errorManager.templateErrors.length).to.equal(3);
        });

        it('should load a valid engine', () => {
            let data = `{
                "$schema": "",
                "contentVersion": "",
                "resources": [  ]
            }`;

            engine.loadTemplate(data);

            expect(engine.template.$schema).to.equal('');
            expect(engine.template.contentVersion).to.equal('');
            expect(engine.template.resources).to.eql([]);
        });
    });

    describe('loadTemplate', () => {
        it('should return engine JSON string', () => {
            let data = `{
                "$schema": "",
                "contentVersion": "",
                "parameters": {  },
                "variables": {  },
                "resources": [  ],
                "outputs": {  }
            }`;

            engine.loadTemplate(data);

            expect(engine.templateData).to.equal(JSON.stringify(JSON.parse(data), null, 2));
        });
    });

    describe('resolveAllResources', () => {
        it('should return all engine resources', () => {
            let data = `{
                "$schema": "",
                "contentVersion": "",
                "resources": [
                    {
                        "apiVersion": "",
                        "type": "",
                        "name": "parent1",
                        "resources": [
                            {
                                "apiVersion": "",
                                "type": "",
                                "name": "child1",
                                "resources": [
                                    {
                                        "apiVersion": "",
                                        "type": "",
                                        "name": "grandchild1"
                                    },
                                    {
                                        "apiVersion": "",
                                        "type": "",
                                        "name": "grandchild2"
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "apiVersion": "",
                        "type": "",
                        "name": "parent2",
                        "resources": [
                            {
                                "apiVersion": "",
                                "type": "",
                                "name": "child2",
                                "resources": [
                                    {
                                        "apiVersion": "",
                                        "type": "",
                                        "name": "grandchild3"
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }`;

            engine.loadTemplate(data);

            expect(engine.resolveAllResources().length).to.equal(7);
        });
    });

    describe('resolveDependencies()', () => {
        it('should resolve resource dependencies', () => {
            let data = `{
                "$schema": "",
                "contentVersion": "",
                "resources": [
                    {
                        "apiVersion": "",
                        "type": "",
                        "name": "[concat('foo', ' ', 'bar')]",
                        "dependsOn": [
                            "[concat('Microsoft.Web/serverFarms/', 'hostingPlanName')]",
                            "[concat('Microsoft.Web/serverFarms/', 'siteName')]"
                        ]
                    },
                    {
                        "apiVersion": "",
                        "type": "Microsoft.Web/serverFarms",
                        "name": "hostingPlanName"
                    },
                    {
                        "apiVersion": "",
                        "type": "Microsoft.Web/serverFarms",
                        "name": "siteName"
                    }
                ]
            }`;

            engine.loadTemplate(data);
            let dependencies = engine.resolveDependencies(engine.template.resources[0]);

            expect(dependencies[0]).to.eql(engine.template.resources[1]);
            expect(dependencies[1]).to.eql(engine.template.resources[2]);
        });

        it('should resolve nested resource dependencies', () => {
            let data = `{
                "$schema": "",
                "contentVersion": "",
                "resources": [
                    {
                        "apiVersion": "",
                        "type": "Microsoft.Web/sites",
                        "name": "parent1",
                        "resources": [
                            {
                                "apiVersion": "",
                                "type": "Microsoft.Web/serverFarms",
                                "name": "child-1"
                            },
                            {
                                "apiVersion": "",
                                "type": "Microsoft.Compute/virtualMachines",
                                "name": "child-2",
                                "resources": [
                                    {
                                        "apiVersion": "",
                                        "type": "Microsoft.Web/serverFarms",
                                        "name": "grandchild1"
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "apiVersion": "",
                        "type": "Microsoft.Web/serverFarms",
                        "name": "hostingPlanName",
                        "dependsOn": [
                            "Microsoft.Web/sites/parent1",
                            "resourceGroup/Microsoft.Web/sites/parent1/Microsoft.Web/serverFarms/child-1",
                            "Microsoft.Web/sites/parent1/Microsoft.Compute/virtualMachines/child-2/Microsoft.Web/serverFarms/grandchild1"
                        ]
                    }
                ]
            }`;

            engine.loadTemplate(data);
            let dependencies = engine.resolveDependencies(engine.template.resources[1]);

            expect(dependencies[0]).to.eql(engine.template.resources[0]);
            expect(dependencies[1]).to.eql(engine.template.resources[0].resources[0]);
            expect(dependencies[2]).to.eql(engine.template.resources[0].resources[1].resources[0]);
        });
    });
});
