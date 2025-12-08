export {};

declare global {
  interface Window {
    nordvpn: {
      getCountries: () => Promise<string>;
      account: () => Promise<string>;
      nordVpnStatus: () => Promise<string>;
      nordvpnConnect: (country?: string) => Promise<string>;
      nordvpnDisconnect: () => Promise<string>;
    };
  }
}