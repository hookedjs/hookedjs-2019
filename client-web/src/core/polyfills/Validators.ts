export const DigitsRe = new RegExp(`^[0-9]+$`);

export const AlphabeticRe = new RegExp(`^[a-zA-Z]+$`);

export const AlphaNumericRe = new RegExp(`^[a-zA-Z0-9]+$`);

export const EmailAddressRe = new RegExp(
  `^(([^<>()[\\]\\\\.,;:\\s@"]+(\\.[^<>()[\\]\\\\.,;:\\s@"]+)*)|(".+"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$`
);

export const USPhoneNumbersRe = new RegExp(`^(\\([0-9]{3}\\) |[0-9]{3}-)[0-9]{3}-[0-9]{4}$`);

export const UsZipcodeRe = new RegExp(`^[0-9]{5}(?:-[0-9]{4})?$`);

export const SlugRe = new RegExp(`^[a-z0-9-]+$`);

// export const UrlRe = new RegExp(`((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)`);

export const IpAddressRe = new RegExp(`^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?).){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$`);

export const HtmlTagRe = new RegExp(`^<([a-z]+)([^<]+)*(?:>(.*)</1>|s+/>)$`);

// The password must export contain one lowercase letter, one uppercase letter, one number, one unique character such as !@#$%^&? and be at least 8 characters long.
export const PasswordRe = new RegExp(`^.*(?=.{8,})(?=.*d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*? ]).*$`);
