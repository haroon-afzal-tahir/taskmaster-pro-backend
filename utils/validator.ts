export class Validators {
  public static validateEmail(email: string): boolean {
    const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return regex.test(email);
  }

  public static validateUsername(username: string): boolean {
    // Username should be at least 3 characters long
    const regex = /^[a-zA-Z0-9]{3,}$/;
    return regex.test(username);
  }
}
