export interface Address {
    addressNumber?: string | undefined;
    country: string;
    geometry: {
      point: number[];
    };
    interpolated: boolean;
    label: string;
    municipality: string;
    neighborhood?: string | undefined;
    postalCode: string;
    region: string;
    street: string;
    subRegion: string;
    timeZone: {
      name: string;
      offset: number;
    };
    unitNumber?: string | undefined;
    unitType?: string | undefined;
  }
  