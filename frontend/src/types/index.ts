export type IContextType = {
  user: IUser;
  isLoadingUser: boolean;
  isAuthenticated: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
};

export type INavLink = {
  imgURL: string;
  route: string;
  label: string;
};

export type IUpdateUser = {
  userId: string;
  name: string;
  bio: string;
  imageId: string;
  imageUrl: URL | string;
  file?: File[];
};

export type INewPost = {
  caption: string;
  file: File;
  location?: string;
  tags?: string;
};

export type IPostUser = {
  name: string;
  username: string;
  imageUrl: string;
  _id: string;
};

export type IPost = {
  _id: string;
  caption: string;
  imageUrl: string;
  location?: string;
  tags: string[] | [];
  createdAt: string;
  user: IPostUser;
};

export type IUpdatePost = {
  postId: string;
  caption: string;
  imageId: string;
  imageUrl: URL;
  file: File[];
  location?: string;
  tags?: string;
};

export type IUser = {
  _id: string;
  name: string;
  username: string;
  email: string;
  imageUrl: string;
  bio: string;
  savedPosts: [];
};

export type INewUser = {
  name: string;
  email: string;
  username: string;
  password: string;
};
