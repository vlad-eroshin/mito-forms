import { ParamsMap } from './common';
import { FormDataState } from './state';

/**
 * Object used to represent Expression Context for conditional attributes evaluation
 */
export type ExpressionContext = ParamsMap & {
  _STATE: { [key: string]: FormDataState };
  _CONTEXT: ParamsMap;
};
