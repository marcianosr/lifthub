const Query = {
  pokemon(parent, args, ctx, info) {
    //   database calls
    return [
      {
        name: "Charizard",
        types: ["Fire/Flying"],
        level: 36
      },
      {
        name: "Blastoise",
        types: ["Water"],
        level: 36
      }
    ];
  }
};

module.exports = Query;
