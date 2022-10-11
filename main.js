const hamburger = document.querySelector('.hamburger');
const menu = document.querySelector('.menu');
const projectPortfolio = document.querySelector('#portfolio');

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
                <button class="project-button" id="${index}">
				See Project
			</button>
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

getProjects();
