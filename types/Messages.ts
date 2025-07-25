export default interface Messages {
  error: {
    firebase: string;
    update: string;
    something: string;
    login: string;
  };
  success: {
    add: string;
    update: string;
    delete: string;
    received: string;
    paid: string;
  };
  loading: {
    add: string;
    update: string;
    delete: string;
  };
  form: {
    fillAll: string;
    valid: string;
    paymentDay: string;
    payDay: string;
    budget: string;
    from: string;
    to: string;
    amount: string;
    date: string;
    type: string;
    select: string;
    selectBoth: string;
    bank2bank: string;
    bank2bankInfo: string;
    sameBank: string;
    invalidBank: string;
  };
  button: {
    confirmation: string;
    cancel: string;
    delete: string;
    close: string;
    edit: string;
    details: string;
    save: string;
    add: string;
    receive: string;
    pay: string;
  };
  other: {
    noCategory: string;
    transaction: string;
    transactions: string;
    bill: string;
    bills: string;
    income: string;
    expense: string;
    expenses: string;
    category: string;
    categories: string;
    bank: string;
    banks: string;
    home: string;
    reports: string;
    profile: string;
    and: string;
    manage: string;
    color: string;
    spent: string;
    left: string;
    hello: string;
    totalBalance: string;
    upcoming: string;
    last: string;
    all: string;
    about: string;
    logout: string;
    madeBy: string;
    signin: string;
    google: string;
    learnMore: string;
    chooseA: string;
    language: string;
    paid: string;
    yes: string;
    no: string;
    atLeastCategory: string;
    atLeastBank: string;
  };
}