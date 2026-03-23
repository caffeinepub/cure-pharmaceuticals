import Time "mo:core/Time";
import Text "mo:core/Text";
import Float "mo:core/Float";
import Order "mo:core/Order";
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
    strength : Text;
    manufacturedBy : Text;
    form : Text;
    packSize : Text;
    imageUrls : [Text];
  };

  module PharmaceuticalProduct {
    public func compare(p1 : PharmaceuticalProduct, p2 : PharmaceuticalProduct) : Order.Order {
      Text.compare(p1.name # p1.dosage, p2.name # p2.dosage);
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

  var accessControlState = AccessControl.initState();

  var userProfiles = Map.empty<Principal, UserProfile>();
  var products = Map.empty<Text, PharmaceuticalProduct>();
  var orders = Map.empty<Text, Order>();

  include MixinAuthorization(accessControlState);

  // ── helpers ──────────────────────────────────────────────
  func putProduct(key : Text, p : PharmaceuticalProduct) {
    products.remove(key);
    products.add(key, p);
  };

  func putOrder(key : Text, o : Order) {
    orders.remove(key);
    orders.add(key, o);
  };

  func productKey(p : PharmaceuticalProduct) : Text {
    p.name # "||" # p.dosage;
  };

  func filterImageUrls(urls : [Text]) : [Text] {
    urls.vals().filter(func(url : Text) : Bool { url != "" }).toArray();
  };

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
    userProfiles.remove(caller);
    userProfiles.add(caller, profile);
  };

  public query func getAllUsers(adminPassword : Text) : async [(Principal, UserProfile)] {
    if (not Text.equal(adminPassword, ADMIN_PASSWORD)) {
      Runtime.trap("Unauthorized: Invalid admin password");
    };
    userProfiles.toArray();
  };

  // Product catalog management
  public shared func addProduct(adminPassword : Text, product : PharmaceuticalProduct) : async () {
    if (not Text.equal(adminPassword, ADMIN_PASSWORD)) {
      Runtime.trap("Unauthorized: Invalid admin password");
    };

    let newProduct : PharmaceuticalProduct = {
      product with
      imageUrls = filterImageUrls(product.imageUrls);
    };

    putProduct(productKey(newProduct), newProduct);
  };

  public shared func updateProduct(adminPassword : Text, key : Text, updatedProduct : PharmaceuticalProduct) : async () {
    if (not Text.equal(adminPassword, ADMIN_PASSWORD)) {
      Runtime.trap("Unauthorized: Invalid admin password");
    };

    let productToUpdate : PharmaceuticalProduct = {
      updatedProduct with
      imageUrls = filterImageUrls(updatedProduct.imageUrls);
    };

    products.remove(key);
    putProduct(productKey(productToUpdate), productToUpdate);
  };

  public query func getProduct(key : Text) : async PharmaceuticalProduct {
    switch (products.get(key)) {
      case (null) { Runtime.trap("Product does not exist") };
      case (?product) { product };
    };
  };

  public shared func deleteProduct(adminPassword : Text, key : Text) : async () {
    if (not Text.equal(adminPassword, ADMIN_PASSWORD)) {
      Runtime.trap("Unauthorized: Invalid admin password");
    };
    products.remove(key);
  };

  public query func getAllProducts() : async [PharmaceuticalProduct] {
    let arr = products.values().toArray();
    arr.sort();
  };

  public query func getProductsByBrand(brand : Text) : async [PharmaceuticalProduct] {
    products.values().filter(func(p : PharmaceuticalProduct) : Bool {
      Text.equal(p.brand, brand);
    }).toArray();
  };

  // Order management
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

    putOrder(orderId, order);

    order.orderId;
  };

  public query func getAllOrders(adminPassword : Text) : async [Order] {
    if (not Text.equal(adminPassword, ADMIN_PASSWORD)) {
      Runtime.trap("Unauthorized: Invalid admin password");
    };
    orders.values().toArray();
  };

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
