export const RegexConstant = {
  PasswordFormat:
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*()_+\-=\\\[\]{};':",.<>\/\?]).{8,}$/,
  IdentifierFormat: /^[a-zA-Z0-9]+([._]?[a-zA-Z0-9]+)*$/,
  PhoneNumberFormat: /(84|0[3|5|7|8|9])+([0-9]{8})\b/g,
};
