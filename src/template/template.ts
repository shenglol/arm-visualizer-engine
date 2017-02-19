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
