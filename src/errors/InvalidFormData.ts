export default class InvalidFormData extends Error {
  constructor() {
    super('Invalid form data');
    this.name = 'InvalidFormData';
  }
}
