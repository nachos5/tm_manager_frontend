export interface Tournament {
  node: {
    id: string;
    idInt: number;
    name: string;
    category: {
      id: string;
      name: string;
    }
    registeredUsers: {
      totalCount: number;
    }
    slots: number;
    status: string;
    statusDisplay: string;
    private: boolean;
    creator: {
      id: string;
      username: string;
    }
    code: string;
  }
}