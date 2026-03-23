import Iter "mo:core/Iter";
import Time "mo:core/Time";
import Text "mo:core/Text";
import Float "mo:core/Float";
import Order "mo:core/Order";
import Array "mo:core/Array";
import Map "mo:core/Map";
import List "mo:core/List";
import Runtime "mo:core/Runtime";
import Principal "mo:core/Principal";

import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";

actor {
  type UserProfile = {
    username : Text;
    registrationDate : Time.Time;
  };

  type PharmaceuticalProduct = {
    name : Text;
    brand : Text;
    dosage : Text;
    priceEurope : Float;
    priceUk : Float;
    packaging : Text;
    units : Nat;
  };

  module PharmaceuticalProduct {
    public func compare(p1 : PharmaceuticalProduct, p2 : PharmaceuticalProduct) : Order.Order {
      Text.compare(p1.name, p2.name);
    };
  };

  // Order types
  type OrderItem = {
    productName : Text;
    price : Float;
    quantity : Nat;
  };

  type ShippingAddress = {
    firstName : Text;
    lastName : Text;
    phone : Text;
    country : Text;
    streetAddress : Text;
    apartment : Text;
    city : Text;
    state : Text;
    zipCode : Text;
  };

  type Order = {
    orderId : Text;
    customerId : Principal;
    customerUsername : Text;
    email : Text;
    shippingAddress : ShippingAddress;
    items : [OrderItem];
    subtotal : Float;
    shipping : Float;
    total : Float;
    status : Text;
    createdAt : Time.Time;
  };

  let ADMIN_PASSWORD : Text = "Alex@thomas2026";

  stable var accessControlState = AccessControl.initState();

  stable var userProfiles = Map.empty<Principal, UserProfile>();
  stable var products = Map.empty<Text, PharmaceuticalProduct>();
  stable var orders = Map.empty<Text, Order>();

  include MixinAuthorization(accessControlState);

  // User profile management
  public shared ({ caller }) func registerUser(username : Text) : async () {
    if (caller.isAnonymous()) {
      Runtime.trap("Must be logged in to register");
    };
    if (userProfiles.containsKey(caller)) {
      Runtime.trap("User already registered");
    };
    let profile : UserProfile = {
      username;
      registrationDate = Time.now();
    };
    userProfiles.add(caller, profile);
  };

  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (caller.isAnonymous()) {
      return null;
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (caller.isAnonymous()) {
      Runtime.trap("Must be logged in to save profile");
    };
    if (not userProfiles.containsKey(caller)) {
      Runtime.trap("User not registered");
    };
    userProfiles.add(caller, profile);
  };

  public query func getAllUsers(adminPassword : Text) : async [(Principal, UserProfile)] {
    if (not Text.equal(adminPassword, ADMIN_PASSWORD)) {
      Runtime.trap("Unauthorized: Invalid admin password");
    };
    userProfiles.toArray();
  };

  // Product catalog management
  public shared ({ caller }) func addProduct(name : Text, brand : Text, dosage : Text, priceEuros : Float, priceUk : Float, packaging : Text, units : Nat) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can add products");
    };
    if (products.containsKey(name)) {
      Runtime.trap("Product already exists");
    };
    let product : PharmaceuticalProduct = {
      name;
      brand;
      dosage;
      priceEurope = priceEuros;
      priceUk = priceUk;
      packaging;
      units;
    };
    products.add(product.name, product);
  };

  public query ({ caller }) func getProduct(name : Text) : async PharmaceuticalProduct {
    switch (products.get(name)) {
      case (null) { Runtime.trap("Product does not exist") };
      case (?product) { product };
    };
  };

  public query ({ caller }) func getAllProducts() : async [PharmaceuticalProduct] {
    products.values().toArray().sort();
  };

  public query ({ caller }) func getProductsByBrand(brand : Text) : async [PharmaceuticalProduct] {
    let filteredProducts = products.values().filter(
      func(product) {
        Text.equal(product.brand, brand);
      }
    );
    filteredProducts.toArray();
  };

  // Order management

  // Place order function
  public shared ({ caller }) func placeOrder(email : Text, shippingAddress : ShippingAddress, items : [OrderItem], subtotal : Float, shipping : Float, total : Float) : async Text {
    if (caller.isAnonymous()) {
      Runtime.trap("Must be logged in to place order");
    };

    let user = switch (userProfiles.get(caller)) {
      case (null) { Runtime.trap("User not registered") };
      case (?u) { u };
    };

    let orderId = Time.now().toText();

    let order : Order = {
      orderId;
      customerId = caller;
      customerUsername = user.username;
      email;
      shippingAddress;
      items;
      subtotal;
      shipping;
      total;
      status = "pending";
      createdAt = Time.now();
    };

    orders.add(orderId, order);

    order.orderId;
  };

  // Admin can view all orders using password
  public query func getAllOrders(adminPassword : Text) : async [Order] {
    if (not Text.equal(adminPassword, ADMIN_PASSWORD)) {
      Runtime.trap("Unauthorized: Invalid admin password");
    };
    orders.values().toArray();
  };

  // User can view their own orders - only requires being logged in and registered
  public query ({ caller }) func getMyOrders() : async [Order] {
    if (caller.isAnonymous()) {
      Runtime.trap("Must be logged in to view orders");
    };
    if (not userProfiles.containsKey(caller)) {
      Runtime.trap("User not registered");
    };

    let filteredOrders = List.empty<Order>();

    for (order in orders.values()) {
      if (order.customerId == caller) {
        filteredOrders.add(order);
      };
    };

    filteredOrders.toArray();
  };
};
