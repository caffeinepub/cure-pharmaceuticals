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
export interface ShippingAddress {
    country: string;
    city: string;
    apartment: string;
    zipCode: string;
    state: string;
    phone: string;
    lastName: string;
    streetAddress: string;
    firstName: string;
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
export interface OrderItem {
    productName: string;
    quantity: bigint;
    price: number;
}
export interface Order {
    status: string;
    total: number;
    createdAt: Time;
    customerUsername: string;
    shipping: number;
    email: string;
    orderId: string;
    shippingAddress: ShippingAddress;
    customerId: Principal;
    items: Array<OrderItem>;
    subtotal: number;
}
export interface UserProfile {
    username: string;
    registrationDate: Time;
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    addProduct(name: string, brand: string, dosage: string, priceEuros: number, priceUk: number, packaging: string, units: bigint): Promise<void>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    getAllOrders(adminPassword: string): Promise<Array<Order>>;
    getAllProducts(): Promise<Array<PharmaceuticalProduct>>;
    getAllUsers(adminPassword: string): Promise<Array<[Principal, UserProfile]>>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getMyOrders(): Promise<Array<Order>>;
    getProduct(name: string): Promise<PharmaceuticalProduct>;
    getProductsByBrand(brand: string): Promise<Array<PharmaceuticalProduct>>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    placeOrder(email: string, shippingAddress: ShippingAddress, items: Array<OrderItem>, subtotal: number, shipping: number, total: number): Promise<string>;
    registerUser(username: string): Promise<void>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
}
