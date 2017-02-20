import { Parameters } from './parameters';
import { Variables } from './variables';
import { Resource } from './resource';
import { Outputs } from './outputs';

export interface Template {
  $schema: string;
  contentVersion: string;
  parameters?: Parameters;
  variables?: Variables;
  resources: Resource[];
  outputs?: Outputs;
}
