import Iter "mo:core/Iter";
import Time "mo:core/Time";
import Text "mo:core/Text";
import Order "mo:core/Order";
import Array "mo:core/Array";
import Map "mo:core/Map";
import Runtime "mo:core/Runtime";
import Principal "mo:core/Principal";
import Migration "migration";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";

// Specify the data migration function in with-clause
(with migration = Migration.run)
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

  let accessControlState = AccessControl.initState();

  let userProfiles = Map.empty<Principal, UserProfile>();

  let products = Map.empty<Text, PharmaceuticalProduct>();

  include MixinAuthorization(accessControlState);

  // User profile management
  public shared ({ caller }) func registerUser(username : Text) : async () {
    if (userProfiles.containsKey(caller)) {
      Runtime.trap("User already exists");
    } else {
      let profile : UserProfile = {
        username;
        registrationDate = Time.now();
      };
      userProfiles.add(caller, profile);
      // Assign user role after successful registration
      AccessControl.assignRole(accessControlState, caller, caller, #user);
    };
  };

  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view profiles");
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
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  public query ({ caller }) func getAllUsers() : async [(Principal, UserProfile)] {
    // Admin-only access - check for admin role.
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can view all users");
    };
    userProfiles.toArray();
  };

  // Product catalog management
  public shared ({ caller }) func addProduct(name : Text, brand : Text, dosage : Text, priceEuros : Float, priceUk : Float, packaging : Text, units : Nat) : async () {
    // Admin-only: Only admins can add products to the catalog
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
    // Public catalog - no authorization needed
    switch (products.get(name)) {
      case (null) { Runtime.trap("Product does not exist") };
      case (?product) { product };
    };
  };

  public query ({ caller }) func getAllProducts() : async [PharmaceuticalProduct] {
    // Public catalog - no authorization needed
    products.values().toArray().sort();
  };

  public query ({ caller }) func getProductsByBrand(brand : Text) : async [PharmaceuticalProduct] {
    // Public catalog - no authorization needed
    let filteredProducts = products.values().filter(
      func(product) {
        Text.equal(product.brand, brand);
      }
    );
    filteredProducts.toArray();
  };
};
