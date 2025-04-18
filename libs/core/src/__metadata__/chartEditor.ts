import { EditorMetadata } from '../types';

export type VegaLiteSpec = object;

export const chartEditorMetadata: EditorMetadata<VegaLiteSpec> = {
  displayAs: 'onePage',
  forms: [
    {
      id: 'chartForm',
      fieldSets: [
        {
          name: 'chartType',
          type: 'fieldSet',
          fields: [
            {
              name: 'chartType',
              type: 'select',
              label: 'Chart Type',
              options: [
                { value: 'bar', label: 'Bar' },
                { value: 'line', label: 'Line' },
                { value: 'point', label: 'Point' },
                { value: 'area', label: 'Area' },
                { value: 'circle', label: 'Circle' },
                { value: 'square', label: 'Square' },
                { value: 'tick', label: 'Tick' },
                { value: 'rect', label: 'Rectangle' },
                { value: 'rule', label: 'Rule' },
                { value: 'text', label: 'Text' },
              ],
            },
          ],
        },
        {
          name: 'xField',
          type: 'fieldSet',
          fields: [
            {
              name: 'xField',
              type: 'text',
              label: 'X Field',
            },
          ],
        },
        {
          name: 'xType',
          type: 'fieldSet',
          fields: [
            {
              name: 'xType',
              type: 'select',
              label: 'X Type',
              options: [
                { value: 'quantitative', label: 'Quantitative' },
                { value: 'ordinal', label: 'Ordinal' },
                { value: 'nominal', label: 'Nominal' },
                { value: 'temporal', label: 'Temporal' },
              ],
            },
          ],
        },
        {
          name: 'yField',
          type: 'fieldSet',
          fields: [
            {
              name: 'yField',
              type: 'text',
              label: 'Y Field',
            },
          ],
        },
        {
          name: 'yType',
          type: 'fieldSet',
          fields: [
            {
              name: 'yType',
              type: 'select',
              label: 'Y Type',
              options: [
                { value: 'quantitative', label: 'Quantitative' },
                { value: 'ordinal', label: 'Ordinal' },
                { value: 'nominal', label: 'Nominal' },
                { value: 'temporal', label: 'Temporal' },
              ],
            },
          ],
        },
      ],
    },
  ],
  reducersMap: {
    // chartForm: {
    //   chartType: (spec: VegaLiteSpec, values: ParamsMap) => (
    //     { ...spec, mark: values.chartType as VegaLiteSpec['mark'] }),
    //   xField: (spec: VegaLiteSpec, values: ParamsMap) => ({
    //     ...spec,
    //     encoding: {
    //       ...spec.encoding,
    //       x: { ...spec.encoding?.x, field: values.xField as string }
    //     }
    //   } as VegaLiteSpec),
    //   xType: (spec: VegaLiteSpec, values: ParamsMap) => ({
    //     ...spec,
    //     encoding: {
    //       ...spec.encoding,
    //       x: { ...spec.encoding?.x, type: values.xType as StandardType }
    //     }
    //   } as VegaLiteSpec),
    //   yField: (spec: VegaLiteSpec, values: ParamsMap) => ({
    //     ...spec,
    //     encoding: {
    //       ...spec.encoding,
    //       y: { ...spec.encoding?.y, field: values.yField as string }
    //     }
    //   } as VegaLiteSpec),
    //   yType: (spec: VegaLiteSpec, values: ParamsMap) => ({
    //     ...spec,
    //     encoding: {
    //       ...spec.encoding,
    //       y: { ...spec.encoding?.y, type: values.yType as StandardType }
    //     }
    //   } as VegaLiteSpec)
    //}
  },
};
