const contactForm = document.querySelector('#contact-form');
const contactList = document.querySelector('#contact-list');

contactForm.addEventListener('submit', function(event) {
  event.preventDefault();
  
  const nome = document.querySelector('#nome').value;
  const fone = document.querySelector('#fone').value;
  const email = document.querySelector('#email').value;
  
  const contact = { nome, fone, email };
  
  let contacts = JSON.parse(localStorage.getItem('contacts')) || [];
  contacts.push(contact);
  localStorage.setItem('contacts', JSON.stringify(contacts));
  
  AtualizarLista();
  
  contactForm.reset();
});

function AtualizarLista() {
  contactList.innerHTML = '';
  
  let contacts = JSON.parse(localStorage.getItem('contacts')) || [];
  contacts.forEach(function(contact, index) {
    const li = document.createElement('li');
    li.innerHTML = `
      <div class="contact">
        <span class="nome">${contact.nome}</span>
        <span class="fone">${contact.fone}</span>
        <span class="email">${contact.email}</span>
        <button class="remove" data-index="${index}">Remover</button>
      </div>
    `;
    contactList.appendChild(li);
  });
  
  // Adiciona o evento de click nos botões de remover
  const removeButtons = document.querySelectorAll('.remove');
  removeButtons.forEach(function(button) {
    button.addEventListener('click', function(event) {
      const index = event.target.dataset.index;
      let contacts = JSON.parse(localStorage.getItem('contacts')) || [];
      contacts.splice(index, 1);
      localStorage.setItem('contacts', JSON.stringify(contacts));
      AtualizarLista();
    });
  });
}

// Chama a função para atualizar a lista de contatos na tela
AtualizarLista();