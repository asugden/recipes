export default interface IUnits {
  id: number;
  name: string;
  abbrev: string;
  is_volume: boolean;
  conversion_to_ml?: number;
  converstion_to_g?: number;
}
