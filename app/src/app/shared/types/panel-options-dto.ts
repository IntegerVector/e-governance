export interface PanelOptionsDTO {
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
}

export interface Section {
    title: string;
    url: string;
}
