const sendForm = () => {
  const subject = document.getElementById("textInput").value;
  const email = document.getElementById("emailInput").value;
  const message = document.getElementById("textareaInput").value;
  const validation = validateInputs(subject, email, message);

  if (validation.correct) {
    sendEmail(subject, email, message);
  } else {
    createErrorMessage(validation);
  }
};

const sendEmail = (subject, email, message) => {
  const serviceID = "service_yvj3upd";
  const templateID = "template_dc9ldhe";
  const templateParams = {
    subject: subject,
    from_email: email,
    reply_to: email,
    message: message,
  };

  emailjs.send(serviceID, templateID, templateParams).then(
    (response) => {
      Swal.fire("Listo!", "Tu correo ha sido enviado", "success");
    },
    (error) => {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Hubo un error al mandar el email",
        footer:
          '<a href="https://wa.me/5493416686105" target="_blank">¿Probaste hablarme por WhatsApp?</a>',
      });
    }
  );
};

const validateInputs = (subject, email, message) => {
  let validation = {
    correct: true,
  };
  const regularExpression =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (subject == "") {
    validation.correct = false;
    validation.subject = "(El asunto no puede estar vacío)";
  }
  if (!regularExpression.test(email)) {
    validation.correct = false;
    validation.email = "(El email es incorrecto)";
  }
  if (message == "") {
    validation.correct = false;
    validation.message = "(El mensaje no puede estar vacío)";
  }

  return validation;
};

const createErrorMessage = (validation) => {
  let errorMessages = {};
  let errorStrings = "";

  if (validation.subject) {
    errorMessages.subject = validation.subject;
  }
  if (validation.email) {
    errorMessages.email = validation.email;
  }
  if (validation.message) {
    errorMessages.message = validation.message;
  }

  for (let key in errorMessages) {
    errorStrings = errorStrings.concat(" ", errorMessages[key]);
  }

  Swal.fire({
    icon: "error",
    title: "Error",
    text: `${errorStrings}`,
    footer:
      '<a href="https://wa.me/5493416686105" target="_blank">¿Probaste hablarme por WhatsApp?</a>',
  });
};

const sendButton = document.getElementById("send-form");
sendButton.addEventListener("click", sendForm);
