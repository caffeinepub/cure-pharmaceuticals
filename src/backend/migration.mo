import Map "mo:core/Map";
import Time "mo:core/Time";
import Nat "mo:core/Nat";
import Text "mo:core/Text";
import Float "mo:core/Float";
import Principal "mo:core/Principal";

module {
  type UserProfile = {
    username : Text;
    registrationDate : Time.Time;
  };

  type OldPharmaceuticalProduct = {
    name : Text;
    brand : Text;
    dosage : Text;
    priceEurope : Float;
    priceUk : Float;
    packaging : Text;
    units : Nat;
  };

  type NewPharmaceuticalProduct = {
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

  type OldActor = {
    userProfiles : Map.Map<Principal, UserProfile>;
    products : Map.Map<Text, OldPharmaceuticalProduct>;
    orders : Map.Map<Text, Order>;
  };

  type NewActor = {
    userProfiles : Map.Map<Principal, UserProfile>;
    products : Map.Map<Text, NewPharmaceuticalProduct>;
    orders : Map.Map<Text, Order>;
  };

  public func run(old : OldActor) : NewActor {
    let migratedProducts = old.products.map<Text, OldPharmaceuticalProduct, NewPharmaceuticalProduct>(
      func(_name, oldProduct) {
        {
          name = oldProduct.name;
          brand = oldProduct.brand;
          dosage = oldProduct.dosage;
          priceEurope = oldProduct.priceEurope;
          priceUk = oldProduct.priceUk;
          packaging = oldProduct.packaging;
          units = oldProduct.units;
          strength = "";
          manufacturedBy = "";
          form = "";
          packSize = "";
          imageUrls = [];
        };
      }
    );
    {
      userProfiles = old.userProfiles;
      products = migratedProducts;
      orders = old.orders;
    };
  };
};
