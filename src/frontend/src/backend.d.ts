import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export type Time = bigint;
export interface UserProfile {
    username: string;
    registrationDate: Time;
}
export interface PharmaceuticalProduct {
    dosage: string;
    name: string;
    priceEurope: number;
    priceUk: number;
    units: bigint;
    brand: string;
    packaging: string;
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    addProduct(name: string, brand: string, dosage: string, priceEuros: number, priceUk: number, packaging: string, units: bigint): Promise<void>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    getAllProducts(): Promise<Array<PharmaceuticalProduct>>;
    getAllUsers(): Promise<Array<[Principal, UserProfile]>>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getProduct(name: string): Promise<PharmaceuticalProduct>;
    getProductsByBrand(brand: string): Promise<Array<PharmaceuticalProduct>>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    registerUser(username: string): Promise<void>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
}
