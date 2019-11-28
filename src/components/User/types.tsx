export interface Tournament {
  node: {
    tournaments: {
      edges: {
        node: {
          id: string;
          name: string;
          category: {
            name: string;
          };
        };
      };
    };
    id: string;
    name: string;
    category: {
      name: string;
    };
  };
}
