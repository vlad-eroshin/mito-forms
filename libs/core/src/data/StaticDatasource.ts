import type { DataSourceConfig, DataSourceState, ParamsMap, StaticAction } from '../types';
import { DataStatus } from '../types';

export const refreshStaticDatasource = (
  config: DataSourceConfig,
  _browserUrlParams: ParamsMap
): Promise<DataSourceState> => {
  const staticAction: StaticAction = config.action as StaticAction;
  const data = staticAction.staticData;
  return new Promise<DataSourceState>(resolve => {
    resolve({
      id: config.id,
      status: DataStatus.Loaded,
      resultFormat: config.resultFormat,
      data,
    });
  });
};
