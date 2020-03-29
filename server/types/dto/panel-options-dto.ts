import { BaseRequest } from "../base-request";

export type PanelOptionsDTO = BaseRequest<PanelOptions>;

export type PanelOptions = {
    left: Section[];
    center: {
      iconUrl: string;
      label: string;
      url: string;
    };
    right: {
      buttons: Section[];
      user: {
        avatarUrl: string;
        mainLabel: string;
        subLabel: string;
      }
    };
};

export type Section = {
    title: string;
    url: string;
};
