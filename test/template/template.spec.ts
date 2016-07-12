/// <reference path='../../typings/index.d.ts' />

import * as TemplateErrors from '../../src/constants/template-errors';
import { ARMTemplate } from '../../src/template/template';

describe('ARMTemplate', () => {

  let template: ARMTemplate;

  beforeAll(() => {
    template = new ARMTemplate();
  });

  it('Should throw missing $schema property error', () => {
    let data = `{
      "contentVersion": "",
      "resources": [  ]
    }`;

    expect(() => {
      template.load(data);
    }).toThrowError(TemplateErrors.MISSING_$SCHEMA);
  });

  it('Should throw missing contentVersion property error', () => {
    let data = `{
      "$schema": "1",
      "resources": [  ]
    }`;

    expect(() => {
      template.load(data);
    }).toThrowError(TemplateErrors.MISSING_CONTENT_VERSION);
  });

  it('Should load valid template data', () => {
    let data = `{
      "$schema": "",
      "contentVersion": "",
      "resources": [  ]
    }`;

    template.load(data);

    expect(template.$schema).toEqual('');
    expect(template.contentVersion).toEqual('');
    expect(template.resources).toEqual([]);
  });

  it('Should convert to JSON string', () => {
    let data = `{
      "$schema": "",
      "contentVersion": "",
      "parameters": {  },
      "variables": {  },
      "resources": [  ],
      "outputs": {  }
    }`;

    template.load(data);

    expect(template.toString()).toEqual(JSON.stringify(JSON.parse(data), null, 2));
  });

  it('Should resolve resource name', () => {
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

    expect(template.resources.length).toEqual(1);
    expect(template.resources[0].name).toEqual("[concat('foo', ' ', 'bar')]");
    expect(template.resolveName(template.resources[0])).toEqual('foo bar');
  });

  it('Should resolve resource dependencies', () => {
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

    expect(dependencies[0]).toBe(template.resources[1]);
    expect(dependencies[1]).toBe(template.resources[2]);
  });

  it('Should resolve nested resource dependencies', () => {
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

    expect(dependencies[0]).toBe(template.resources[0].resources[0]);
    expect(dependencies[1]).toBe(template.resources[0].resources[1]);
  });

});
