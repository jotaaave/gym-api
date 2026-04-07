class UserAlreadyExists extends Error {
  constructor() {
    super("User already exists");
  }
}

export default UserAlreadyExists;
