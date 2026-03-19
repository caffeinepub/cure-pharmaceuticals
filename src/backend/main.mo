import Iter "mo:core/Iter";
import Text "mo:core/Text";
import Order "mo:core/Order";
import Array "mo:core/Array";
import Map "mo:core/Map";
import Runtime "mo:core/Runtime";

actor {
  type PricingRegion = { #europe : Float; #uk : Float };

  type PharmaceuticalProduct = {
    name : Text;
    brand : Text;
    dosage : Text;
    price : PricingRegion;
    packaging : Text;
    units : Nat;
  };

  module PharmaceuticalProduct {
    public func compare(p1 : PharmaceuticalProduct, p2 : PharmaceuticalProduct) : Order.Order {
      Text.compare(p1.name, p2.name);
    };
  };

  let products = Map.empty<Text, PharmaceuticalProduct>();

  public shared ({ caller }) func addProduct(name : Text, brand : Text, dosage : Text, priceEuros : Float, priceUk : Float, packaging : Text, units : Nat) : async () {
    if (products.containsKey(name)) {
      Runtime.trap("Product already exists");
    };
    let product : PharmaceuticalProduct = {
      name;
      brand;
      dosage;
      price = #europe priceEuros;
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
};
