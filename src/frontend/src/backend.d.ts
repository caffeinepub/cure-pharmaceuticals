import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export type PricingRegion = {
    __kind__: "uk";
    uk: number;
} | {
    __kind__: "europe";
    europe: number;
};
export interface PharmaceuticalProduct {
    dosage: string;
    name: string;
    units: bigint;
    brand: string;
    price: PricingRegion;
    packaging: string;
}
export interface backendInterface {
    addProduct(name: string, brand: string, dosage: string, priceEuros: number, priceUk: number, packaging: string, units: bigint): Promise<void>;
    getAllProducts(): Promise<Array<PharmaceuticalProduct>>;
    getProduct(name: string): Promise<PharmaceuticalProduct>;
    getProductsByBrand(brand: string): Promise<Array<PharmaceuticalProduct>>;
}
