const hamburger = document.querySelector('.hamburger');
const menu = document.querySelector('.menu');
const projectPortfolio = document.querySelector('#portfolio');
const popupModal = document.querySelector('.popup');
const contactForm = document.querySelector('.contact_form');
const errorMessage = document.querySelector('.error-msg');

const formData = {
	name: '',
	email: '',
	message: ''
};

hamburger.addEventListener('click', (e) => {
	e.preventDefault();
	hamburger.classList.toggle('active');
	menu.classList.toggle('active');
});

document.querySelectorAll('.nav-link').forEach((nav) =>
	nav.addEventListener('click', () => {
		hamburger.classList.remove('active');
		menu.classList.remove('active');
	})
);

const displayProjects = ({ name, description, technologies, image, client, year, role, direction }, index) => {
	const div = document.createElement('div');
	div.innerHTML = `
  <div class="works-card-${direction}">
            <div class="work-image">
                <img src="${image}">
            </div>
            <div class="work-details">
                <h2 class="project-title">${name}</h2>
                <div class="project-details">
                    <h3 class="project-client">${client}</h3>
                    <ul>
                        <li class="project-role">${role}</li>
                        <li class="project-year">${year}</li>
                    </ul>
                </div>
                <p class="project-decription">
                    ${description}
                </p>
                <ul class="project-languages">
                    <li>${technologies[0]}</li>
                    <li>${technologies[1]}</li>
                    <li>${technologies[2]}</li>
                </ul>
                <button class="project-button" id="${index}">See Project</button>
            </div>
        </div>
  `;

	return div;
};

const displayProjectDetail = ({ name, description, technologies, image, client, year, role }) => {
	const div = document.createElement('div');
	div.className = 'popup-body';
	div.innerHTML = `
      <div class="popup-title">
          <h2>${name}</h2>
          <div class="popup-hamburger">
              <span class="p-bar"></span>
              <span class="p-bar"></span>
              <span class="p-bar"></span>
            </div>
            </div>
            <div class="project-details popup-data">
                <h3 class="project-client">${client}</h3>
                <ul>
                    <li class="project-role">${role}</li>
                    <li class="project-year">${year}</li>
                </ul>
            </div>
            <div class="popup-image">
                <img src="${image}" alt="${client}">
            </div>
            <div class="popup-detail">
                <p class="popup-description">
                  ${description}
                </p>
                <div class="popup-link">
              <ul class="popup-technologies">
              <li>${technologies[0]}</li>
              <li>${technologies[1]}</li>
              <li>${technologies[2]}</li>
              </ul>
              <div class="popup-buttons">
                  <button>See live <span><img src="./assets/images/see-live-Icon.svg"></span></button>
                  <button>See Source <span><img src="./assets/images/see-source.svg"></span></button>
              </div>
          </div>
      </div>
  `;

	return div;
};

const getProjects = async () => {
	const response = await fetch('./projects.json');

	try {
		const data = await response.json();

		data.forEach((project, index) => {
			projectPortfolio.append(displayProjects(project, index));
		});
	} catch (error) {
		// console.log(error);
	}
};
const addhumburgerEvent = () => {
	document.querySelector('.popup-hamburger').addEventListener('click', () => {
		popupModal.classList.remove('show-popup');
		popupModal.innerHTML = '';
	});
};
window.onload = async () => {
	document.querySelectorAll('.project-button').forEach((button) =>
		button.addEventListener('click', async () => {
			const response = await fetch('./projects.json');
			const data = await response.json();

			const item = data[button.id];

			popupModal.append(displayProjectDetail(item));

			popupModal.classList.add('show-popup');

			addhumburgerEvent();
		})
	);
};

const checkUpperCase = (email) => email !== email.toLowerCase();

contactForm.addEventListener('submit', (e) => {
	const emailAdd = contactForm.elements.email.value;

	e.preventDefault();
	if (checkUpperCase(emailAdd)) {
		errorMessage.textContent = 'Your email must contain only lower case letters';
	} else {
		contactForm.submit();
	}
});

document.querySelectorAll('.form-input').forEach((input) =>
	input.addEventListener('change', () => {
		// console.log(input.name);

		if (input.name === 'name') {
			formData.name = input.value;
		} else if (input.name === 'email') {
			formData.email = input.value;
		} else if (input.name === 'message') {
			formData.message = input.value;
		}

		console.log(formData);
	})
);

getProjects();
