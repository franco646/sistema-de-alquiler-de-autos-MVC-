const deleteButtons = document.querySelectorAll('.delete-button');
const modal = document.querySelector('#modal');

function createButton({ className, textContent, type }) {
  const button = document.createElement('button');
  button.className = className;
  button.textContent = textContent;
  button.type = type;
  button.style = 'margin: 5px;';
  return button;
}

function confirmModal(form) {
  form.submit();
}

function cancelModal() {
  modal.classList.remove('is-active');
}

function configureButtons(activeRentals, form, callbackConfirm, callbackCancel) {
  if (activeRentals === 0) {
    const confirmButton = createButton({ className: 'button is-primary', textContent: 'Confirmar' });
    const cancelButton = createButton({ className: 'button is-danger', textContent: 'Cancelar' });
    confirmButton.addEventListener('click', () => callbackConfirm(form));
    cancelButton.addEventListener('click', callbackCancel);
    return [confirmButton, cancelButton];
  }
  const confirmButton = createButton({ className: 'button is-primary', textContent: 'Aceptar' });
  confirmButton.addEventListener('click', callbackCancel);
  return [confirmButton];
}

function configureMessage(activeRentals, value) {
  let message;
  if (value === 'car') {
    if (activeRentals > 1) {
      message = `No puedes eliminar este auto porque tiene ${activeRentals} alquileres activos`;
    } else if (activeRentals === 1) {
      message = 'No puedes eliminar este auto porque tiene un alquiler activo';
    } else {
      message = '¿Estas seguro de que quieres eliminar este auto de forma permanente?';
    }
  }
  if (value === 'client') {
    if (activeRentals > 1) {
      message = `No puedes eliminar este cliente porque tiene ${activeRentals} alquileres activos`;
    } else if (activeRentals === 1) {
      message = 'No puedes eliminar este cliente porque tiene un alquiler activo';
    } else {
      message = '¿Estas seguro de que quieres eliminar este cliente de forma permanente?';
    }
  }
  if (value === 'rental') {
    message = '¿Estas seguro de que quieres eliminar este alquiler de forma permanente ?';
  }
  return message;
}

function showModal(message, buttons) {
  modal.classList.add('is-active');
  const modalBody = modal.querySelector('.message-body');
  const modalFooter = modal.querySelector('.message-footer');
  modalFooter.innerHTML = '';
  modalBody.textContent = message;
  buttons.forEach((button) => {
    modalFooter.appendChild(button);
  });
}

if (modal) {
  const closeModalButton = modal.querySelectorAll('.close-modal');
  closeModalButton.forEach((button) => {
    button.addEventListener('click', cancelModal);
  });
}

if (deleteButtons) {
  deleteButtons.forEach((button) => {
    button.addEventListener('click', (event) => {
      event.preventDefault();
      const { activeRentals, value } = document.querySelector('.data').dataset;
      const { form } = event.target.closest('button');
      const rentals = Number(activeRentals.slice(-1));
      const message = configureMessage(rentals, value);
      const buttons = configureButtons(rentals, form, confirmModal, cancelModal);
      showModal(message, buttons);
    });
  });
}
