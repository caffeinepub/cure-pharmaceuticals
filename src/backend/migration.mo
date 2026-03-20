import Map "mo:core/Map";
import Principal "mo:core/Principal";
import Text "mo:core/Text";

module {
  type OldProduct = {
    name : Text;
    brand : Text;
    dosage : Text;
    price : { #europe : Float; #uk : Float };
    packaging : Text;
    units : Nat;
  };

  type NewProduct = {
    name : Text;
    brand : Text;
    dosage : Text;
    priceEurope : Float;
    priceUk : Float;
    packaging : Text;
    units : Nat;
  };

  type OldActor = {
    products : Map.Map<Text, OldProduct>;
  };

  type NewActor = {
    products : Map.Map<Text, NewProduct>;
    userProfiles : Map.Map<Principal, { username : Text; registrationDate : Int }>;
  };

  public func run(old : OldActor) : NewActor {
    let newProducts = old.products.map<Text, OldProduct, NewProduct>(
      func(_key, oldProduct) {
        let (euroPrice, ukPrice) = switch (oldProduct.price) {
          case (#europe(p)) { (p, p) };
          case (#uk(p)) { (p, p) };
        };
        {
          oldProduct with
          priceEurope = euroPrice;
          priceUk = ukPrice;
        };
      }
    );

    {
      products = newProducts;
      userProfiles = Map.empty<Principal, { username : Text; registrationDate : Int }>();
    };
  };
};
