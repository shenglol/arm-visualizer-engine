import { expect } from 'chai';

import {
    TemplateErrors,
    ARMTemplate
} from '../../src';

describe('ARMTemplate', () => {
    let template: ARMTemplate;

    before(() => {
        template = new ARMTemplate();
    });

    describe('load()', () => {
        it('should throw missing $schema property error when $schema not present', () => {
            let data = `{
                "contentVersion": "",
                "resources": [  ]
            }`;

            expect(() => {
                template.load(data);
            }).to.throw(TemplateErrors.MISSING_$SCHEMA);
        });

        it('should throw missing contentVersion property error when contentVersion not present', () => {
            let data = `{
                "$schema": "1",
                "resources": [  ]
            }`;

            expect(() => {
                template.load(data);
            }).to.throw(TemplateErrors.MISSING_CONTENT_VERSION);
        });

        it('should load a valid template', () => {
            let data = `{
                "$schema": "",
                "contentVersion": "",
                "resources": [  ]
            }`;

            template.load(data);

            expect(template.$schema).to.equal('');
            expect(template.contentVersion).to.equal('');
            expect(template.resources).to.eql([]);
        });
    });

    describe('toString()', () => {
        it('should convert template to JSON string', () => {
            let data = `{
                "$schema": "",
                "contentVersion": "",
                "parameters": {  },
                "variables": {  },
                "resources": [  ],
                "outputs": {  }
            }`;

            template.load(data);

            expect(template.toString()).to.equal(JSON.stringify(JSON.parse(data), null, 2));
        });
    });

    describe('resolveName()', () => {
        it('should resolve resource name', () => {
            let data = `{
                "$schema": "",
                "contentVersion": "",
                "resources": [
                    {
                    "apiVersion": "",
                    "type": "",
                    "name": "[concat('foo', ' ', 'bar')]"
                    }
                ]
            }`;

            template.load(data);

            expect(template.resources.length).to.equal(1);
            expect(template.resources[0].name).to.equal("[concat('foo', ' ', 'bar')]");
            expect(template.resolveName(template.resources[0])).to.equal('foo bar');
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

            template.load(data);
            let dependencies = template.resolveDependencies(template.resources[0]);

            expect(dependencies[0]).to.eql(template.resources[1]);
            expect(dependencies[1]).to.eql(template.resources[2]);
        });

        it('should resolve nested resource dependencies', () => {
            let data = `{
                "$schema": "",
                "contentVersion": "",
                "resources": [
                    {
                    "apiVersion": "",
                    "type": "",
                    "name": "[concat('foo', ' ', 'bar')]",
                    "resources": [
                        {
                        "apiVersion": "",
                        "type": "Microsoft.Web/serverFarms",
                        "name": "child-1"
                        },
                        {
                        "apiVersion": "",
                        "type": "Microsoft.Compute/virtualMachines",
                        "name": "child-2"
                        }
                    ]
                    },
                    {
                    "apiVersion": "",
                    "type": "Microsoft.Web/serverFarms",
                    "name": "hostingPlanName",
                    "dependsOn": [
                        "[concat('Microsoft.Web/serverFarms/', 'child-1')]",
                        "[concat('Microsoft.Compute/virtualMachines/', 'child-2')]"
                    ]
                    }
                ]
            }`;

            template.load(data);
            let dependencies = template.resolveDependencies(template.resources[1]);

            expect(dependencies[0]).to.eql(template.resources[0].resources[0]);
            expect(dependencies[1]).to.eql(template.resources[0].resources[1]);
        });
    });
});
