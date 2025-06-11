// This is a generated Motoko binding.
// Please use `import service "ic:canister_id"` instead to call canisters on the IC if possible.

module {
  public type CanisterInitArgs = { env : EnvType };
  public type ChartStatsData = { month : Nat; count : Nat };
  public type Commodity = {
    id : Text;
    ticker : Text;
    commodityPic : Text;
    timeStamp : Time;
    name : Text;
    createdBy : Text;
    acCategoryId : Text;
    isDelete : Bool;
  };
  public type CommodityRequest = {
    ticker : Text;
    commodityPic : Text;
    name : Text;
    acCategoryId : Text;
  };
  public type EnvType = { #staging; #production; #local };
  public type GetPagesArgs = { page : Nat; size : Nat };
  public type MarketLocation = {
    id : Text;
    timeStamp : Time;
    name : Text;
    createdBy : Text;
    countryId : Text;
    isDelete : Bool;
  };
  public type MarketLocationAgent = {
    id : Text;
    timeStamp : Time;
    userId : Text;
    createdBy : Text;
    isDelete : Bool;
    marketLocationId : Text;
  };
  public type MarketLocationAgentRequest = {
    userId : Text;
    marketLocationId : Text;
  };
  public type MarketLocationCommodity = {
    id : Text;
    commodityId : Text;
    timeStamp : Time;
    createdBy : Text;
    isDelete : Bool;
    marketLocationId : Text;
  };
  public type MarketLocationCommodityRequest = {
    commodityId : Text;
    marketLocationId : Text;
  };
  public type MarketLocationRequest = { name : Text; countryId : Text };
  public type MarketPrice = {
    id : Text;
    status : { pending : Bool; rejected : Bool; accepted : Bool };
    marketLocationCommodityId : Text;
    timeStamp : Time;
    userId : Text;
    createdBy : Text;
    pricePerKg : Float;
    unitKg : Int;
    isPaid : Bool;
    currency : Text;
    isDelete : Bool;
    price : Float;
    marketLocationId : Text;
  };
  public type MarketPriceId = Text;
  public type MarketPriceRequest = {
    status : { pending : Bool; rejected : Bool; accepted : Bool };
    marketLocationCommodityId : Text;
    userId : Text;
    pricePerKg : Float;
    unitKg : Int;
    currency : Text;
    price : Float;
    marketLocationId : Text;
  };
  public type Result = { #ok : MarketLocation; #err : Text };
  public type Result_1 = { #ok : MarketLocationCommodity; #err : Text };
  public type Result_2 = { #ok : MarketPrice; #err : Text };
  public type Result_3 = { #ok : MarketLocationAgent; #err : Text };
  public type Result_4 = { #ok : Commodity; #err : Text };
  public type Stats = {
    total_market_location_commodities : Nat;
    total_market_locations : Nat;
    total_market_location_agents : Nat;
    total_market_prices : Nat;
    total_commodities : Nat;
  };
  public type Time = Int;
  public let commodityCanActor : Self = actor ("zpxxj-jyaaa-aaaag-alelq-cai");
  
  public type Self = actor {
    AgetAllMarketPricesPaginated : shared query GetPagesArgs -> async [(MarketPriceId, MarketPrice)];
    addCommodity : shared CommodityRequest -> async ();
    addMarketLocation : shared MarketLocationRequest -> async ();
    addMarketLocationAgent : shared MarketLocationAgentRequest -> async ();
    addMarketLocationCommodity : shared MarketLocationCommodityRequest -> async ();
    addMarketPrice : shared MarketPriceRequest -> async ();
    deleteCommodity : shared Commodity -> async ();
    deleteMarketLocation : shared MarketLocation -> async ();
    deleteMarketLocationAgent : shared MarketLocationAgent -> async ();
    deleteMarketLocationCommodity : shared MarketLocationCommodity -> async ();
    deleteMarketPrice : shared MarketPrice -> async ();
    getAllLatestCommodities : shared query () -> async [Commodity];
    getAllLatestMarketCommoditiesByMarketId : shared query Text -> async [
      MarketLocationCommodity
    ];
    getAllLatestMarketLocationAgents : shared query () -> async [
      MarketLocationAgent
    ];
    getAllLatestMarketLocationCommodities : shared query () -> async [
      MarketLocationCommodity
    ];
    getAllLatestMarketLocationsByCommodityName : shared query Text -> async [
      MarketLocationCommodity
    ];
    getAllLatestMarketPrices : shared query () -> async [MarketPrice];
    getAllMarketLocationAgentsByMarketId : shared query Text -> async [
      MarketLocationAgent
    ];
    getAllMarketLocationsLatest : shared query () -> async [MarketLocation];
    getCommodityByCategory : shared query Text -> async [Commodity];
    getCommodityLatest : shared query Text -> async Result_4;
    getCommodityStats : shared query () -> async Stats;
    getLatestMarketLocationAgentbyId : shared query Text -> async Result_3;
    getLatestMarketPriceById : shared query Text -> async Result_2;
    getLatestMarketPriceByMarketLocationId : shared query Text -> async [
      MarketPrice
    ];
    getLatestPriceByMarketLocationId : shared query Text -> async [MarketPrice];
    getMarketLocationAgentByAgentId : shared query Text -> async [
      MarketLocationAgent
    ];
    getMarketLocationByAgentId : shared Text -> async [MarketLocationAgent];
    getMarketLocationByCountryId : shared query Text -> async [MarketLocation];
    getMarketLocationCommodityByCommodityId : shared query Text -> async [
      MarketLocationCommodity
    ];
    getMarketLocationCommodityById : shared query Text -> async Result_1;
    getMarketLocationLatest : shared query Text -> async Result;
    getMarketPriceByMarketCommodityId : shared query Text -> async [
      MarketPrice
    ];
    getMarketStats : shared query () -> async [ChartStatsData];
    get_total_market_locations : shared query () -> async Nat;
    get_total_market_prices : shared query () -> async Nat;
    updateCommodity : shared Commodity -> async ();
    updateMarkeLocation : shared MarketLocation -> async ();
    updateMarketLocationAgent : shared MarketLocationAgent -> async ();
    updateMarketLocationCommodity : shared MarketLocationCommodity -> async ();
    updateMarketPrice : shared MarketPrice -> async ();
  };
};
