function isValidWebsite(website) {
  const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;
  return urlRegex.test(website);
}

const isValidEmail = (email) => {
  const emailRegex = /^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
  return emailRegex.test(email.trim());
};

const isPhoneNumber = (input) => {
  const phoneRegex = /^(\+\d{1,2}\s?)?(\d{10,15})$/;
  return phoneRegex.test(input);
};

export const loginValiDate = (formData, setFormError, formError) => {
  let valid = true;
  let email_err = "";
  let password_err = "";
  let common_err = "";

  if (
    !isValidEmail(formData.identifier) &&
    !isPhoneNumber(formData.identifier)
  ) {
    email_err = "Please enter a valid email or phone number address";
    valid = false;
  }

  if (formData.password?.trim() == "" || formData.password.length < 5) {
    password_err = "password must be longer than or equal to 5 characters";
    valid = false;
  } else {
    const capitalRegex = /[A-Z]/;
    if (!capitalRegex.test(formData.password)) {
      password_err = "Password must contain at least one capital letter";
      valid = false;
    }
  }

  setFormError({
    ...formError,
    email_err,
    password_err,
    common_err,
  });
  return valid;
};

export const registerValiDate = (formData, setFormError, formError) => {
  let valid = true;
  let first_name_err = "";
  let email_err = "";
  let mobile_number_err = "";
  let password_err = "";
  let common_err = "";

  if (!formData.first_name || formData.first_name.trim() == "") {
    first_name_err = "Please enter your name ";
    valid = false;
  }

  if (!isValidEmail(formData.email)) {
    email_err = "Please enter a valid email address";
    valid = false;
  }

  if (formData.mobile_number?.trim() == "") {
    mobile_number_err = "Please enter your phone number";
    valid = false;
  } else if (!isPhoneNumber(formData?.mobile_number)) {
    mobile_number_err = "Phone should have 10 digits";
    valid = false;
  }

  if (formData.password?.trim() == "" || formData.password.length < 6) {
    password_err = "password must be longer than or equal to 6 characters ";
    valid = false;
  } else {
    const capitalRegex = /[A-Z]/;
    if (!capitalRegex.test(formData.password)) {
      password_err = "Password must contain at least one capital letter";
      valid = false;
    }
  }
  setFormError({
    ...formError,
    first_name_err,
    email_err,
    mobile_number_err,
    password_err,
    common_err,
  });
  return valid;
};

export const serviceValiDate = (formData, setFormError, formError) => {
  let name_err = "";
  let email_err = "";
  let description_err = "";
  let location_err = "";
  let consulting_time_err = "";
  let service_areas_err = "";
  let booking_available_err = "";
  let contact_number_err = "";
  let website_err = "";

  let valid = true;

  if (
    formData.website &&
    formData.website.trim().length > 0 &&
    !isValidWebsite(formData.website)
  ) {
    website_err = " Please enter a valid website link ";
    valid = false;
  }

 

  if (!formData.name || formData.name.trim() == "") {
    name_err = "Please enter your name ";
    valid = false;
  }

  if (!isValidEmail(formData.email)) {
    email_err = "Please enter a valid email address";
    valid = false;
  }

  if (!formData.description || formData.description.trim() == "") {
    description_err = "Please enter your description ";
    valid = false;
  }

  if (!formData.location || formData.location.trim() == "") {
    location_err = "Please enter your location ";
    valid = false;
  }

  if (!formData.time_slot_1 || formData.time_slot_1.trim() == "") {
    consulting_time_err = "Please enter your consulting time ";
    valid = false;
  }

  if (formData.mobile?.trim() == "") {
    contact_number_err = "Please enter your phone number";
    valid = false;
  } else if (!isPhoneNumber(formData?.mobile)) {
    contact_number_err = "Phone should have 10 digits";
    valid = false;
  }

  setFormError({
    ...formError,
    name_err,
    website_err,
    email_err,
    description_err,
    location_err,
    consulting_time_err,
    service_areas_err,
    booking_available_err,
    contact_number_err,
    common_err: "",
  });
  return valid;
};
export const socialmediaValiDate = (formData, setFormError, formError) => {
  let valid = true;
  let facebook_link_err = "";
  let instagram_link_err = "";
  let whatsapp_number_err = "";
  let youtube_link_err = "";

  if (
    formData?.whatsapp_number.trim().length > 0 &&
    !isPhoneNumber(formData?.whatsapp_number)
  ) {
    whatsapp_number_err = "Phone should have 10 digits";
    valid = false;
  }
  if (
    formData?.youtube_link &&
    formData?.youtube_link.trim().length > 0 &&
    !isValidWebsite(formData?.youtube_link)
  ) {
    youtube_link_err = " Please enter a valid youtube link ";
    valid = false;
  }
  if (
    formData?.facebook_link &&
    formData?.facebook_link.trim().length > 0 &&
    !isValidWebsite(formData?.facebook_link)
  ) {
    facebook_link_err = " Please enter a valid facebook link ";
    valid = false;
  }
  if (
    formData?.instagram_link &&
    formData?.instagram_link.trim().length > 0 &&
    !isValidWebsite(formData?.instagram_link)
  ) {
    instagram_link_err = " Please enter a valid instagram link ";
    valid = false;
  }

  setFormError({
    ...formError,
    facebook_link_err,
    instagram_link_err,
    whatsapp_number_err,
    youtube_link_err,
    common_err: "",
  });
  return valid;
};

export const templeValiDate = (formData, setFormError, formError) => {
  let valid = true;
  let name_err = "";
  let town_err = "";
  let deity_err = "";
  let mobile_err = "";
  let telephone_err = "";
  let image_err = "";
  let description_err = "";
  let website_err = "";
  let location_err = "";
  let email_err = "";

  if (!formData.name || formData.name.trim() == "") {
    name_err = "Please enter your name ";
    valid = false;
  }

  if (
    formData.email &&
    formData.email.trim().length > 0 &&
    !isValidEmail(formData.email)
  ) {
    email_err = " Please enter a valid email ";
    valid = false;
  }
  if (
    formData.website &&
    formData.website.trim().length > 0 &&
    !isValidWebsite(formData.website)
  ) {
    website_err = " Please enter a valid website link ";
    valid = false;
  }
  if (!formData.location || formData.location.trim() == "") {
    location_err = "Please enter your location ";
    valid = false;
  }

  if (!formData.location || formData.location.trim() == "") {
    location_err = "Please enter your location ";
    valid = false;
  }
  if (!formData.town || formData.town.trim() == "") {
    town_err = "Please enter your town ";
    valid = false;
  }

  if (!formData.deity || formData.deity === "") {
    deity_err = "Please enter your main deity ";
    valid = false;
  }

  if (formData.telephone?.trim() == "") {
    telephone_err = "Please enter your telephone number";
    valid = false;
  }

  if (formData.mobile?.trim() == "") {
    mobile_err = "Please enter your mobile number";
    valid = false;
  } else if (!isPhoneNumber(formData?.mobile)) {
    mobile_err = "mobile should have 10 digits";
    valid = false;
  }
  if (!formData.description || formData.description.trim() == "") {
    description_err = "Please enter your description ";
    valid = false;
  }
  setFormError({
    ...formError,
    name_err,
    website_err,
    email_err,
    town_err,
    deity_err,
    mobile_err,
    telephone_err,
    image_err,
    description_err,
    location_err,
    common_err: "",
  });
  return valid;
};

export const withdrawForm = (
  formData,
  setFormError,
  formError,
  paymentMethod
) => {
  let name_err = "";
  let money_err = "";
  let account_number_err = "";
  let ifsc_code_err = "";
  let upi_code_err = "";
  let valid = true;

  if (!formData.name || formData.name.trim() == "") {
    name_err = "Please enter your name ";
    valid = false;
  }

  if (!formData.money || formData.money === 0) {
    money_err = "Please enter your withdraw money ";
    valid = false;
  }

  if (paymentMethod === "Upi" && formData.upi_code.trim() == "") {
    upi_code_err = "Please enter your upi code ";
    valid = false;
  }

  if (paymentMethod === "Bank" && formData.account_number.trim() === "") {
    account_number_err = "Please enter your account number ";
    valid = false;
  }

  if (paymentMethod === "Bank" && formData.ifsc_code.trim() == "") {
    ifsc_code_err = "Please enter your ifsc code ";
    valid = false;
  }

  setFormError({
    ...formError,
    name_err,
    paymentMethod_err: "",
    money_err,
    account_number_err,
    ifsc_code_err,
    upi_code_err,
    common_err: "",
  });
  return valid;
};

export const poojaForm = (formData, setFormError, formError) => {
  let valid = true;
  let name_err = "";
  let description_err = "";

  if (!formData.name || formData.name.trim() == "") {
    name_err = "Please enter your name ";
    valid = false;
  }

  if (!formData.description || formData.description.trim() == "") {
    description_err = "Please enter your description ";
    valid = false;
  }

  setFormError({
    ...formError,
    name_err,
    description_err,
    common_err: "",
  });
  return valid;
};

export const resetPasswordForm = (formData, setFormError, formError) => {
  let old_password_err = "";
  let new_password_err = "";
  let valid = true;
  const capitalRegex = /[A-Z]/;

  if (formData.new_password?.trim() == "" || formData.new_password.length < 5) {
    new_password_err ="reset password must be longer than or equal to 5 characters";
    valid = false;
  }else {
    if (!capitalRegex.test(formData.new_password)) {
      old_password_err = "Password must contain at least one capital letter";
      valid = false;
    }
  }

  if (formData.old_password?.trim() == "" || formData.old_password.length < 5) {
    old_password_err = "password must be longer than or equal to 5 characters";
    valid = false;
  } else if (!capitalRegex.test(formData.old_password)) {
      old_password_err = "Password must contain at least one capital letter";
      valid = false;
  }
  
  setFormError({
    ...formError,
    new_password_err,
    old_password_err,
    common_err: "",
  });
  return valid;
};
